/**
 * AURORA SANCTUM — Financials View
 * Premium budget tracking with animated charts and glass panels
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Plus, Download, PieChart } from "lucide-react";

interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  committed: number;
  color: string;
}

const budgetCategories: BudgetCategory[] = [
  { name: 'Camera Department', budgeted: 12000, spent: 8500, committed: 2400, color: 'oklch(0.82 0.15 192)' },
  { name: 'Lighting & Grip', budgeted: 8000, spent: 5200, committed: 1800, color: 'oklch(0.62 0.24 295)' },
  { name: 'Art Department', budgeted: 6000, spent: 3400, committed: 1200, color: 'oklch(0.82 0.15 85)' },
  { name: 'Sound', budgeted: 4000, spent: 2800, committed: 600, color: 'oklch(0.72 0.17 162)' },
  { name: 'Talent', budgeted: 10000, spent: 4000, committed: 3000, color: 'oklch(0.62 0.22 15)' },
  { name: 'Locations', budgeted: 5000, spent: 1600, committed: 2000, color: 'oklch(0.62 0.18 255)' },
  { name: 'Post-Production', budgeted: 5000, spent: 0, committed: 0, color: 'oklch(0.75 0.15 55)' },
];

const totalBudget = 50000;
const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
const totalCommitted = budgetCategories.reduce((s, c) => s + c.committed, 0);
const remaining = totalBudget - totalSpent - totalCommitted;

const recentTransactions = [
  { date: 'Feb 13', description: 'RED Komodo Rental — Day 3', amount: -1200, category: 'Camera' },
  { date: 'Feb 12', description: 'Gaffer Kit Extension', amount: -800, category: 'Lighting' },
  { date: 'Feb 12', description: 'Location Deposit — Warehouse', amount: -1600, category: 'Locations' },
  { date: 'Feb 11', description: 'Sound Mixer Day Rate', amount: -600, category: 'Sound' },
  { date: 'Feb 10', description: 'Craft Services — Week 2', amount: -450, category: 'Art Dept' },
  { date: 'Feb 10', description: 'Budget Increase Approved', amount: 5000, category: 'General' },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);
}

export default function FinancialsView() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Budget', value: formatCurrency(totalBudget), color: 'oklch(0.85 0.005 260)', icon: DollarSign, accent: 'cyan' as const },
          { label: 'Total Spent', value: formatCurrency(totalSpent), color: 'oklch(0.62 0.22 15)', icon: TrendingDown, accent: 'rose' as const },
          { label: 'Committed', value: formatCurrency(totalCommitted), color: 'oklch(0.82 0.15 85)', icon: TrendingUp, accent: 'gold' as const },
          { label: 'Remaining', value: formatCurrency(remaining), color: 'oklch(0.72 0.17 162)', icon: PieChart, accent: 'emerald' as const },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <GlassCard key={card.label} accent={card.accent} delay={i * 0.06}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                  {card.label}
                </p>
                <Icon className="w-4 h-4" style={{ color: card.color }} strokeWidth={1.5} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.4 }}
                className="text-[26px] font-bold"
                style={{ fontFamily: 'var(--font-grotesk)', color: card.color }}
              >
                {card.value}
              </motion.p>
            </GlassCard>
          );
        })}
      </div>

      {/* Two Column: Budget Breakdown + Transactions */}
      <div className="grid grid-cols-5 gap-4">
        {/* Budget Breakdown — 3 cols */}
        <div className="col-span-3">
          <GlassCard delay={0.3} hover={false}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                Department Budgets
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  <Plus className="w-3 h-3" />
                  ADD
                </button>
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  <Download className="w-3 h-3" />
                  EXPORT
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {budgetCategories.map((cat, i) => {
                const utilization = ((cat.spent + cat.committed) / cat.budgeted) * 100;
                const spentPct = (cat.spent / cat.budgeted) * 100;
                const committedPct = (cat.committed / cat.budgeted) * 100;

                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-medium text-[oklch(0.8_0.005_260)]">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                          {formatCurrency(cat.spent + cat.committed)} / {formatCurrency(cat.budgeted)}
                        </span>
                        <span
                          className="text-[10px] font-bold tracking-[1px] w-12 text-right"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: utilization > 90 ? 'oklch(0.62 0.22 15)' : utilization > 70 ? 'oklch(0.82 0.15 85)' : 'oklch(0.72 0.17 162)',
                          }}
                        >
                          {Math.round(utilization)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[oklch(0.15_0.015_260)] overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${spentPct}%` }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-l-full"
                        style={{
                          background: cat.color,
                          boxShadow: `0 0 8px ${cat.color}60`,
                        }}
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${committedPct}%` }}
                        transition={{ delay: 0.7 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full"
                        style={{
                          background: `${cat.color}40`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 pt-3 border-t border-[oklch(1_0_0/6%)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1.5 rounded-full bg-[oklch(0.82_0.15_192)]" />
                <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>Spent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1.5 rounded-full bg-[oklch(0.82_0.15_192/40%)]" />
                <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>Committed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1.5 rounded-full bg-[oklch(0.15_0.015_260)]" />
                <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>Available</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Transactions — 2 cols */}
        <div className="col-span-2">
          <GlassCard delay={0.35} hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                Recent Transactions
              </h3>
              <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
                style={{ fontFamily: 'var(--font-mono)' }}>
                VIEW ALL
              </button>
            </div>

            <div className="space-y-1">
              {recentTransactions.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[oklch(1_0_0/3%)] transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-[12px] text-[oklch(0.8_0.005_260)] mb-0.5">{tx.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                        {tx.date}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'oklch(0.15 0.015 260 / 60%)',
                        color: 'oklch(0.5 0.015 260)',
                      }}>
                        {tx.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-[13px] font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: tx.amount > 0 ? 'oklch(0.72 0.17 162)' : 'oklch(0.62 0.22 15)',
                    }}
                  >
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Overall Budget Bar */}
      <GlassCard delay={0.5}>
        <h3 className="text-[14px] font-semibold tracking-[1px] text-white mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
          Overall Budget Utilization
        </h3>
        <div className="w-full h-6 rounded-full bg-[oklch(0.12_0.015_260)] overflow-hidden flex relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalSpent / totalBudget) * 100}%` }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(90deg, oklch(0.62 0.22 15), oklch(0.75 0.15 55))',
              boxShadow: '0 0 16px oklch(0.62 0.22 15 / 40%)',
            }}
          >
            <span className="text-[9px] font-bold text-white tracking-[1px]" style={{ fontFamily: 'var(--font-mono)' }}>
              SPENT
            </span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalCommitted / totalBudget) * 100}%` }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex items-center justify-center"
            style={{
              background: 'oklch(0.82 0.15 85 / 40%)',
            }}
          >
            <span className="text-[9px] font-bold tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 85)' }}>
              COMMITTED
            </span>
          </motion.div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            {Math.round(((totalSpent + totalCommitted) / totalBudget) * 100)}% Utilized
          </span>
          <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.72 0.17 162)' }}>
            {formatCurrency(remaining)} Available
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
