'use server';
/**
 * @fileOverview Evaluates seizure/stroke risk based on user-logged symptoms.
 *
 * - evaluateSeizureStrokeRisk - A function that handles the risk evaluation process.
 * - EvaluateSeizureStrokeRiskInput - The input type for the evaluateSeizureStrokeRisk function.
 * - EvaluateSeizureStrokeRiskOutput - The return type for the evaluateSeizureStrokeRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateSeizureStrokeRiskInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A comma separated list of symptoms experienced by the user (e.g., dizziness, headache, muscle spasms, vision loss).'
    ),
});
export type EvaluateSeizureStrokeRiskInput = z.infer<
  typeof EvaluateSeizureStrokeRiskInputSchema
>;

const EvaluateSeizureStrokeRiskOutputSchema = z.object({
  riskPercentage: z
    .number()
    .describe(
      'The estimated risk percentage of seizure or stroke, ranging from 0 to 100.'
    ),
  explanation: z
    .string()
    .describe(
      'A brief explanation of the risk assessment, highlighting the key symptoms contributing to the risk level.'
    ),
});
export type EvaluateSeizureStrokeRiskOutput = z.infer<
  typeof EvaluateSeizureStrokeRiskOutputSchema
>;

export async function evaluateSeizureStrokeRisk(
  input: EvaluateSeizureStrokeRiskInput
): Promise<EvaluateSeizureStrokeRiskOutput> {
  return evaluateSeizureStrokeRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateSeizureStrokeRiskPrompt',
  input: {schema: EvaluateSeizureStrokeRiskInputSchema},
  output: {schema: EvaluateSeizureStrokeRiskOutputSchema},
  prompt: `You are an AI assistant specializing in assessing seizure and stroke risk based on reported symptoms.

  Evaluate the risk based on the following symptoms:
  Symptoms: {{{symptoms}}}

  Provide a risk assessment as a percentage (0-100) in the riskPercentage field.
  Also, give a brief explanation of the assessment in the explanation field, indicating which symptoms are most concerning.

  Ensure the riskPercentage is an integer. Always set the riskPercentage, even if the risk is very low.
  `,
});

const evaluateSeizureStrokeRiskFlow = ai.defineFlow(
  {
    name: 'evaluateSeizureStrokeRiskFlow',
    inputSchema: EvaluateSeizureStrokeRiskInputSchema,
    outputSchema: EvaluateSeizureStrokeRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
