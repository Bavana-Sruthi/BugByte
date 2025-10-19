"use server";

import { summarizeMedicalReport } from "@/ai/flows/summarize-medical-reports";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
];

const schema = z.object({
  report: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File is empty.")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file format."
    ),
});

type State = {
  summaries: {
    englishSummary: string;
    hindiSummary: string;
    teluguSummary: string;
  } | null;
  error: string | null;
};

const fileToDataURI = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export async function summarizeReport(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    report: formData.get("report"),
  });

  if (!validatedFields.success) {
    return {
      summaries: null,
      error:
        validatedFields.error.flatten().fieldErrors.report?.[0] ??
        "Invalid file.",
    };
  }
  
  const file = validatedFields.data.report;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await summarizeMedicalReport({
      reportDataUri: dataUri,
    });
    return {
      summaries: result,
      error: null,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      summaries: null,
      error: `AI summarization failed: ${errorMessage}`,
    };
  }
}
