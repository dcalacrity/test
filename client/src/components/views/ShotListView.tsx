/**
 * AURORA SANCTUM — Shot List View
 * Premium shot planning interface with visual shot type indicators
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Plus, Filter, Camera, Video, Clapperboard, Eye } from "lucide-react";

interface Shot {
  shotNum: string;
  scene: string;
  type: string;
  size: string;
  movement: string;
  description: string;
  lens: string;
  notes: string;
  status: 'planned' | 'shot' | 'review';
}

const shots: Shot[] = [
  { shotNum: '1A', scene: '1', type: 'Master', size: 'Wide', movement: 'Static', description: 'Establish office — Marcus at desk', lens: '24mm', notes: 'Practical lighting from window', status: 'shot' },
  { shotNum: '1B', scene: '1', type: 'Coverage', size: 'Medium', movement: 'Push In', description: 'Marcus discovers anomaly on screen', lens: '50mm', notes: 'Rack focus to monitor', status: 'shot' },
  { shotNum: '1C', scene: '1', type: 'Insert', size: 'Close-Up', movement: 'Static', description: 'Computer screen showing data', lens: '85mm', notes: 'VFX placeholder needed', status: 'review' },
  { shotNum: '3A', scene: '3', type: 'Master', size: 'Wide', movement: 'Crane', description: 'Rooftop establishing — city skyline', lens: '16mm', notes: 'Golden hour required', status: 'planned' },
  { shotNum: '3B', scene: '3', type: 'Coverage', size: 'Over-Shoulder', movement: 'Handheld', description: 'Elena confronts Marcus', lens: '35mm', notes: 'Steadicam backup', status: 'planned' },
  { shotNum: '3C', scene: '3', type: 'Coverage', size: 'Close-Up', movement: 'Static', description: 'Marcus reaction — emotional beat', lens: '85mm', notes: 'Shallow DOF', status: 'planned' },
  { shotNum: '5A', scene: '5', type: 'Master', size: 'Wide', movement: 'Dolly', description: 'Lab reveal — device center frame', lens: '24mm', notes: 'Atmospheric haze', status: 'planned' },
  { shotNum: '5B', scene: '5', type: 'Insert', size: 'Extreme CU', movement: 'Static', description: 'Device activation — button press', lens: '100mm Macro', notes: 'Practical LED effects', status: 'planned' },
];

const typeColors: Record<string, string> = {
  Master: 'oklch(0.82 0.15 192)',
  Coverage: 'oklch(0.62 0.24 295)',
  Insert: 'oklch(0.82 0.15 85)',
};

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  shot: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)', label: 'SHOT' },
  planned: { bg: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)', label: 'PLANNED' },
  review: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'REVIEW' },
};

export default function ShotListView() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Toolbar */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Plus className="w-3.5 h-3.5" />
              ADD SHOT
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Filter className="w-3.5 h-3.5" />
              BY SCENE
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              {shots.length} SHOTS TOTAL
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Shots', value: '8', color: 'oklch(0.82 0.15 192)', icon: Camera },
          { label: 'Completed', value: '2', color: 'oklch(0.72 0.17 162)', icon: Video },
          { label: 'In Review', value: '1', color: 'oklch(0.82 0.15 85)', icon: Eye },
          { label: 'Planned', value: '5', color: 'oklch(0.62 0.24 295)', icon: Clapperboard },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} delay={0.05 + i * 0.04} className="!p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                  {stat.label}
                </p>
                <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} strokeWidth={1.5} />
              </div>
              <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: stat.color }}>
                {stat.value}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Shot Cards */}
      <div className="grid grid-cols-2 gap-4">
        {shots.map((shot, i) => {
          const status = statusStyles[shot.status];
          const typeColor = typeColors[shot.type] || 'oklch(0.82 0.15 192)';

          return (
            <GlassCard key={shot.shotNum} delay={0.15 + i * 0.04}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[16px] font-bold"
                    style={{ fontFamily: 'var(--font-mono)', color: typeColor }}
                  >
                    {shot.shotNum}
                  </span>
                  <span className="text-[10px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: `${typeColor}15`,
                      color: typeColor,
                    }}>
                    {shot.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                    SC. {shot.scene}
                  </span>
                </div>
                <span className="text-[9px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                  style={{ fontFamily: 'var(--font-mono)', background: status.bg, color: status.color }}>
                  {status.label}
                </span>
              </div>

              <p className="text-[13px] text-[oklch(0.8_0.005_260)] mb-3">{shot.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[9px] tracking-[1px] mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>SIZE</p>
                  <p className="text-[11px] font-medium text-[oklch(0.7_0.015_260)]">{shot.size}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[1px] mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>MOVEMENT</p>
                  <p className="text-[11px] font-medium text-[oklch(0.7_0.015_260)]">{shot.movement}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[1px] mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>LENS</p>
                  <p className="text-[11px] font-medium text-[oklch(0.7_0.015_260)]">{shot.lens}</p>
                </div>
              </div>

              {shot.notes && (
                <div className="pt-2 border-t border-[oklch(1_0_0/6%)]">
                  <p className="text-[11px] text-[oklch(0.5_0.015_260)] italic">{shot.notes}</p>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
