"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function FiftyTwoWeekChart({ code }: { code: string }) {
  const [data, setData] = useState<any[]>([]);
  const [slopeData, setSlopeData] = useState<any[]>([]);
  const [range, setRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/load52w?code=${code}`);
      const json = await res.json();

      // If API returns empty data, prevent [0,0] domain
      if (!json.series || json.series.length === 0) {
        setData([]);
        setSlopeData([]);
        setRange({ min: 1, max: 2 }); // safe fallback
        return;
      }

      setData(json.series);
      setSlopeData(json.slopeSeries);

      setRange({
        min: json.low * 0.98,
        max: json.high * 1.02,
      });
    }

    fetchData();
  }, [code]);

  return (
    <div style={{ width: "100%", height: 350, paddingBottom:0}}>
      <ResponsiveContainer>
  <LineChart>

    <CartesianGrid
      stroke="#e0e0e0"
      strokeDasharray="3 3"
      
    />

    <XAxis
      type="category"
      dataKey="date"
      allowDuplicatedCategory={false}
      tick={{ angle: -10, textAnchor: "end" }}
    />

    <YAxis
      domain={[range.min, range.max]}
      tickFormatter={(v) => v.toFixed(3)}
      allowDecimals
      tickCount={8}
    />

    <Tooltip />

    <Line
      data={data}
      type="monotone"
      dataKey="close"
      stroke="#0066ff"
      strokeWidth={5}
      dot={false}
      connectNulls={true}
    />

    <Line
      data={slopeData}
      type="linear"
      dataKey="slope"
      stroke="#e901d5"
      strokeWidth={4}
      dot={{ r: 4 }}
      connectNulls={true}
    />

  </LineChart>
</ResponsiveContainer>
    </div>
  );
}
