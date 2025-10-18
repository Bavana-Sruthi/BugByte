'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getAutomatedCallScriptAction } from '@/app/actions';
import { mockPatient } from '@/lib/mock-data';

type AutomatedCallHandlerProps = {
  patientName: string;
  riskScore: number;
  recentSymptoms: string[];
};

export function AutomatedCallHandler({ patientName, riskScore, recentSymptoms }: AutomatedCallHandlerProps) {
  const { toast } = useToast();
  const patient = mockPatient;

  useEffect(() => {
    let isMounted = true;
    const handleAutomatedCall = async () => {
      try {
        const scriptResult = await getAutomatedCallScriptAction({ patientName, riskScore, recentSymptoms });

        if ('error' in scriptResult) {
          throw new Error(scriptResult.error);
        }

        if (!isMounted) return;

        // Simulate placing a call. In a real application, this would trigger a service like Twilio.
        // We add a short delay to make the simulation feel more real.
        setTimeout(() => {
          if (isMounted) {
            toast({
              title: "Automated Call Initiated",
              description: `A simulated call to ${patient.phoneNumber} is being placed based on a risk score of ${riskScore}.`,
            });
          }
        }, 2000);

      } catch (error) {
        if (isMounted) {
          toast({
            variant: 'destructive',
            title: 'Automated Call Failed',
            description: error instanceof Error ? error.message : 'An unknown error occurred.',
          });
        }
      }
    };

    handleAutomatedCall();
    
    return () => {
      isMounted = false;
    }

  }, [patientName, riskScore, recentSymptoms, toast, patient.phoneNumber]);


  // This component does not render anything to the UI
  return null;
}
