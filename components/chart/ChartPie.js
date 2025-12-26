"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

const COLORS = ["#7AA2E3", "#B6E2A1", "#F9F3A7", "#F7D59C", "#F8AFA6"];

export default function ChartPie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/surat/stats")
      .then((res) => res.json())
      .then((res) => {
        if (!res?.byDepartment) {
          console.warn("byDepartment kosong:", res);
          setData([]);
          return;
        }

        const formatted = res.byDepartment.map((d) => ({
          name: d.departemen || "Unknown",
          value: d._count?.departemen || 0,
        }));

        setData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <Card className="w-full max-w-4xl bg-[#e1e6d8] rounded-xl px-6 pt-6 pb-4">
      <CardContent className="p-0">
        <Badge className="mb-3 bg-[#4C686A] text-white text-xs">
          By Department
        </Badge>

        <div className="bg-[#fefbf5] rounded-xl p-4">
          {data.length === 0 ? (
  <p className="text-center text-sm text-gray-400">
    Tidak ada data departemen
  </p>) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="40%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
