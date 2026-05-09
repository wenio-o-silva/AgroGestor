# 🥛 FazendaApp

Plataforma web **mobile-first** para pequenos produtores rurais acompanharem sua produção, despesas e lucro no dia a dia — simples, rápida e pensada para uso no campo.

Na primeira versão, o foco é o **módulo de leite**: registro de ordenhas, controle de despesas e dashboard financeiro claro e objetivo.

---

## Funcionalidades

### Módulo de Leite
- Registrar ordenhas (manhã ou tarde) com litros produzidos e preço por litro
- Registrar despesas operacionais (ração, medicamentos, mão de obra, manutenção, outros)
- Suporte a registros retroativos — escolha qualquer data passada
- Dashboard semanal com produção, receita, despesas e lucro
- Gráfico de produção diária
- Relatórios com visão semanal e mensal: produção, receita vs despesas, lucro e custo por litro
- Histórico de vendas e despesas em tabela

### Módulos futuros (em breve)
- Gestão de Suínos
- Gestão de Galinhas

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | [Next.js 14](https://nextjs.org/) (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Ícones | [Lucide React](https://lucide.dev/) |
| Gráficos | [Recharts](https://recharts.org/) |
| Autenticação | Firebase Authentication *(em breve)* |
| Banco de dados | Cloud Firestore *(em breve)* |
| HTTP Client | Axios *(em breve)* |

---

## Estrutura de Pastas

```
app/
├── page.tsx                        # Seleção de módulo (/)
├── login/
│   └── page.tsx                    # Login
└── leite/
    ├── dashboard/
    │   └── page.tsx                # Dashboard principal
    ├── ordenha/
    │   └── nova/
    │       └── page.tsx            # Registrar ordenha
    ├── despesas/
    │   └── nova/
    │       └── page.tsx            # Adicionar despesa
    ├── relatorios/
    │   └── page.tsx                # Relatórios e gráficos
    └── ajustes/
        └── page.tsx                # Ajustes da conta

components/
├── Layout.tsx                      # Layout base com header e nav
├── ProductionCharts.tsx            # Gráfico de produção (dashboard)
└── ReportsCharts.tsx               # Gráficos de relatórios
```

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/fazendaapp.git
cd fazendaapp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Dependências principais

```bash
npm install lucide-react recharts
```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Seleção de módulo de produção |
| `/login` | Autenticação |
| `/leite/dashboard` | Dashboard do módulo de leite |
| `/leite/ordenha/nova` | Registrar nova ordenha |
| `/leite/despesas/nova` | Adicionar nova despesa |
| `/leite/relatorios` | Relatórios e análises |
| `/leite/ajustes` | Ajustes da conta |

---

## Notas de Desenvolvimento

### Gráficos (Recharts + Next.js)
O `ResponsiveContainer` do Recharts precisa ser montado apenas no browser. Para evitar o erro de `width/height -1`, todos os componentes de gráfico usam um guard de montagem via `useEffect`:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => { setMounted(true) }, []);

if (!mounted) return <div className="h-48 w-full" />;
```

### Dados mock
Enquanto o Firebase não está configurado, os dados são mocks locais em cada página. A substituição por chamadas axios está sinalizada com comentários `// TODO` em todos os `handleSubmit`.

### Autenticação
O Firebase Authentication ainda não está integrado. A tela de login existe mas não possui guard de rota ativo. O middleware de proteção de rotas será adicionado junto com a integração do Firebase.

---

## Próximos Passos

- [ ] Configurar Firebase Authentication
- [ ] Configurar Cloud Firestore
- [ ] Integrar API com Axios (substituir mocks)
- [ ] Implementar middleware de proteção de rotas
- [ ] Módulo de Suínos
- [ ] Módulo de Galinhas
