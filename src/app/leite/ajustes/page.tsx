'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { LogOut, ArrowLeftRight, User, Bell } from 'lucide-react';

export default function AjustesPage() {
  const router = useRouter();

  return (
    <Layout title="Ajustes" showBack={false} showNav={true}>
      <div className="p-4 space-y-6">

        {/* Conta */}
        <section>
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 ml-2">Conta</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors text-left border-b border-stone-100">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-stone-800">Meu Perfil</div>
                <div className="text-sm text-stone-500">joao@fazenda.com</div>
              </div>
            </button>
            <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors text-left">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-4">
                <Bell size={20} className="text-stone-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-stone-800">Notificações</div>
                <div className="text-sm text-stone-500">Desativado</div>
              </div>
            </button>
          </div>
        </section>

        {/* Sistema */}
        <section>
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 ml-2">Sistema</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors text-left border-b border-stone-100"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                <ArrowLeftRight size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-stone-800">Trocar de Produção</div>
                <div className="text-sm text-stone-500">Voltar para seleção de módulos</div>
              </div>
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full flex items-center p-4 hover:bg-red-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-4">
                <LogOut size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-red-600">Sair da Conta</div>
                <div className="text-sm text-red-400">Desconectar do aplicativo</div>
              </div>
            </button>
          </div>
        </section>

      </div>
    </Layout>
  );
}