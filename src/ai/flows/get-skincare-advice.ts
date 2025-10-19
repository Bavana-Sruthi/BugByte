'use server';

/**
 * @fileOverview A skincare chatbot flow.
 *
 * - getSkincareAdvice - A function that provides skincare advice based on user input.
 * - GetSkincareAdviceInput - The input type for the getSkincareAdvice function.
 * - GetSkincareAdviceOutput - The return type for the getSkincareAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetSkincareAdviceInputSchema = z.object({
  skinIssue: z.string().describe('The skin issue the user is experiencing.'),
  skinType: z.string().describe('The user\'s skin type (e.g., oily, dry, combination).'),
  productsUsed: z.string().optional().describe('The products the user is currently using.'),
  otherDetails: z.string().optional().describe('Any other relevant details about the user\'s skin or concerns.'),
});
export type GetSkincareAdviceInput = z.infer<typeof GetSkincareAdviceInputSchema>;

const GetSkincareAdviceOutputSchema = z.object({
  advice: z.string().describe('The skincare advice provided by the chatbot.'),
});
export type GetSkincareAdviceOutput = z.infer<typeof GetSkincareAdviceOutputSchema>;

export async function getSkincareAdvice(input: GetSkincareAdviceInput): Promise<GetSkincareAdviceOutput> {
  return getSkincareAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getSkincareAdvicePrompt',
  input: {schema: GetSkincareAdviceInputSchema},
  output: {schema: GetSkincareAdviceOutputSchema},
  prompt: `You are a helpful and knowledgeable skincare chatbot. A user will describe their skin issues, skin type, current products, and any other relevant details. Provide personalized skincare advice based on this information.

Skin Issue: {{{skinIssue}}}
Skin Type: {{{skinType}}}
Current Products: {{{productsUsed}}}
Other Details: {{{otherDetails}}}

Skincare Advice:`,
});

const getSkincareAdviceFlow = ai.defineFlow(
  {
    name: 'getSkincareAdviceFlow',
    inputSchema: GetSkincareAdviceInputSchema,
    outputSchema: GetSkincareAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
