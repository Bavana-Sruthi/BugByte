'use server';

/**
 * @fileOverview Summarizes a patient's recent symptoms for triage.
 *
 * - summarizeSymptomsForTriage - A function that summarizes the patient's recent symptoms.
 * - SummarizeSymptomsForTriageInput - The input type for the summarizeSymptomsForTriage function.
 * - SummarizeSymptomsForTriageOutput - The return type for the summarizeSymptomsForTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSymptomsForTriageInputSchema = z.object({
  symptoms: z
    .array(
      z.object({
        timestamp: z.string().describe('The timestamp of the symptom.'),
        symptomCode: z.string().describe('The code of the symptom.'),
        symptomLabel: z.string().describe('The label of the symptom.'),
        severity: z.string().describe('The severity of the symptom.'),
      })
    )
    .describe('The recent symptoms of the patient.'),
});
export type SummarizeSymptomsForTriageInput = z.infer<typeof SummarizeSymptomsForTriageInputSchema>;

const SummarizeSymptomsForTriageOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the patient\'s recent symptoms.'),
});
export type SummarizeSymptomsForTriageOutput = z.infer<typeof SummarizeSymptomsForTriageOutputSchema>;

export async function summarizeSymptomsForTriage(input: SummarizeSymptomsForTriageInput): Promise<SummarizeSymptomsForTriageOutput> {
  return summarizeSymptomsForTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSymptomsForTriagePrompt',
  input: {schema: SummarizeSymptomsForTriageInputSchema},
  output: {schema: SummarizeSymptomsForTriageOutputSchema},
  prompt: `You are a healthcare professional summarizing patient symptoms for triage.\n\n  Summarize the following symptoms into a concise overview to quickly assess the patient's condition and prioritize care. Be as short as possible, using medical terminology where appropriate.\n\n  Symptoms:\n  {{#each symptoms}}
  - Timestamp: {{timestamp}}, Symptom Code: {{symptomCode}}, Symptom Label: {{symptomLabel}}, Severity: {{severity}}\n  {{/each}}`,
});

const summarizeSymptomsForTriageFlow = ai.defineFlow(
  {
    name: 'summarizeSymptomsForTriageFlow',
    inputSchema: SummarizeSymptomsForTriageInputSchema,
    outputSchema: SummarizeSymptomsForTriageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
