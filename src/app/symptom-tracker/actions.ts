"use server";

import { evaluateSeizureStrokeRisk } from "@/ai/flows/evaluate-seizure-stroke-risk";
import { z } from "zod";

const schema = z.object({
  symptoms: z.string().min(3, "Please enter at least one symptom."),
});

type State = {
  riskPercentage: number | null;
  explanation: string | null;
  error: string | null;
};

export async function evaluateRisk(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    symptoms: formData.get("symptoms"),
  });

  if (!validatedFields.success) {
    return {
      riskPercentage: null,
      explanation: null,
      error: validatedFields.error.flatten().fieldErrors.symptoms?.[0] ?? "Invalid input.",
    };
  }

  try {
    const result = await evaluateSeizureStrokeRisk({
      symptoms: validatedFields.data.symptoms,
    });
    return {
      riskPercentage: result.riskPercentage,
      explanation: result.explanation,
      error: null,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      riskPercentage: null,
      explanation: null,
      error: `AI evaluation failed: ${errorMessage}`,
    };
  }
}
