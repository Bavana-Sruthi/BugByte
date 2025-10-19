'use server';

/**
 * @fileOverview Summarizes medical reports in English, Hindi, and Telugu.
 *
 * - summarizeMedicalReport - A function that handles the medical report summarization process.
 * - SummarizeMedicalReportInput - The input type for the summarizeMedicalReport function.
 * - SummarizeMedicalReportOutput - The return type for the summarizeMedicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const SummarizeMedicalReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      'The medical report data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep the single quotes in string, escape the single quote in the string
    ),
});
export type SummarizeMedicalReportInput = z.infer<typeof SummarizeMedicalReportInputSchema>;

const SummarizeMedicalReportOutputSchema = z.object({
  englishSummary: z.string().describe('The summary of the medical report in English.'),
  hindiSummary: z.string().describe('The summary of the medical report in Hindi.'),
  teluguSummary: z.string().describe('The summary of the medical report in Telugu.'),
});
export type SummarizeMedicalReportOutput = z.infer<typeof SummarizeMedicalReportOutputSchema>;

export async function summarizeMedicalReport(
  input: SummarizeMedicalReportInput
): Promise<SummarizeMedicalReportOutput> {
  return summarizeMedicalReportFlow(input);
}

const summarizePrompt = ai.definePrompt({
  name: 'summarizeMedicalReportPrompt',
  input: {schema: SummarizeMedicalReportInputSchema},
  output: {schema: SummarizeMedicalReportOutputSchema},
  prompt: `You are a medical expert. Summarize the following medical report in English, Hindi, and Telugu.\n\nMedical Report:\n{{reportDataUri}}.\n\nEnglish Summary:`.trim(),
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: z.object({text: z.string()})},
  output: {schema: z.object({hindi: z.string(), telugu: z.string()})},
  prompt: `You are a translation expert. Translate the following text to Hindi and Telugu languages.\n\nText: {{{text}}}\n\nHindi:`.trim(),
});

const summarizeMedicalReportFlow = ai.defineFlow(
  {
    name: 'summarizeMedicalReportFlow',
    inputSchema: SummarizeMedicalReportInputSchema,
    outputSchema: SummarizeMedicalReportOutputSchema,
  },
  async input => {
    const {output: englishSummaryOutput} = await summarizePrompt(input);
    const englishSummary = englishSummaryOutput!.englishSummary;

    const {output: translationOutput} = await translatePrompt({text: englishSummary});

    return {
      englishSummary: englishSummary,
      hindiSummary: translationOutput!.hindi,
      teluguSummary: translationOutput!.telugu,
    };
  }
);
