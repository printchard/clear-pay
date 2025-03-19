"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#32936f" name="Amount" />
      </BarChart>
    </ResponsiveContainer>
  );
}
