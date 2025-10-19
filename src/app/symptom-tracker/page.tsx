"use client";

import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { evaluateRisk } from "./actions";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText, PhoneCall, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialState = {
  riskPercentage: null,
  explanation: null,
  error: null,
};

function SubmitButton() {
  // `useFormStatus` is not available in this version of React, so we use a simple loading state.
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current?.form;
    if (!form) return;

    const handleSubmission = () => {
      setLoading(true);
    };
    
    form.addEventListener("submit", handleSubmission);
    
    return () => {
      form.removeEventListener("submit", handleSubmission);
    };
  }, []);

  return (
    <Button type="submit" className="w-full" disabled={loading} ref={formRef}>
      {loading ? "Evaluating..." : "Evaluate Risk"}
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
}


export default function SymptomTrackerPage() {
  const [state, formAction] = useFormState(evaluateRisk, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [showEmergencyCallAlert, setShowEmergencyCallAlert] = useState(false);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Evaluation Failed",
        description: state.error,
      });
    }
    if (state.riskPercentage !== null) {
      formRef.current?.reset();
    }
    if (state.riskPercentage !== null && state.riskPercentage >= 60) {
      setShowEmergencyCallAlert(true);
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Symptom Tracker & Risk Evaluator
        </h1>
        <p className="text-muted-foreground">
          Log your symptoms to get an AI-powered risk evaluation for
          seizure/stroke.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log New Symptoms</CardTitle>
            <CardDescription>
              Describe the symptoms you're experiencing. Be as specific as
              possible.
            </CardDescription>
          </CardHeader>
          <form action={formAction} ref={formRef}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    placeholder="e.g., dizziness, headache, muscle spasms, vision loss"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Please enter symptoms, separated by commas.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Evaluate Risk <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-8">
          {state.riskPercentage !== null && state.explanation && (
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Evaluation Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`text-5xl font-bold ${
                      state.riskPercentage >= 60
                        ? "text-destructive"
                        : state.riskPercentage >= 40
                        ? "text-orange-500"
                        : "text-primary"
                    }`}
                  >
                    {state.riskPercentage}%
                  </div>
                  <p className="text-lg">Risk Level</p>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>{state.explanation}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText /> Demo Profile Log
              </CardTitle>
              <CardDescription>
                This is a pre-populated log for demonstration purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Date:</strong> 3 days ago
              </p>
              <p>
                <strong>Symptoms:</strong> Mild headache, brief moment of
                dizziness after standing up too fast.
              </p>
              <p>
                <strong>Risk Assessed:</strong> 15%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <AlertDialog
        open={showEmergencyCallAlert}
        onOpenChange={setShowEmergencyCallAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <PhoneCall className="text-destructive" /> High Risk Detected!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your symptom evaluation returned a risk of {state.riskPercentage}
              %. This is above the 60% threshold.
              <br />
              <br />
              In a real scenario, an automated emergency call would now be placed
              to <strong>+91 93920 18436</strong>. Please seek medical
              attention immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Acknowledge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
