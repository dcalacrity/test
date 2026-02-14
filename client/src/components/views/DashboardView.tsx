/**
 * AURORA SANCTUM — Dashboard View
 * Bento-grid layout with frosted glass stat cards and activity log
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Archive,
  Wrench,
  DollarSign,
  Target,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

const PRODUCTION_HERO = "https://private-us-east-1.manuscdn.com/sessionFile/YyDUjlpPqPggQsTBWWnQPY/sandbox/gU7PsCs9JMEg6r1wTW808l-img-3_1771018924000_na1fn_cHJvZHVjdGlvbi1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXlEVWpscFBxUGdnUXNUQldXblFQWS9zYW5kYm94L2dVN1BzQ3M5Sk1FZzZyMXdUVzgwOGwtaW1nLTNfMTc3MTAxODkyNDAwMF9uYTFmbl9jSEp2WkhWamRHbHZiaTFvWlhKdi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Api2pmznxj0cb5k1s9jnRBphA7oM2L0sSghR3Jvc61edi3ks3pLFSv7akZPpxuGBEF7Q6qjL3WVenFTI95tXVBccWlJwFpUzdFoMTh4xE1J2fvFcgi5sD7O2llcToPnCwZcMMMbQLvZcJ~o9yf7kTjKHEq6VnSGLE9ebwG57GFCpwAYkLwc16bbEL~BSh9Q~Vl0pqSoeB4F7DCYSzfHa0VqC-gwMn2d4zoXN9CZGbtzYRPCWY3vsI3dLQYvx-9EjJSLubBKlq7pdfuP3CmwTFSDGfiTA6t6YwRVwd0wE~Iw67PE4uDu8Vist0pEZFdv9d1Ad7QHwHuZFAulZGXxVHA__";

interface StatCardData {
  label: string;
  value: string;
  sub: string;
  accent: 'cyan' | 'violet' | 'emerald' | 'gold' | 'rose' | 'blue';
  icon: typeof CalendarDays;
}

const stats: StatCardData[] = [
  { label: 'Shoot Days', value: '12', sub: 'Scheduled', accent: 'cyan', icon: CalendarDays },
  { label: 'Vault Assets', value: '847', sub: 'Files Logged', accent: 'violet', icon: Archive },
  { label: 'Tech Items', value: '34', sub: 'Equipment', accent: 'emerald', icon: Wrench },
  { label: 'Budget Left', value: '$24,500', sub: 'Available', accent: 'gold', icon: DollarSign },
  { label: 'Prod Pipeline', value: '$180K', sub: 'Potential', accent: 'blue', icon: Target },
  { label: 'Risk Items', value: '3', sub: 'Active', accent: 'rose', icon: AlertTriangle },
];

const accentColors: Record<string, string> = {
  cyan: 'oklch(0.82 0.15 192)',
  violet: 'oklch(0.62 0.24 295)',
  emerald: 'oklch(0.72 0.17 162)',
  gold: 'oklch(0.82 0.15 85)',
  rose: 'oklch(0.62 0.22 15)',
  blue: 'oklch(0.62 0.18 255)',
};

const activityLog = [
  { time: '14:32', msg: 'Budget updated — Camera Dept +$2,400', type: 'info' },
  { time: '13:15', msg: 'New shoot day added — Feb 28, 2026', type: 'success' },
  { time: '12:48', msg: 'Vault asset uploaded — Scene 4A B-Roll', type: 'info' },
  { time: '11:20', msg: 'Risk item flagged — Weather delay potential', type: 'warning' },
  { time: '10:05', msg: 'Cast member confirmed — Lead Role', type: 'success' },
  { time: '09:30', msg: 'System initialized — Production loaded', type: 'info' },
];

export default function DashboardView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden h-[200px]"
      >
        <img
          src={PRODUCTION_HERO}
          alt="Production"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.03_0.015_260/85%)] via-[oklch(0.03_0.015_260/60%)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.03_0.015_260/80%)] to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <h2
            className="text-[42px] tracking-[6px] text-white mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            COMMAND CENTER
          </h2>
          <p
            className="text-[12px] tracking-[3px] uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'oklch(0.82 0.15 192)',
            }}
          >
            Production Overview & Status
          </p>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} accent={stat.accent} delay={i * 0.06}>
              <div className="flex items-start justify-between mb-3">
                <p
                  className="text-[10px] font-semibold tracking-[1.5px] uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'oklch(0.55 0.015 260)',
                  }}
                >
                  {stat.label}
                </p>
                <Icon
                  className="w-4 h-4"
                  style={{ color: accentColors[stat.accent] }}
                  strokeWidth={1.5}
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.4 }}
                className="text-[28px] font-bold text-white mb-1"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                {stat.value}
              </motion.p>
              <p
                className="text-[10px] tracking-[1px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'oklch(0.5 0.015 260)',
                }}
              >
                {stat.sub}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Two Column: Hot Cost + Business CRM */}
      <div className="grid grid-cols-2 gap-4">
        {/* Hot Cost Summary */}
        <GlassCard delay={0.4}>
          <div className="flex items-center justify-between mb-5">
            <h3
              className="text-[14px] font-semibold tracking-[1px] text-white"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              Hot Cost Summary
            </h3>
            <span
              className="px-2.5 py-1 rounded-md text-[9px] font-bold tracking-[1px]"
              style={{
                background: 'oklch(0.72 0.17 162 / 15%)',
                color: 'oklch(0.72 0.17 162)',
                border: '1px solid oklch(0.72 0.17 162 / 25%)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ON BUDGET
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Total Budget
              </p>
              <p className="text-[22px] font-bold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                $50,000
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Spent + Committed
              </p>
              <p className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.82 0.15 85)' }}>
                $25,500
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Payroll Cost
              </p>
              <p className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.62 0.24 295)' }}>
                $12,800
              </p>
            </div>
          </div>
          {/* Budget bar */}
          <div className="mt-5">
            <div className="w-full h-2 rounded-full bg-[oklch(0.15_0.015_260)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '51%' }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, oklch(0.72 0.17 162), oklch(0.82 0.15 192))',
                  boxShadow: '0 0 12px oklch(0.72 0.17 162 / 40%)',
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                51% UTILIZED
              </span>
              <span className="text-[9px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.72 0.17 162)' }}>
                $24,500 REMAINING
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Business CRM */}
        <GlassCard delay={0.45}>
          <div className="flex items-center justify-between mb-5">
            <h3
              className="text-[14px] font-semibold tracking-[1px] text-white"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              Business CRM
            </h3>
            <span
              className="px-2.5 py-1 rounded-md text-[9px] font-bold tracking-[1px]"
              style={{
                background: 'oklch(0.82 0.15 85 / 15%)',
                color: 'oklch(0.82 0.15 85)',
                border: '1px solid oklch(0.82 0.15 85 / 25%)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              GLOBAL
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Pipeline Value
              </p>
              <p className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.82 0.15 85)' }}>
                $320K
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Total Revenue
              </p>
              <p className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.72 0.17 162)' }}>
                $145K
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
                Active Leads
              </p>
              <p className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.82 0.15 192)' }}>
                24
              </p>
            </div>
          </div>
          {/* Pipeline stages */}
          <div className="mt-5 flex gap-1">
            {['New', 'Contacted', 'Pitched', 'Negotiating', 'Closed'].map((stage, i) => (
              <div key={stage} className="flex-1">
                <div
                  className="h-1.5 rounded-full mb-1"
                  style={{
                    background: i < 3
                      ? `oklch(0.82 0.15 85 / ${80 - i * 20}%)`
                      : `oklch(0.5 0.015 260 / 20%)`,
                  }}
                />
                <p className="text-[8px] text-center tracking-[0.5px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity Log */}
      <GlassCard delay={0.5}>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[14px] font-semibold tracking-[1px] text-white flex items-center gap-2"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            <Activity className="w-4 h-4" style={{ color: 'oklch(0.82 0.15 192)' }} />
            Activity Log
          </h3>
        </div>
        <div className="space-y-1">
          {activityLog.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[oklch(1_0_0/3%)] transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: entry.type === 'success'
                    ? 'oklch(0.72 0.17 162)'
                    : entry.type === 'warning'
                      ? 'oklch(0.82 0.15 85)'
                      : 'oklch(0.82 0.15 192)',
                  boxShadow: entry.type === 'success'
                    ? '0 0 6px oklch(0.72 0.17 162 / 50%)'
                    : entry.type === 'warning'
                      ? '0 0 6px oklch(0.82 0.15 85 / 50%)'
                      : '0 0 6px oklch(0.82 0.15 192 / 50%)',
                }}
              />
              <span
                className="text-[11px] w-12 flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'oklch(0.45 0.015 260)',
                }}
              >
                {entry.time}
              </span>
              <span
                className="text-[13px]"
                style={{ color: 'oklch(0.75 0.01 260)' }}
              >
                {entry.msg}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
