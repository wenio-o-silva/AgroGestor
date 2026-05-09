'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, Home, BarChart2, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
}

export function Layout({ children, title, showBack = false, showNav = true }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center w-full">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative overflow-hidden">

        {/* Header */}
        {(title || showBack) && (
          <header className="bg-emerald-700 text-white p-4 flex items-center shadow-md z-10 sticky top-0">
            {showBack && (
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 mr-2 rounded-full hover:bg-emerald-600 active:bg-emerald-800 transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight flex-1 truncate">
              {title}
            </h1>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 flex flex-col">
          {children}
        </main>

        {/* Bottom Navigation */}
        {showNav && (
          <nav className="absolute bottom-0 w-full bg-white border-t border-stone-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-around p-3 pb-6 z-10">
            <button
              onClick={() => router.push('/leite/dashboard')}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                pathname === '/leite/dashboard' ? 'text-emerald-700' : 'text-stone-500 hover:text-emerald-600'
              }`}
            >
              <Home size={28} className={pathname === '/leite/dashboard' ? 'fill-emerald-100' : ''} />
              <span className="text-xs font-semibold mt-1">Dashboard</span>
            </button>

            <button
              onClick={() => router.push('/leite/relatorios')}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                pathname === '/leite/relatorios' ? 'text-emerald-700' : 'text-stone-500 hover:text-emerald-600'
              }`}
            >
              <BarChart2 size={28} className={pathname === '/leite/relatorios' ? 'fill-emerald-100' : ''} />
              <span className="text-xs font-semibold mt-1">Relatórios</span>
            </button>

            <button
              onClick={() => router.push('/leite/ajustes')}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                pathname === '/leite/ajustes' ? 'text-emerald-700' : 'text-stone-500 hover:text-emerald-600'
              }`}
            >
              <Settings size={28} className={pathname === '/leite/ajustes' ? 'fill-emerald-100' : ''} />
              <span className="text-xs font-semibold mt-1">Ajustes</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}