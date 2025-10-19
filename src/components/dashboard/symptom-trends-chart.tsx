"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { symptomHistory, type SymptomLog } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const chartConfig = {
  headaches: {
    label: "Headaches",
    color: "hsl(var(--chart-1))",
  },
  dizziness: {
    label: "Dizziness",
    color: "hsl(var(--chart-2))",
  },
  spasms: {
    label: "Spasms",
    color: "hsl(var(--chart-3))",
  },
};

export function SymptomTrendsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={symptomHistory}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={4}
          label={{ value: "Count", angle: -90, position: "insideLeft" }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="headaches"
          type="monotone"
          stroke="var(--color-headaches)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="dizziness"
          type="monotone"
          stroke="var(--color-dizziness)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="spasms"
          type="monotone"
          stroke="var(--color-spasms)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
