'use server';

/**
 * @fileOverview Generates an automated phone call script when the risk exceeds 60%.
 *
 * - generateAutomatedCallScript - A function that generates the phone call script.
 * - AutomatedCallScriptInput - The input type for the generateAutomatedCallScript function.
 * - AutomatedCallScriptOutput - The return type for the generateAutomatedCallScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedCallScriptInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  riskScore: z.number().describe('The current risk score of the patient (0-100).'),
  recentSymptoms: z.array(z.string()).describe('A list of recent symptoms reported by the patient.'),
});
export type AutomatedCallScriptInput = z.infer<typeof AutomatedCallScriptInputSchema>;

const AutomatedCallScriptOutputSchema = z.object({
  callScript: z.string().describe('The generated phone call script for the automated call.'),
});
export type AutomatedCallScriptOutput = z.infer<typeof AutomatedCallScriptOutputSchema>;

export async function generateAutomatedCallScript(input: AutomatedCallScriptInput): Promise<AutomatedCallScriptOutput> {
  return automatedCallScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedCallScriptPrompt',
  input: {schema: AutomatedCallScriptInputSchema},
  output: {schema: AutomatedCallScriptOutputSchema},
  prompt: `You are an AI assistant designed to generate phone call scripts for automated health alerts.

  The patient's name is: {{{patientName}}}
  The patient's current risk score is: {{{riskScore}}}
  The patient's recent symptoms are: {{{recentSymptoms}}}

  Generate a phone call script that informs the patient about their risk score and asks them to take appropriate action, such as contacting their doctor or going to the hospital if necessary.

  The script should be concise and easy to understand.  The risk score is out of 100.  If the risk score is over 60, recommend that they contact their doctor immediately. If it is over 80, recommend that they go to the hospital.
  Include a closing statement that thanks the patient for their time.
  The script should sound professional and empathetic. Do not include any salutations.
  Do not include the patient name in the script. Address the patient as "Sir" or "Madam".
  Here is the script:
  `,
});

const automatedCallScriptFlow = ai.defineFlow(
  {
    name: 'automatedCallScriptFlow',
    inputSchema: AutomatedCallScriptInputSchema,
    outputSchema: AutomatedCallScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
