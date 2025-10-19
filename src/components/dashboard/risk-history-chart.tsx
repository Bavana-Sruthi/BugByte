"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { riskHistory } from "@/lib/data";

const chartConfig = {
  risk: {
    label: "Risk (%)",
    color: "hsl(var(--chart-1))",
  },
};

export function RiskHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={riskHistory}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          label={{ value: "Risk (%)", angle: -90, position: "insideLeft" }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <defs>
          <linearGradient id="fillRisk" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-risk)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-risk)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Bar dataKey="risk" fill="url(#fillRisk)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
