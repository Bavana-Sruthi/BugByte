'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logSymptomAction } from '@/app/actions';
import type { Symptom } from '@/lib/types';

export function SymptomLogDialog() {
  const [open, setOpen] = useState(false);
  const [symptomLabel, setSymptomLabel] = useState('');
  const [severity, setSeverity] = useState<Symptom['severity']>('Mild');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      await logSymptomAction({ symptomLabel, severity });
      toast({
        title: "Symptom Logged",
        description: "Your new symptom has been added to your record.",
      });
      
      setOpen(false); // Close the dialog on submit
      setSymptomLabel(''); // Reset form
      setSeverity('Mild'); // Reset form

      router.refresh();

    } catch (error) {
       toast({
        variant: 'destructive',
        title: "Failed to Log Symptom",
        description: "An error occurred while saving your symptom.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full h-full text-primary border-primary/50 hover:bg-primary/5 hover:text-primary border-dashed">
          <PlusCircle className="mr-2 h-6 w-6" />
          Log New Symptom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log a new symptom</DialogTitle>
            <DialogDescription>
              Fill in the details of your symptom below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="symptom" className="text-right">
                Symptom
              </Label>
              <Input 
                id="symptom" 
                value={symptomLabel}
                onChange={(e) => setSymptomLabel(e.target.value)}
                placeholder="e.g. Headache"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="severity" className="text-right">
                Severity
              </Label>
              <Select value={severity} onValueChange={(value) => setSeverity(value as Symptom['severity'])}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Symptom'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
