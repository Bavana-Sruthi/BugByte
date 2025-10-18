'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AutomatedCallHandler } from './automated-call-handler';
import { cn } from '@/lib/utils';
import { mockPatient } from '@/lib/mock-data';

type RiskScoreCardProps = {
  score: number;
  patientName: string;
  symptoms: string[];
};

export function RiskScoreCard({ score, patientName, symptoms }: RiskScoreCardProps) {
  const riskThreshold = 60;
  const highRiskThreshold = 80;
  const isAtRisk = score >= riskThreshold;
  const patient = mockPatient;

  const getRiskColor = () => {
    if (score > highRiskThreshold) return 'text-destructive';
    if (score > riskThreshold) return 'text-accent';
    return 'text-primary';
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Current Risk Score</CardTitle>
          <CardDescription>Based on your latest symptoms.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
          <div className={`text-7xl font-bold ${getRiskColor()}`}>{score}</div>
          <div className="text-sm text-muted-foreground">out of 100</div>
        </CardContent>
        {isAtRisk && (
          <CardFooter className="flex-col gap-2 !pt-0">
            <Alert variant={score > highRiskThreshold ? 'destructive' : 'default'}>
              <AlertCircle className={cn("h-4 w-4", score <= highRiskThreshold && 'text-accent')} />
              <AlertTitle>High Risk Detected!</AlertTitle>
              <AlertDescription>
                Your risk score is elevated. An automated call is being initiated.
              </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
      {isAtRisk && 
        <AutomatedCallHandler
          patientName={patientName} 
          riskScore={score} 
          recentSymptoms={symptoms}
        />
      }
    </>
  );
}
