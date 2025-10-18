'use client';

import { useState, useEffect } from 'react';
import { getTriageSummaryAction } from '@/app/actions';
import type { Symptom } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type TriageSummaryProps = {
  symptoms: Symptom[];
};

export function TriageSummary({ symptoms }: TriageSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const formattedSymptoms = symptoms.map(s => ({
      timestamp: s.timestamp,
      symptomCode: s.symptomCode,
      symptomLabel: s.symptomLabel,
      severity: s.severity,
    }));
    
    getTriageSummaryAction({ symptoms: formattedSymptoms })
      .then(result => {
        if ('summary' in result) {
          setSummary(result.summary);
        } else {
          setSummary('Could not generate summary.');
          toast({ variant: 'destructive', title: 'AI Error', description: result.error });
        }
      })
      .finally(() => setIsLoading(false));
  }, [symptoms, toast]);

  if (isLoading) {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
  }

  return <p className="text-sm">{summary}</p>;
}
