"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FiftyTwoWeekChart({ code }: { code: string }) {
  const [data, setData] = useState<any[]>([]);
  const [range, setRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/load52w?code=${code}`);
      const json = await res.json();

      setData(json.series);

      setRange({
        min: json.low * 0.9,
        max: json.high * 1.1,
      });
    }

    fetchData();
  }, [code]);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[range.min, range.max]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="close"
            stroke="#0066ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
