'use client';

import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, ResponsiveContainer,
  CartesianGrid, Legend,
} from 'recharts';

type DataPoint = {
  name: string;
  litros: number;
  receita: number;
  despesa: number;
  lucro: number;
  custoPorLitro: number;
};

interface ReportsChartsProps {
  data: DataPoint[];
  formatMoney: (val: number) => string;
}

const tooltipStyle = {
  borderRadius: '12px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

export default function ReportsCharts({ data, formatMoney }: ReportsChartsProps) {
  return (
    <>
      {/* Produção */}
      <section className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Produção (Litros)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
              <Tooltip cursor={{ fill: '#f5f5f4' }} contentStyle={tooltipStyle} />
              <Bar dataKey="litros" fill="#059669" radius={[4, 4, 0, 0]} name="Litros" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Receita vs Despesas */}
      <section className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Receita vs Despesas (R$)</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
              <Tooltip
                cursor={{ fill: '#f5f5f4' }}
                contentStyle={tooltipStyle}
                formatter={(value) => formatMoney(value as number)}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
              <Bar dataKey="receita" fill="#059669" radius={[4, 4, 0, 0]} name="Receita" />
              <Bar dataKey="despesa" fill="#ef4444" radius={[4, 4, 0, 0]} name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Lucro */}
      <section className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Lucro Diário (R$)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
              <Tooltip
                cursor={{ fill: '#f5f5f4' }}
                contentStyle={tooltipStyle}
                formatter={(value) => formatMoney(value as number)}
              />
              <Bar dataKey="lucro" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Lucro" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Custo por Litro */}
      <section className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Custo por Litro (R$)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => formatMoney(value as number)}
              />
              <Line
                type="monotone"
                dataKey="custoPorLitro"
                stroke="#eab308"
                strokeWidth={3}
                dot={{ r: 4, fill: '#eab308' }}
                name="Custo/L"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}