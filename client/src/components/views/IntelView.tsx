/**
 * AURORA SANCTUM — Intel View (CRM Intelligence Dashboard)
 * Revenue analytics, conversion metrics, and ledger
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Percent, Plus, Download,
  ArrowUpRight, ArrowDownRight, Calendar, Tag, MoreHorizontal,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  source: string;
  type: 'income' | 'expense' | 'pending';
  amount: string;
  category: string;
}

interface IntelViewProps {
  variant: 'production' | 'business';
}

const prodTransactions: Transaction[] = [
  { id: 't1', date: '2026-02-12', source: 'Camera Rentals LA', type: 'income', amount: '$12,000', category: 'Equipment' },
  { id: 't2', date: '2026-02-10', source: 'Sound Design Studio', type: 'income', amount: '$6,000', category: 'Post-Production' },
  { id: 't3', date: '2026-02-08', source: 'Location Scout Pro', type: 'pending', amount: '$8,500', category: 'Locations' },
  { id: 't4', date: '2026-02-05', source: 'Wardrobe Dept', type: 'income', amount: '$4,200', category: 'Wardrobe' },
  { id: 't5', date: '2026-02-03', source: 'Catering Solutions', type: 'pending', amount: '$2,800', category: 'Catering' },
  { id: 't6', date: '2026-01-28', source: 'Talent Agency X', type: 'income', amount: '$5,000', category: 'Talent' },
  { id: 't7', date: '2026-01-25', source: 'Grip & Electric Co', type: 'income', amount: '$3,200', category: 'Equipment' },
];

const bizTransactions: Transaction[] = [
  { id: 'bt1', date: '2026-02-11', source: 'Zenith Auto', type: 'income', amount: '$35,000', category: 'Product Launch' },
  { id: 'bt2', date: '2026-02-09', source: 'Artisan Coffee', type: 'income', amount: '$15,000', category: 'Commercial' },
  { id: 'bt3', date: '2026-02-07', source: 'Stellar Hotels', type: 'pending', amount: '$60,000', category: 'Brand Film' },
  { id: 'bt4', date: '2026-02-04', source: 'Nexus Gaming', type: 'pending', amount: '$45,000', category: 'Cinematic Trailer' },
  { id: 'bt5', date: '2026-02-01', source: 'Metro Real Estate', type: 'income', amount: '$12,000', category: 'VR Tour' },
  { id: 'bt6', date: '2026-01-29', source: 'FitLife Brand', type: 'pending', amount: '$8,500', category: 'Social Content' },
];

const typeStyles = {
  income: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)', label: 'RECEIVED', icon: ArrowUpRight },
  expense: { bg: 'oklch(0.62 0.22 15 / 15%)', color: 'oklch(0.62 0.22 15)', label: 'EXPENSE', icon: ArrowDownRight },
  pending: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'PENDING', icon: TrendingUp },
};

export default function IntelView({ variant }: IntelViewProps) {
  const transactions = variant === 'production' ? prodTransactions : bizTransactions;
  const accentColor = variant === 'production' ? 'oklch(0.82 0.15 192)' : 'oklch(0.82 0.15 85)';
  const tagLabel = variant === 'production' ? 'PRODUCTION CRM' : 'BUSINESS CRM';

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + parseInt(t.amount.replace(/[$,]/g, '')), 0);
  const totalPending = transactions.filter(t => t.type === 'pending').reduce((s, t) => s + parseInt(t.amount.replace(/[$,]/g, '')), 0);
  const pipelineValue = totalIncome + totalPending;
  const conversionRate = Math.round((totalIncome / pipelineValue) * 100);

  // Monthly breakdown for mini chart
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const monthlyData = variant === 'production'
    ? [8200, 12400, 9800, 15600, 30400]
    : [22000, 35000, 28000, 42000, 62000];
  const maxMonthly = Math.max(...monthlyData);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Header */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[1px]"
              style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              {tagLabel}
            </span>
            <span className="text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              Intel Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Download className="w-3.5 h-3.5" /> EXPORT
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px]"
              style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
              <Plus className="w-3.5 h-3.5" /> ADD TRANSACTION
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard delay={0.05} accent="gold">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
              Pipeline Value
            </p>
            <DollarSign className="w-4 h-4" style={{ color: 'oklch(0.82 0.15 85)' }} strokeWidth={1.5} />
          </div>
          <p className="text-[28px] font-bold text-white mb-1" style={{ fontFamily: 'var(--font-grotesk)' }}>
            ${pipelineValue.toLocaleString()}
          </p>
          <p className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            Potential Revenue
          </p>
        </GlassCard>

        <GlassCard delay={0.1} accent="emerald">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
              Total Revenue
            </p>
            <TrendingUp className="w-4 h-4" style={{ color: 'oklch(0.72 0.17 162)' }} strokeWidth={1.5} />
          </div>
          <p className="text-[28px] font-bold mb-1" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.72 0.17 162)' }}>
            ${totalIncome.toLocaleString()}
          </p>
          <p className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            Confirmed
          </p>
        </GlassCard>

        <GlassCard delay={0.15} accent="violet">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
              Conversion Rate
            </p>
            <Percent className="w-4 h-4" style={{ color: 'oklch(0.62 0.24 295)' }} strokeWidth={1.5} />
          </div>
          <p className="text-[28px] font-bold mb-1" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.62 0.24 295)' }}>
            {conversionRate}%
          </p>
          <p className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            Closed / Total
          </p>
        </GlassCard>
      </div>

      {/* Revenue Chart + Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mini Bar Chart */}
        <GlassCard delay={0.2}>
          <h3 className="text-[14px] font-semibold tracking-[1px] text-white mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
            Monthly Revenue
          </h3>
          <div className="flex items-end gap-3 h-[140px]">
            {months.map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(monthlyData[i] / maxMonthly) * 120}px` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md"
                  style={{
                    background: i === months.length - 1
                      ? `linear-gradient(180deg, ${accentColor}, ${accentColor}40)`
                      : 'linear-gradient(180deg, oklch(0.3 0.015 260), oklch(0.15 0.015 260))',
                    boxShadow: i === months.length - 1 ? `0 0 12px ${accentColor}30` : 'none',
                  }}
                />
                <span className="text-[9px] tracking-[0.5px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                  {month}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Category Breakdown */}
        <GlassCard delay={0.25}>
          <h3 className="text-[14px] font-semibold tracking-[1px] text-white mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
            By Category
          </h3>
          <div className="space-y-3">
            {Array.from(new Set(transactions.map(t => t.category))).slice(0, 5).map((cat, i) => {
              const catTotal = transactions.filter(t => t.category === cat).reduce((s, t) => s + parseInt(t.amount.replace(/[$,]/g, '')), 0);
              const pct = Math.round((catTotal / pipelineValue) * 100);
              const colors = ['oklch(0.82 0.15 192)', 'oklch(0.62 0.24 295)', 'oklch(0.82 0.15 85)', 'oklch(0.72 0.17 162)', 'oklch(0.62 0.22 15)'];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium" style={{ color: 'oklch(0.75 0.01 260)' }}>{cat}</span>
                    <span className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: colors[i % colors.length] }}>
                      ${catTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[oklch(0.15_0.015_260)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: colors[i % colors.length], boxShadow: `0 0 8px ${colors[i % colors.length]}30` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Revenue Ledger */}
      <GlassCard delay={0.3} hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
            Revenue Ledger
          </h3>
        </div>

        {/* Table Header */}
        <div className="grid gap-4 py-3 border-b border-[oklch(1_0_0/8%)]"
          style={{ gridTemplateColumns: '100px 1fr 120px 100px 80px' }}>
          {['Date', 'Source', 'Category', 'Amount', 'Status'].map(h => (
            <span key={h} className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {transactions.map((tx, i) => {
          const style = typeStyles[tx.type];
          const Icon = style.icon;
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.04 }}
              className="grid gap-4 py-3 items-center border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors cursor-pointer"
              style={{ gridTemplateColumns: '100px 1fr 120px 100px 80px' }}
            >
              <span className="text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                {tx.date}
              </span>
              <span className="text-[13px] text-[oklch(0.8_0.005_260)]">
                {tx.source}
              </span>
              <span className="text-[11px] flex items-center gap-1.5">
                <Tag className="w-3 h-3" style={{ color: 'oklch(0.45 0.015 260)' }} />
                <span style={{ color: 'oklch(0.6 0.015 260)' }}>{tx.category}</span>
              </span>
              <span className="text-[13px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: style.color }}>
                {tx.amount}
              </span>
              <span className="text-[9px] font-bold tracking-[1px] px-2 py-1 rounded text-center flex items-center gap-1 justify-center"
                style={{ fontFamily: 'var(--font-mono)', background: style.bg, color: style.color }}>
                <Icon className="w-3 h-3" />
                {style.label}
              </span>
            </motion.div>
          );
        })}
      </GlassCard>
    </div>
  );
}
