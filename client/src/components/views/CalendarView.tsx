/**
 * AURORA SANCTUM — Calendar View
 * Ethereal glassmorphism calendar with luminous event indicators
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState, useMemo } from "react";

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample events
const sampleEvents: Record<string, { type: string; label: string }[]> = {
  '2026-02-15': [{ type: 'shoot', label: 'Location Scout' }],
  '2026-02-18': [{ type: 'shoot', label: 'Shoot Day 1' }, { type: 'milestone', label: 'Pre-prod Complete' }],
  '2026-02-19': [{ type: 'shoot', label: 'Shoot Day 2' }],
  '2026-02-20': [{ type: 'shoot', label: 'Shoot Day 3' }],
  '2026-02-25': [{ type: 'milestone', label: 'Edit Review' }],
  '2026-02-28': [{ type: 'shoot', label: 'Pickup Day' }],
  '2026-03-05': [{ type: 'milestone', label: 'Final Delivery' }],
};

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

    // Previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = month === 0 ? 12 : month;
      const y = month === 0 ? year - 1 : year;
      days.push({ day: d, isCurrentMonth: false, dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        isCurrentMonth: true,
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      });
    }

    // Next month
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month + 2 > 12 ? 1 : month + 2;
      const y = month + 2 > 12 ? year + 1 : year;
      days.push({ day: d, isCurrentMonth: false, dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }

    return days;
  }, [year, month]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Calendar Header */}
      <GlassCard delay={0}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-[oklch(0.7_0.015_260)]" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.7_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
            >
              <ChevronRight className="w-4 h-4 text-[oklch(0.7_0.015_260)]" />
            </button>
            <h2
              className="text-[22px] tracking-[2px] text-white"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              {MONTH_NAMES[month]} {year}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg overflow-hidden border border-[oklch(1_0_0/8%)]">
              <button className="px-3 py-1.5 text-[10px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border-r border-[oklch(1_0_0/8%)]"
                style={{ fontFamily: 'var(--font-mono)' }}>Month</button>
              <button className="px-3 py-1.5 text-[10px] font-semibold tracking-[1px] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.55_0.015_260)]"
                style={{ fontFamily: 'var(--font-mono)' }}>Week</button>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Plus className="w-3 h-3" />
              Quick Add Shoot
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Shoot Days', value: '12', color: 'oklch(0.82 0.15 192)' },
          { label: 'Next Shoot', value: 'Feb 18', color: 'oklch(0.72 0.17 162)' },
          { label: 'Days Until Wrap', value: '16', color: 'oklch(0.62 0.24 295)' },
          { label: 'Milestones', value: '3', color: 'oklch(0.82 0.15 85)' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={0.05 + i * 0.05} className="!p-3">
            <p className="text-[9px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              {stat.label}
            </p>
            <p className="text-[18px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: stat.color }}>
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Calendar Grid */}
      <GlassCard delay={0.15} hover={false}>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {DAY_NAMES.map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-px">
          {calendarDays.map((dayInfo, i) => {
            const events = sampleEvents[dayInfo.dateStr] || [];
            const isToday = dayInfo.dateStr === todayStr;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.005 }}
                className={`
                  min-h-[90px] p-2 rounded-lg border transition-all duration-200 cursor-pointer
                  ${dayInfo.isCurrentMonth
                    ? 'border-[oklch(1_0_0/4%)] hover:border-[oklch(1_0_0/12%)] hover:bg-[oklch(1_0_0/3%)]'
                    : 'border-transparent opacity-30'
                  }
                  ${isToday ? 'border-[oklch(0.82_0.15_192/30%)] bg-[oklch(0.82_0.15_192/5%)]' : ''}
                `}
              >
                <span
                  className={`text-[12px] font-medium ${isToday ? 'text-[oklch(0.82_0.15_192)] font-bold' : dayInfo.isCurrentMonth ? 'text-[oklch(0.7_0.015_260)]' : 'text-[oklch(0.35_0.015_260)]'}`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {dayInfo.day}
                </span>
                {events.map((evt, j) => (
                  <div
                    key={j}
                    className="mt-1 px-1.5 py-0.5 rounded text-[9px] font-medium truncate"
                    style={{
                      background: evt.type === 'shoot' ? 'oklch(0.82 0.15 192 / 15%)' : 'oklch(0.82 0.15 85 / 15%)',
                      color: evt.type === 'shoot' ? 'oklch(0.82 0.15 192)' : 'oklch(0.82 0.15 85)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {evt.label}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
