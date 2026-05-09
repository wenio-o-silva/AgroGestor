'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { CalendarDays } from 'lucide-react';

export default function NovaOrdenhaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [liters, setLiters] = useState('');
  const [period, setPeriod] = useState<'Manhã' | 'Tarde'>('Manhã');
  const [price, setPrice] = useState('2.50');

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const formatDateLabel = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liters || !price) return;

    setLoading(true);

    // TODO: substituir por chamada axios à API
    setTimeout(() => {
      router.push('/leite/dashboard');
    }, 400);
  };

  return (
    <Layout title="Registrar Ordenha" showBack={true} showNav={false}>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6">

          {/* Data */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Data</label>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <CalendarDays size={20} className="text-stone-400" />
              </div>
              <input
                type="date"
                value={date}
                max={today}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 pl-12 bg-stone-50 border-2 border-stone-200 rounded-2xl text-lg font-bold text-stone-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
              {date === today && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg pointer-events-none">
                  Hoje
                </span>
              )}
            </div>
            {date !== today && (
              <p className="text-xs text-stone-400 font-medium mt-2 ml-1">
                Registrando ordenha para {formatDateLabel(date)}
              </p>
            )}
          </div>

          {/* Litros */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">
              Litros Produzidos
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="0"
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                className="w-full p-4 pr-12 bg-stone-50 border-2 border-stone-200 rounded-2xl text-xl font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                placeholder="Ex: 120"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-xl">L</span>
            </div>
          </div>

          {/* Período */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">
              Período
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPeriod('Manhã')}
                className={`py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  period === 'Manhã'
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                    : 'bg-stone-50 border-stone-200 text-stone-500'
                }`}
              >
                Manhã
              </button>
              <button
                type="button"
                onClick={() => setPeriod('Tarde')}
                className={`py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  period === 'Tarde'
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                    : 'bg-stone-50 border-stone-200 text-stone-500'
                }`}
              >
                Tarde
              </button>
            </div>
          </div>

          {/* Preço por litro */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">
              Preço por Litro (R$)
            </label>
            <input
              type="number"
              step="0.05"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-xl font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              placeholder="Ex: 2.50"
              required
            />
          </div>

          {/* Botão */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !liters || !price}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex justify-center items-center"
            >
              {loading ? (
                <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Salvar Registro'
              )}
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}