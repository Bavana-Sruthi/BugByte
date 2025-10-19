"use server";

import { getSkincareAdvice } from "@/ai/flows/get-skincare-advice";
import { z } from "zod";

const schema = z.object({
  skinIssue: z.string().min(3, "Please describe your skin issue."),
  skinType: z.string().min(3, "Please describe your skin type."),
  productsUsed: z.string().optional(),
  otherDetails: z.string().optional(),
});

type State = {
  advice: string | null;
  error: string | null;
};

export async function getAdvice(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    skinIssue: formData.get("skinIssue"),
    skinType: formData.get("skinType"),
    productsUsed: formData.get("productsUsed"),
    otherDetails: formData.get("otherDetails"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      advice: null,
      error:
        errors.skinIssue?.[0] ||
        errors.skinType?.[0] ||
        "Invalid input.",
    };
  }

  try {
    const result = await getSkincareAdvice(validatedFields.data);
    return {
      advice: result.advice,
      error: null,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      advice: null,
      error: `AI advice failed: ${errorMessage}`,
    };
  }
}
