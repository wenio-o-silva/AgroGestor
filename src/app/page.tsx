'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Milk, Egg, PiggyBank } from 'lucide-react';

export default function ModulesPage() {
  const router = useRouter();

  return (
    <Layout title="Selecione a Produção" showNav={false} showBack={false}>
      <div className="p-6 h-full flex flex-col justify-center bg-stone-50 flex-1">

        <div className="space-y-4">
          {/* Ativo - Leite */}
          <button
            onClick={() => router.push('/leite/dashboard')}
            className="w-full flex items-center p-6 bg-white border-2 border-emerald-500 rounded-3xl shadow-lg shadow-emerald-100/50 hover:bg-emerald-50 active:bg-emerald-100 transition-all text-left"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mr-5 shrink-0">
              <Milk size={32} className="text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-800">Gestão de Leite</h3>
              <p className="text-stone-500 font-medium mt-1">Acessar painel</p>
            </div>
          </button>

          {/* Em breve - Suínos */}
          <button
            disabled
            className="w-full flex items-center p-6 bg-stone-50 border-2 border-stone-200 rounded-3xl opacity-70 relative overflow-hidden text-left cursor-not-allowed"
          >
            <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mr-5 shrink-0">
              <PiggyBank size={32} className="text-stone-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-600">Gestão de Suínos</h3>
              <p className="text-stone-400 font-medium mt-1">Em breve</p>
            </div>
          </button>

          {/* Em breve - Galinhas */}
          <button
            disabled
            className="w-full flex items-center p-6 bg-stone-50 border-2 border-stone-200 rounded-3xl opacity-70 relative overflow-hidden text-left cursor-not-allowed"
          >
            <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mr-5 shrink-0">
              <Egg size={32} className="text-stone-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-600">Gestão de Galinhas</h3>
              <p className="text-stone-400 font-medium mt-1">Em breve</p>
            </div>
          </button>
        </div>

      </div>
    </Layout>
  );
}