
'use server';

import { generateAutomatedCallScript, type AutomatedCallScriptInput } from '@/ai/flows/automated-phone-call-generation';
import { summarizeSymptomsForTriage, type SummarizeSymptomsForTriageInput } from '@/ai/flows/summarize-symptoms-for-triage';
import { mockPatient } from '@/lib/mock-data';
import type { Symptom } from '@/lib/types';

export async function getAutomatedCallScriptAction(input: AutomatedCallScriptInput): Promise<{script: string} | {error: string}> {
  try {
    const result = await generateAutomatedCallScript(input);
    return { script: result.callScript };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate call script.' };
  }
}

export async function getTriageSummaryAction(input: SummarizeSymptomsForTriageInput): Promise<{summary: string} | {error: string}> {
  try {
    const result = await summarizeSymptomsForTriage(input);
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate summary.' };
  }
}

export async function logSymptomAction(symptom: Omit<Symptom, 'id' | 'timestamp' | 'symptomCode'>): Promise<{success: boolean}> {
  const newSymptom: Symptom = {
    ...symptom,
    id: `symptom-${Date.now()}`,
    timestamp: new Date().toISOString(),
    symptomCode: symptom.symptomLabel.substring(0,3).toUpperCase(),
  };

  // In a real app, you would save this to a database.
  // For this demo, we are prepending to the mock data array.
  mockPatient.symptoms.unshift(newSymptom);

  // Here you might also recalculate the risk score
  const lastRisk = mockPatient.riskHistory[mockPatient.riskHistory.length -1];
  const newScore = Math.min(100, lastRisk.score + (symptom.severity === 'Severe' ? 15 : symptom.severity === 'Moderate' ? 10 : 5));

  mockPatient.riskHistory.push({
    date: new Date().toISOString().split('T')[0],
    score: newScore,
  });
  // Keep history to 30 days
  if (mockPatient.riskHistory.length > 30) {
    mockPatient.riskHistory.shift();
  }


  return { success: true };
}
