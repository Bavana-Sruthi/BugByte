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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAdvice } from "./actions";
import { Bot, Loader, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  role: "user" | "bot";
  content: string | React.ReactNode;
};

const initialState = {
  advice: null,
  error: null,
};

export default function SkincareAiPage() {
  const [state, formAction] = useFormState(getAdvice, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state.error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Failed to get advice",
        description: state.error,
      });
      setMessages((prev) =>
        prev.filter((msg) => (msg.content as React.ReactElement).type !== Loader)
      );
    }
    if (state.advice) {
      setIsSubmitting(false);
      setMessages((prev) => [
        ...prev.filter((msg) => (msg.content as React.ReactElement).type !== Loader),
        { role: "bot", content: state.advice },
      ]);
      formRef.current?.reset();
    }
  }, [state, toast]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skinIssue = formData.get("skinIssue") as string;
    const skinType = formData.get("skinType") as string;

    if (!skinIssue || !skinType) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please describe your skin issue and type.",
      });
      return;
    }
    
    setIsSubmitting(true);
    const userMessage = `Issue: ${skinIssue}\nType: ${skinType}\nProducts: ${formData.get('productsUsed')}\nDetails: ${formData.get('otherDetails')}`;
    setMessages(prev => [...prev, { role: "user", content: userMessage }, { role: "bot", content: <Loader className="animate-spin" /> }]);
    formAction(formData);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Skincare AI Chatbot
        </h1>
        <p className="text-muted-foreground">
          Get personalized skincare advice from our AI expert.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[70vh]">
        <Card className="lg:col-span-1">
          <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Describe Your Skin</CardTitle>
              <CardDescription>
                The more details you provide, the better the advice.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="skinIssue">Main Skin Issue *</Label>
                <Input
                  id="skinIssue"
                  name="skinIssue"
                  placeholder="e.g., Acne, Dryness, Redness"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="skinType">Skin Type *</Label>
                <Input
                  id="skinType"
                  name="skinType"
                  placeholder="e.g., Oily, Dry, Combination"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="productsUsed">Current Products (Optional)</Label>
                <Textarea
                  id="productsUsed"
                  name="productsUsed"
                  placeholder="List any cleansers, moisturizers, serums, etc."
                />
              </div>
               <div className="space-y-1.5">
                <Label htmlFor="otherDetails">Other Details (Optional)</Label>
                <Textarea
                  id="otherDetails"
                  name="otherDetails"
                  placeholder="e.g., Allergies, lifestyle factors"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Get Advice
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
           <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground pt-16">
                                <Bot className="mx-auto h-12 w-12" />
                                <p className="mt-4">Your conversation will appear here.</p>
                            </div>
                        )}
                        {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 ${
                            message.role === "user" ? "justify-end" : ""
                            }`}
                        >
                             {message.role === 'bot' && (
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                            )}
                            <div
                            className={`max-w-md rounded-lg p-3 text-sm whitespace-pre-wrap ${
                                message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                            >
                            {message.content}
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
