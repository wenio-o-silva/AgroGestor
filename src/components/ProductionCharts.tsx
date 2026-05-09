'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type ChartDataPoint = {
  name: string;
  litros: number;
};

interface ProductionChartProps {
  data: ChartDataPoint[];
}

export default function ProductionCharts({ data }: ProductionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-48 w-full" />;

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
          <Tooltip
            cursor={{ fill: '#f5f5f4' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="litros" fill="#059669" radius={[4, 4, 0, 0]} name="Litros" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}