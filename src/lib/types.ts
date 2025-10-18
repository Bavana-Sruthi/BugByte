export type Symptom = {
  id: string;
  timestamp: string;
  symptomCode: string;
  symptomLabel: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
};

export type RiskEntry = {
  date: string;
  score: number;
};

export type Patient = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  symptoms: Symptom[];
  riskHistory: RiskEntry[];
};
