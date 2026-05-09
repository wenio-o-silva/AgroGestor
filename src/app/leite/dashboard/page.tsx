'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Plus, TrendingUp, TrendingDown, DollarSign, Droplets } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProductionChart = dynamic(() => import('@/components/ProductionCharts'), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();

  // Mock data — substituir pelo contexto/Firestore futuramente
  const milkingRecords = [
    { liters: 120, total: 240 },
    { liters: 135, total: 270 },
  ];
  const expenses = [
    { amount: 80 },
    { amount: 50 },
  ];

  // Cálculos
  const totalLiters = milkingRecords.reduce((acc, curr) => acc + curr.liters, 0);
  const totalRevenue = milkingRecords.reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const isProfitPositive = profit >= 0;

  const formatMoney = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const chartData = [
    { name: 'Seg', litros: 120 },
    { name: 'Ter', litros: 135 },
    { name: 'Qua', litros: 110 },
    { name: 'Qui', litros: 140 },
    { name: 'Sex', litros: 125 },
    { name: 'Sáb', litros: 130 },
    { name: 'Dom', litros: 230 },
  ];

  return (
    <Layout title="Gestão de Leite" showBack={false} showNav={true}>
      <div className="p-4 space-y-6">

        {/* Ações rápidas */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/leite/ordenha/nova')}
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white p-4 rounded-3xl shadow-lg shadow-emerald-200 flex flex-col items-center justify-center gap-2 transition-colors"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Plus size={28} />
            </div>
            <span className="font-bold text-center leading-tight">Registrar<br />Ordenha</span>
          </button>

          <button
            onClick={() => router.push('/leite/despesas/nova')}
            className="bg-stone-800 hover:bg-stone-900 active:bg-black text-white p-4 rounded-3xl shadow-lg shadow-stone-300 flex flex-col items-center justify-center gap-2 transition-colors"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Plus size={28} />
            </div>
            <span className="font-bold text-center leading-tight">Adicionar<br />Despesa</span>
          </button>
        </div>

        {/* Resumo da semana */}
        <section>
          <h3 className="text-lg font-bold text-stone-800 mb-3 ml-1">Resumo da Semana</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex items-center text-stone-500 mb-2 gap-1">
                <Droplets size={16} />
                <span className="text-sm font-semibold">Produção</span>
              </div>
              <div className="text-2xl font-extrabold text-stone-800">
                {totalLiters} <span className="text-sm font-normal text-stone-500">L</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex items-center text-stone-500 mb-2 gap-1">
                <DollarSign size={16} />
                <span className="text-sm font-semibold">Receita</span>
              </div>
              <div className="text-2xl font-extrabold text-stone-800">{formatMoney(totalRevenue)}</div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex items-center text-stone-500 mb-2 gap-1">
                <TrendingDown size={16} className="text-red-500" />
                <span className="text-sm font-semibold">Despesas</span>
              </div>
              <div className="text-2xl font-extrabold text-red-600">{formatMoney(totalExpenses)}</div>
            </div>

            <div className={`p-4 rounded-2xl shadow-sm border ${isProfitPositive ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center mb-2 gap-1">
                <TrendingUp size={16} className={isProfitPositive ? 'text-emerald-700' : 'text-red-700'} />
                <span className={`text-sm font-semibold ${isProfitPositive ? 'text-emerald-700' : 'text-red-700'}`}>Lucro</span>
              </div>
              <div className={`text-2xl font-extrabold ${isProfitPositive ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatMoney(profit)}
              </div>
            </div>
          </div>
        </section>

        {/* Gráfico de produção */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200 mb-4">
            <h3 className="text-lg font-bold text-stone-800 mb-4">Produção Semanal (L)</h3>
            <ProductionChart data={chartData} />
        </section>

      </div>
    </Layout>
  );
}