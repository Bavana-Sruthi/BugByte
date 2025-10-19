import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskHistoryChart } from "@/components/dashboard/risk-history-chart";
import { SymptomTrendsChart } from "@/components/dashboard/symptom-trends-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your health overview.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Symptom Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <SymptomTrendsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Risk History</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskHistoryChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
