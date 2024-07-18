"use client";
import { AreaChart } from "@mantine/charts";
type RevenueChartProps = {
  data: { date: string; Revenue: number }[];
};

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[{ name: "Revenue", color: "blue.6" }]}
      curveType="natural"
    />
  );
}
