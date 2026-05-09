'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/Layout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Recharts importado via dynamic para evitar erro de SSR (width/height -1)
const RechartsCharts = dynamic(() => import('@/components/ReportsCharts'), { ssr: false });

type ViewMode = 'semana' | 'mes';

// Mock data — substituir por axios futuramente
const baseWeeklyData = [
  { name: 'Seg', litros: 120, receita: 300,   despesa: 50,  lucro: 250,  custoPorLitro: 0.42 },
  { name: 'Ter', litros: 135, receita: 337.5, despesa: 120, lucro: 217.5, custoPorLitro: 0.89 },
  { name: 'Qua', litros: 110, receita: 275,   despesa: 0,   lucro: 275,  custoPorLitro: 0 },
  { name: 'Qui', litros: 140, receita: 350,   despesa: 450, lucro: -100, custoPorLitro: 3.21 },
  { name: 'Sex', litros: 125, receita: 312.5, despesa: 0,   lucro: 312.5, custoPorLitro: 0 },
  { name: 'Sáb', litros: 130, receita: 325,   despesa: 0,   lucro: 325,  custoPorLitro: 0 },
  { name: 'Dom', litros: 230, receita: 575,   despesa: 0,   lucro: 575,  custoPorLitro: 0 },
];

const baseMonthlyData = [
  { name: 'Sem 1', litros: 920, receita: 2300, despesa: 400, lucro: 1900, custoPorLitro: 0.43 },
  { name: 'Sem 2', litros: 850, receita: 2125, despesa: 150, lucro: 1975, custoPorLitro: 0.18 },
  { name: 'Sem 3', litros: 990, receita: 2475, despesa: 800, lucro: 1675, custoPorLitro: 0.81 },
  { name: 'Sem 4', litros: 890, receita: 2225, despesa: 300, lucro: 1925, custoPorLitro: 0.34 },
];

const mockMilkingRecords = [
  { id: '1', date: 'Seg', period: 'Manhã',  liters: 60,  price: 2.5, total: 150 },
  { id: '2', date: 'Seg', period: 'Tarde',  liters: 60,  price: 2.5, total: 150 },
  { id: '3', date: 'Ter', period: 'Manhã',  liters: 70,  price: 2.5, total: 175 },
  { id: '4', date: 'Ter', period: 'Tarde',  liters: 65,  price: 2.5, total: 162.5 },
];

const mockExpenses = [
  { id: '1', date: 'Seg', category: 'Ração',      amount: 50 },
  { id: '2', date: 'Ter', category: 'Medicamento', amount: 120 },
  { id: '3', date: 'Qui', category: 'Manutenção',  amount: 450 },
];

export default function RelatoriosPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('semana');
  const [offset, setOffset] = useState(0);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setOffset(0);
  };

  const applyOffset = (baseData: typeof baseWeeklyData) => {
    if (offset === 0) return baseData;
    return baseData.map(item => ({
      ...item,
      litros:        Math.max(0, item.litros        + offset * 10),
      receita:       Math.max(0, item.receita       + offset * 25),
      despesa:       Math.max(0, item.despesa       - offset * 5),
      lucro:         item.lucro                     + offset * 30,
      custoPorLitro: Math.max(0, item.custoPorLitro + offset * -0.05),
    }));
  };

  const chartData = applyOffset(viewMode === 'semana' ? baseWeeklyData : baseMonthlyData);

  const getPeriodLabel = () => {
    if (viewMode === 'semana') {
      if (offset === 0)  return 'Esta Semana';
      if (offset === -1) return 'Semana Passada';
      return `Semana ${offset}`;
    } else {
      if (offset === 0)  return 'Este Mês';
      if (offset === -1) return 'Mês Passado';
      return `Mês ${offset}`;
    }
  };

  return (
    <Layout title="Relatórios" showBack={false} showNav={true}>
      <div className="p-4 space-y-6">

        <h2 className="text-2xl font-extrabold text-stone-800 tracking-tight ml-1">Análises</h2>

        {/* Toggle semana/mês + navegação */}
        <section className="bg-white p-2 rounded-3xl shadow-sm border border-stone-200">
          <div className="flex bg-stone-100 rounded-2xl p-1 mb-3">
            {(['semana', 'mes'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all capitalize ${
                  viewMode === mode
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {mode === 'semana' ? 'Semana' : 'Mês'}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-2 py-1">
            <button
              onClick={() => setOffset(p => p - 1)}
              className="p-3 rounded-full hover:bg-stone-100 active:bg-stone-200 transition-colors text-stone-500"
              aria-label="Período anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-bold text-stone-800 text-lg">{getPeriodLabel()}</span>
            <button
              onClick={() => setOffset(p => p + 1)}
              disabled={offset >= 0}
              className={`p-3 rounded-full transition-colors ${
                offset >= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-100 active:bg-stone-200 text-stone-500'
              }`}
              aria-label="Próximo período"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Gráficos (SSR desativado via dynamic import) */}
        <RechartsCharts data={chartData} formatMoney={formatMoney} />

        {/* Tabelas */}
        <h2 className="text-2xl font-extrabold text-stone-800 tracking-tight ml-1 pt-4">Tabelas</h2>

        {/* Produção resumida */}
        <section>
          <h3 className="text-lg font-bold text-stone-800 mb-3 ml-1">Produção Resumida</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                    <th className="p-3 font-semibold">{viewMode === 'semana' ? 'Dia' : 'Semana'}</th>
                    <th className="p-3 font-semibold text-right">Total Litros</th>
                    <th className="p-3 font-semibold text-right">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {chartData.map((row) => (
                    <tr key={row.name} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-800">{row.name}</td>
                      <td className="p-3 font-bold text-stone-800 text-right">{row.litros.toFixed(1)} L</td>
                      <td className="p-3 font-bold text-emerald-700 text-right">{formatMoney(row.receita)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tabela de vendas e despesas — apenas semana atual */}
        {offset === 0 && viewMode === 'semana' && (
          <>
            <section>
              <h3 className="text-lg font-bold text-stone-800 mb-3 ml-1">Tabela de Vendas</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-max">
                    <thead>
                      <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                        <th className="p-3 font-semibold">Data</th>
                        <th className="p-3 font-semibold">Período</th>
                        <th className="p-3 font-semibold text-right">Litros</th>
                        <th className="p-3 font-semibold text-right">Preço/L</th>
                        <th className="p-3 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {mockMilkingRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-stone-500 font-medium">Nenhum registro encontrado.</td>
                        </tr>
                      ) : mockMilkingRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-stone-50 whitespace-nowrap">
                          <td className="p-3 font-bold text-stone-800">{r.date}</td>
                          <td className="p-3 text-stone-500">{r.period}</td>
                          <td className="p-3 font-bold text-stone-800 text-right">{r.liters} L</td>
                          <td className="p-3 text-stone-500 text-right">{formatMoney(r.price)}</td>
                          <td className="p-3 font-bold text-emerald-700 text-right">{formatMoney(r.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="pb-4">
              <h3 className="text-lg font-bold text-stone-800 mb-3 ml-1">Tabela de Despesas</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-max">
                    <thead>
                      <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                        <th className="p-3 font-semibold">Data</th>
                        <th className="p-3 font-semibold">Categoria</th>
                        <th className="p-3 font-semibold text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {mockExpenses.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-6 text-center text-stone-500 font-medium">Nenhuma despesa encontrada.</td>
                        </tr>
                      ) : mockExpenses.map((e) => (
                        <tr key={e.id} className="hover:bg-stone-50 whitespace-nowrap">
                          <td className="p-3 font-bold text-stone-800">{e.date}</td>
                          <td className="p-3 text-stone-500">{e.category}</td>
                          <td className="p-3 font-bold text-red-600 text-right">{formatMoney(e.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}

      </div>
    </Layout>
  );
}