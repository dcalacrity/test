/**
 * AURORA SANCTUM — Gantt Chart View
 * Timeline visualization with glassmorphism bars and phase tracking
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";

const phases = [
  { id: 1, name: 'Pre-Production', start: 0, duration: 25, color: 'oklch(0.82 0.15 192)', progress: 100, status: 'COMPLETE' },
  { id: 2, name: 'Casting & Auditions', start: 5, duration: 15, color: 'oklch(0.62 0.24 295)', progress: 100, status: 'COMPLETE' },
  { id: 3, name: 'Location Scouting', start: 8, duration: 12, color: 'oklch(0.72 0.17 162)', progress: 85, status: 'IN PROGRESS' },
  { id: 4, name: 'Script Revisions', start: 3, duration: 20, color: 'oklch(0.82 0.15 85)', progress: 90, status: 'IN PROGRESS' },
  { id: 5, name: 'Equipment Rental', start: 18, duration: 8, color: 'oklch(0.62 0.18 255)', progress: 60, status: 'IN PROGRESS' },
  { id: 6, name: 'Rehearsals', start: 22, duration: 10, color: 'oklch(0.82 0.15 192)', progress: 30, status: 'IN PROGRESS' },
  { id: 7, name: 'Principal Photography', start: 28, duration: 18, color: 'oklch(0.62 0.22 15)', progress: 0, status: 'PLANNED' },
  { id: 8, name: 'Post-Production', start: 40, duration: 20, color: 'oklch(0.72 0.17 162)', progress: 0, status: 'PLANNED' },
  { id: 9, name: 'Sound Design & Mix', start: 45, duration: 12, color: 'oklch(0.62 0.24 295)', progress: 0, status: 'PLANNED' },
  { id: 10, name: 'Color Grading', start: 50, duration: 8, color: 'oklch(0.82 0.15 85)', progress: 0, status: 'PLANNED' },
  { id: 11, name: 'Final Delivery', start: 55, duration: 5, color: 'oklch(0.82 0.15 192)', progress: 0, status: 'PLANNED' },
];

const totalDays = 60;
const weeks = Array.from({ length: Math.ceil(totalDays / 7) }, (_, i) => `W${i + 1}`);
const today = 20; // day 20 of the timeline

export default function GanttView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Phases', value: '11', accent: 'oklch(0.82 0.15 192)' },
          { label: 'In Progress', value: '4', accent: 'oklch(0.82 0.15 85)' },
          { label: 'Completed', value: '2', accent: 'oklch(0.72 0.17 162)' },
          { label: 'Days Remaining', value: '40', accent: 'oklch(0.62 0.24 295)' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.06}>
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
              {stat.label}
            </p>
            <p className="text-[28px] font-bold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Gantt Chart */}
      <GlassCard delay={0.3}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
            Production Timeline
          </h3>
          <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            60 DAY SCHEDULE
          </span>
        </div>

        {/* Week Headers */}
        <div className="flex mb-2 ml-[200px]">
          {weeks.map((w, i) => (
            <div key={w} className="flex-1 text-center text-[9px] font-bold tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
              {w}
            </div>
          ))}
        </div>

        {/* Grid Lines + Today Marker */}
        <div className="relative">
          {/* Today line */}
          <div
            className="absolute top-0 bottom-0 w-px z-10"
            style={{
              left: `calc(200px + ${(today / totalDays) * 100}% * (1 - 200 / 100%))`,
              marginLeft: `${(today / totalDays) * (100)}%`,
              background: 'oklch(0.62 0.22 15 / 60%)',
              boxShadow: '0 0 8px oklch(0.62 0.22 15 / 40%)',
            }}
          />

          {/* Rows */}
          {phases.map((phase, pi) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + pi * 0.04, duration: 0.3 }}
              className="flex items-center h-10 border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors group"
            >
              {/* Phase Name */}
              <div className="w-[200px] flex-shrink-0 px-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: phase.color }} />
                <span className="text-[11px] truncate" style={{ color: 'oklch(0.75 0.01 260)' }}>
                  {phase.name}
                </span>
              </div>

              {/* Bar Area */}
              <div className="flex-1 relative h-full flex items-center">
                {/* Background grid */}
                {weeks.map((_, wi) => (
                  <div key={wi} className="flex-1 h-full border-l border-[oklch(1_0_0/3%)]" />
                ))}

                {/* Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + pi * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-6 rounded-md overflow-hidden"
                  style={{
                    left: `${(phase.start / totalDays) * 100}%`,
                    width: `${(phase.duration / totalDays) * 100}%`,
                    transformOrigin: 'left',
                  }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 rounded-md" style={{ background: `${phase.color}20`, border: `1px solid ${phase.color}30` }} />
                  {/* Progress fill */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-md"
                    style={{
                      width: `${phase.progress}%`,
                      background: `linear-gradient(90deg, ${phase.color}60, ${phase.color}30)`,
                    }}
                  />
                  {/* Label */}
                  <div className="absolute inset-0 flex items-center px-2">
                    <span className="text-[9px] font-semibold tracking-[0.5px] truncate" style={{ fontFamily: 'var(--font-mono)', color: phase.progress > 0 ? 'white' : `${phase.color}` }}>
                      {phase.progress}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Status */}
              <div className="w-[100px] flex-shrink-0 flex justify-end px-3">
                <span className="px-2 py-0.5 rounded text-[8px] font-bold" style={{
                  background: phase.status === 'COMPLETE' ? 'oklch(0.72 0.17 162 / 15%)' : phase.status === 'IN PROGRESS' ? 'oklch(0.82 0.15 85 / 15%)' : 'oklch(0.5 0.015 260 / 15%)',
                  color: phase.status === 'COMPLETE' ? 'oklch(0.72 0.17 162)' : phase.status === 'IN PROGRESS' ? 'oklch(0.82 0.15 85)' : 'oklch(0.5 0.015 260)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {phase.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
