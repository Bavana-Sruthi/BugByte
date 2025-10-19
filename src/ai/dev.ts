import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-medical-reports.ts';
import '@/ai/flows/evaluate-seizure-stroke-risk.ts';
import '@/ai/flows/get-skincare-advice.ts';