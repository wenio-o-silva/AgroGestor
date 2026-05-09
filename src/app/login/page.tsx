'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Tractor } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: substituir por Firebase Authentication
    setTimeout(() => {
      router.push('/');
    }, 600);
  };

  return (
    <Layout showNav={false}>
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gradient-to-b from-emerald-50 to-stone-100">

        <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200 mb-8 transform rotate-3">
          <Tractor size={48} className="text-white" strokeWidth={1.5} />
        </div>

        <div className="text-center mb-10 w-full">
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight">AgroGestor</h1>
          <p className="text-stone-500 mt-2 font-medium">Gestão rural simplificada</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">E-mail ou Celular</label>
            <input
              type="text"
              defaultValue="joao@fazenda.com"
              className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              placeholder="Digite seu acesso"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Senha</label>
            <input
              type="password"
              defaultValue="123456"
              className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex justify-center items-center"
          >
            {loading ? (
              <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Entrar'
            )}
          </button>
        </form>

      </div>
    </Layout>
  );
}