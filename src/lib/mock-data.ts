import type { Patient, RiskEntry, Symptom } from './types';

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

const generateRiskHistory = (days: number): RiskEntry[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    return {
      date: formatDate(date),
      score: Math.floor(Math.random() * 50) + 20 + i, // Gradually increasing risk
    };
  });
};

const generateSymptoms = (count: number): Symptom[] => {
  const symptoms: { code: string, label: string }[] = [
    { code: 'H71', label: 'Headache' },
    { code: 'C34', label: 'Cough' },
    { code: 'F88', label: 'Fever' },
    { code: 'S92', label: 'Shortness of Breath' },
    { code: 'N10', label: 'Nausea' },
    { code: 'D45', label: 'Dizziness' },
  ];
  const severities: ('Mild' | 'Moderate' | 'Severe')[] = ['Mild', 'Moderate', 'Severe'];
  
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setHours(today.getHours() - i * 3);
    const randomSymptom = symptoms[Math.floor(Math.random() * symptoms.length)];
    return {
      id: `symptom-${i}`,
      timestamp: date.toISOString(),
      symptomCode: randomSymptom.code,
      symptomLabel: randomSymptom.label,
      severity: severities[Math.floor(Math.random() * severities.length)],
    };
  });
};

export const mockPatient: Patient = {
  id: 'patient-01',
  name: 'Jane Doe',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  phoneNumber: '+1-555-123-4567',
  symptoms: generateSymptoms(8),
  riskHistory: generateRiskHistory(30),
};
