"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { summarizeReport } from "./actions";
import { Loader, Languages } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialState = {
  summaries: null,
  error: null,
};

function SubmitButton() {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const form = formRef.current?.closest('form');
        if (!form) return;

        const handleSubmission = (e: Event) => {
            const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput.files?.length === 0) {
                return;
            }
            setLoading(true);
        };
        
        form.addEventListener("submit", handleSubmission);
        
        return () => {
            form.removeEventListener("submit", handleSubmission);
        };
    }, []);

    return (
        <Button type="submit" className="w-full" disabled={loading} ref={formRef}>
            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
            {loading ? "Summarizing..." : "Summarize Report"}
        </Button>
    );
}


export default function ReportSummarizerPage() {
  const [state, formAction] = useFormState(summarizeReport, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(false);
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: state.error,
      });
    }
    if (state.summaries) {
      toast({
        title: "Success",
        description: "Your report has been summarized.",
      });
      formRef.current?.reset();
      setFileName("");
    }
  }, [state, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fileInput = e.currentTarget.elements.namedItem("report") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      e.preventDefault();
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please upload a medical report to summarize.",
      });
      return;
    }
    setIsSubmitting(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Medical Report Summarizer
        </h1>
        <p className="text-muted-foreground">
          Upload a medical report to receive a summary in English, Hindi, and
          Telugu.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <form action={formAction} ref={formRef} onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Upload Report</CardTitle>
              <CardDescription>
                Accepted formats: PDF, PNG, JPG, TXT.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="report">Medical Report File</Label>
                  <Input
                    id="report"
                    name="report"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.txt"
                    onChange={handleFileChange}
                    required
                  />
                  {fileName && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {fileName}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
                {isSubmitting ? "Summarizing..." : "Summarize Report"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {state.summaries && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>AI-Generated Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="english">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="hindi">Hindi</TabsTrigger>
                  <TabsTrigger value="telugu">Telugu</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-64 mt-4 pr-4">
                  <TabsContent value="english">
                    <p className="text-sm whitespace-pre-wrap">
                      {state.summaries.englishSummary}
                    </p>
                  </TabsContent>
                  <TabsContent value="hindi">
                    <p className="text-sm whitespace-pre-wrap">
                      {state.summaries.hindiSummary}
                    </p>
                  </TabsContent>
                  <TabsContent value="telugu">
                    <p className="text-sm whitespace-pre-wrap">
                      {state.summaries.teluguSummary}
                    </p>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        )}
        {isSubmitting && !state.summaries && (
            <div className="flex items-center justify-center rounded-lg border border-dashed h-full">
                <div className="text-center text-muted-foreground">
                    <Loader className="mx-auto h-12 w-12 animate-spin" />
                    <p className="mt-4">AI is analyzing your report...</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
