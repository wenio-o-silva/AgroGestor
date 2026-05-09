'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { CalendarDays } from 'lucide-react';

export default function NovaDespesaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ração');
  const [description, setDescription] = useState('');

  // Data padrão: hoje no formato YYYY-MM-DD (necessário para input type="date")
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const categories = ['Ração', 'Medicamento', 'Mão de Obra', 'Manutenção', 'Outros'];

  const formatDateLabel = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);

    // TODO: substituir por chamada axios à API
    setTimeout(() => {
      router.push('/leite/dashboard');
    }, 400);
  };

  return (
    <Layout title="Adicionar Despesa" showBack={true} showNav={false}>
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
                    Registrando despesa para {formatDateLabel(date)}
                </p>
                )}
            </div>

            {/* Valor */}
            <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Valor (R$)</label>
                <input
                type="number"
                step="0.05"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-xl font-bold focus:outline-none focus:border-red-500 focus:bg-white transition-all text-red-600 placeholder-red-300"
                placeholder="Ex: 150.00"
                required
                />
            </div>

            {/* Categoria */}
            <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Categoria</label>
                <div className="relative">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-lg font-bold text-stone-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none"
                >
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                </div>
            </div>

            {/* Descrição */}
            <div className="pt-2">
                <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Descrição (Opcional)</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                placeholder="Ex: Casquinha de soja"
                />
            </div>

            {/* Botão */}
            <div className="pt-4">
                <button
                type="submit"
                disabled={loading || !amount}
                className="w-full bg-stone-800 hover:bg-stone-900 active:bg-black disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-stone-300 transition-all flex justify-center items-center"
                >
                {loading ? (
                    <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    'Salvar Despesa'
                )}
                </button>
            </div>

            </form>
        </div>
    </Layout>
  );
}