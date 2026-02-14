/**
 * AURORA SANCTUM — Schedule View
 * Stripboard-style shooting schedule with drag-ready scene cards
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { GripVertical, Plus, Filter, Download, Clock, MapPin, Users } from "lucide-react";

interface SceneRow {
  sceneNum: string;
  description: string;
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK';
  pages: string;
  cast: string[];
  location: string;
  status: 'scheduled' | 'shot' | 'pending';
  shootDay?: number;
}

const scheduleData: SceneRow[] = [
  { sceneNum: '1', description: 'Office — Marcus discovers the anomaly', intExt: 'INT', dayNight: 'DAY', pages: '2 4/8', cast: ['Marcus', 'Elena'], location: 'Studio A', status: 'shot', shootDay: 1 },
  { sceneNum: '3', description: 'Rooftop — Elena confronts Marcus', intExt: 'EXT', dayNight: 'NIGHT', pages: '3 2/8', cast: ['Marcus', 'Elena', 'Agent K'], location: 'Rooftop Set', status: 'shot', shootDay: 1 },
  { sceneNum: '5', description: 'Lab — The device activates', intExt: 'INT', dayNight: 'DAY', pages: '4 6/8', cast: ['Marcus', 'Dr. Webb'], location: 'Lab Set', status: 'shot', shootDay: 2 },
  { sceneNum: '7', description: 'Street — Chase sequence begins', intExt: 'EXT', dayNight: 'DAY', pages: '1 4/8', cast: ['Marcus', 'Agent K'], location: 'Downtown', status: 'scheduled', shootDay: 3 },
  { sceneNum: '8', description: 'Alley — Marcus hides from pursuers', intExt: 'EXT', dayNight: 'NIGHT', pages: '2 1/8', cast: ['Marcus'], location: 'Back Lot', status: 'scheduled', shootDay: 3 },
  { sceneNum: '12', description: 'Warehouse — Final confrontation', intExt: 'INT', dayNight: 'NIGHT', pages: '5 3/8', cast: ['Marcus', 'Elena', 'Agent K', 'Dr. Webb'], location: 'Warehouse', status: 'pending' },
  { sceneNum: '14', description: 'Hospital — Elena recovers', intExt: 'INT', dayNight: 'DAY', pages: '1 7/8', cast: ['Elena', 'Dr. Webb'], location: 'Hospital Set', status: 'pending' },
  { sceneNum: '15', description: 'Park — Epilogue scene', intExt: 'EXT', dayNight: 'DAWN', pages: '2 0/8', cast: ['Marcus', 'Elena'], location: 'City Park', status: 'pending' },
];

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  shot: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)', label: 'SHOT' },
  scheduled: { bg: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)', label: 'SCHEDULED' },
  pending: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'PENDING' },
};

const dayNightColors: Record<string, string> = {
  DAY: 'oklch(0.82 0.15 85)',
  NIGHT: 'oklch(0.62 0.24 295)',
  DAWN: 'oklch(0.75 0.15 55)',
  DUSK: 'oklch(0.62 0.22 15)',
};

export default function ScheduleView() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Toolbar */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Plus className="w-3.5 h-3.5" />
              ADD SCENE
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Filter className="w-3.5 h-3.5" />
              FILTER
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Download className="w-3.5 h-3.5" />
              EXPORT
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.72 0.17 162)' }} />
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>2 Shot</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.82 0.15 192)' }} />
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>2 Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.82 0.15 85)' }} />
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>4 Pending</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Scenes', value: '8', color: 'oklch(0.82 0.15 192)' },
          { label: 'Total Pages', value: '23 2/8', color: 'oklch(0.62 0.24 295)' },
          { label: 'Shoot Days', value: '5', color: 'oklch(0.72 0.17 162)' },
          { label: 'Avg Pages/Day', value: '4.6', color: 'oklch(0.82 0.15 85)' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={0.05 + i * 0.04} className="!p-3">
            <p className="text-[9px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              {stat.label}
            </p>
            <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: stat.color }}>
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Stripboard Table */}
      <GlassCard delay={0.2} hover={false}>
        {/* Table Header */}
        <div className="grid gap-4 py-3 border-b border-[oklch(1_0_0/8%)]"
          style={{ gridTemplateColumns: '30px 60px 1fr 70px 60px 70px 120px 100px 90px' }}>
          {['', 'Scene', 'Description', 'I/E', 'D/N', 'Pages', 'Location', 'Cast', 'Status'].map(h => (
            <span key={h} className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Scene Rows */}
        {scheduleData.map((scene, i) => {
          const status = statusStyles[scene.status];
          return (
            <motion.div
              key={scene.sceneNum}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="grid gap-4 py-3 items-center border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors cursor-pointer group"
              style={{ gridTemplateColumns: '30px 60px 1fr 70px 60px 70px 120px 100px 90px' }}
            >
              <GripVertical className="w-4 h-4 text-[oklch(0.3_0.015_260)] group-hover:text-[oklch(0.5_0.015_260)] transition-colors" />
              <span className="text-[13px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 192)' }}>
                {scene.sceneNum}
              </span>
              <span className="text-[13px] text-[oklch(0.8_0.005_260)] truncate">
                {scene.description}
              </span>
              <span className="text-[10px] font-bold tracking-[1px] px-2 py-0.5 rounded text-center"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: scene.intExt === 'INT' ? 'oklch(0.62 0.18 255 / 15%)' : 'oklch(0.72 0.17 162 / 15%)',
                  color: scene.intExt === 'INT' ? 'oklch(0.62 0.18 255)' : 'oklch(0.72 0.17 162)',
                }}>
                {scene.intExt}
              </span>
              <span className="text-[10px] font-bold tracking-[1px]"
                style={{ fontFamily: 'var(--font-mono)', color: dayNightColors[scene.dayNight] }}>
                {scene.dayNight}
              </span>
              <span className="text-[12px] font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.7 0.015 260)' }}>
                {scene.pages}
              </span>
              <span className="text-[11px] flex items-center gap-1 text-[oklch(0.6_0.015_260)] truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {scene.location}
              </span>
              <span className="text-[11px] flex items-center gap-1 text-[oklch(0.6_0.015_260)]">
                <Users className="w-3 h-3 flex-shrink-0" />
                {scene.cast.length}
              </span>
              <span className="text-[9px] font-bold tracking-[1px] px-2 py-1 rounded text-center"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: status.bg,
                  color: status.color,
                }}>
                {status.label}
              </span>
            </motion.div>
          );
        })}
      </GlassCard>
    </div>
  );
}
