/**
 * AURORA SANCTUM — Milestones View
 * Key deliverables & deadline tracking with visual timeline
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const milestones = [
  { id: 'M-001', title: 'Script Lock', date: 'Jan 15, 2026', status: 'complete', owner: 'Writer', notes: 'Final draft approved by all stakeholders' },
  { id: 'M-002', title: 'Cast Finalized', date: 'Jan 28, 2026', status: 'complete', owner: 'Casting Director', notes: 'All principal roles confirmed and contracted' },
  { id: 'M-003', title: 'Location Permits Secured', date: 'Feb 10, 2026', status: 'in-progress', owner: 'Location Manager', notes: 'Warehouse permit pending city approval' },
  { id: 'M-004', title: 'Equipment Package Confirmed', date: 'Feb 18, 2026', status: 'in-progress', owner: 'DP', notes: 'Camera and lighting packages under review' },
  { id: 'M-005', title: 'Rehearsal Complete', date: 'Feb 25, 2026', status: 'upcoming', owner: 'Director', notes: 'Full table read + blocking sessions' },
  { id: 'M-006', title: 'Day 1 of Principal Photography', date: 'Mar 1, 2026', status: 'upcoming', owner: 'Producer', notes: 'First shoot day — INT. Office scenes' },
  { id: 'M-007', title: 'Wrap Day', date: 'Mar 18, 2026', status: 'upcoming', owner: 'Producer', notes: 'Final shoot day — EXT. Rooftop climax' },
  { id: 'M-008', title: 'Rough Cut Delivery', date: 'Apr 5, 2026', status: 'upcoming', owner: 'Editor', notes: 'First assembly for director review' },
  { id: 'M-009', title: 'Final Delivery', date: 'May 1, 2026', status: 'upcoming', owner: 'Post Supervisor', notes: 'DCP + deliverables package' },
];

const statusConfig = {
  'complete': { color: 'oklch(0.72 0.17 162)', icon: CheckCircle2, label: 'COMPLETE' },
  'in-progress': { color: 'oklch(0.82 0.15 85)', icon: Clock, label: 'IN PROGRESS' },
  'upcoming': { color: 'oklch(0.5 0.015 260)', icon: Target, label: 'UPCOMING' },
  'at-risk': { color: 'oklch(0.62 0.22 15)', icon: AlertCircle, label: 'AT RISK' },
};

export default function MilestonesView() {
  const completed = milestones.filter(m => m.status === 'complete').length;
  const inProgress = milestones.filter(m => m.status === 'in-progress').length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Milestones', value: milestones.length.toString(), accent: 'oklch(0.82 0.15 192)' },
          { label: 'Completed', value: completed.toString(), accent: 'oklch(0.72 0.17 162)' },
          { label: 'In Progress', value: inProgress.toString(), accent: 'oklch(0.82 0.15 85)' },
          { label: 'Upcoming', value: (milestones.length - completed - inProgress).toString(), accent: 'oklch(0.5 0.015 260)' },
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

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[28px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, oklch(0.72 0.17 162), oklch(0.82 0.15 192), oklch(0.5 0.015 260 / 30%))' }} />

        {milestones.map((milestone, i) => {
          const config = statusConfig[milestone.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              className="flex items-start gap-4 mb-4 relative"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className="w-[56px] h-[56px] rounded-xl flex items-center justify-center"
                  style={{
                    background: `${config.color}12`,
                    border: `1px solid ${config.color}30`,
                  }}
                >
                  <StatusIcon className="w-6 h-6" style={{ color: config.color }} strokeWidth={1.5} />
                </div>
              </div>

              {/* Card */}
              <GlassCard delay={0.3 + i * 0.06} className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: config.color }}>
                        {milestone.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold" style={{
                        background: `${config.color}15`,
                        color: config.color,
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-[0.5px] text-white mb-1" style={{ fontFamily: 'var(--font-grotesk)' }}>
                      {milestone.title}
                    </h3>
                    <p className="text-[12px]" style={{ color: 'oklch(0.6 0.015 260)' }}>
                      {milestone.notes}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-[12px] font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.7 0.015 260)' }}>
                      {milestone.date}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                      {milestone.owner}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
