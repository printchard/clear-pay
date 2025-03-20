"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardChart({
  data,
}: {
  data: { date: string; amount: number }[];
}) {
  return (
    <ResponsiveContainer height="100%" aspect={2}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            0,
            (dataMax: number) => Math.ceil((dataMax * 1.1) / 100) * 100,
          ]}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#32936f" name="Amount">
          <LabelList dataKey="amount" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
