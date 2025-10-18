import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Data
import { mockPatient } from '@/lib/mock-data';

// Components
import { RiskScoreCard } from '@/components/risk-score-card';
import { SymptomHistoryTable } from '@/components/symptom-history-table';
import { RiskHistoryChart } from '@/components/risk-history-chart';
import { TriageSummary } from '@/components/triage-summary';
import { SymptomLogDialog } from '@/components/symptom-log-dialog';

export default function DashboardPage() {
  const patient = mockPatient;
  const currentRisk = patient.riskHistory[patient.riskHistory.length - 1];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <HeartPulse className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">HealthPulse</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact support for assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 sm:gap-6">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
                />
              </div>
            </form>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RiskScoreCard score={currentRisk.score} patientName={patient.name} symptoms={patient.symptoms.map(s => s.symptomLabel)} />
              <Card>
                <CardHeader>
                  <CardTitle>AI Triage Summary</CardTitle>
                  <CardDescription>A concise summary of recent symptoms.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TriageSummary symptoms={patient.symptoms} />
                </CardContent>
              </Card>
               <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Log Symptoms</CardTitle>
                  <CardDescription>Add a new symptom entry to your record.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <SymptomLogDialog />
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Risk History</CardTitle>
                  <CardDescription>Your risk score over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskHistoryChart data={patient.riskHistory} />
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Symptoms</CardTitle>
                  <CardDescription>Your most recently logged symptoms.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SymptomHistoryTable symptoms={patient.symptoms.slice(0, 5)} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
