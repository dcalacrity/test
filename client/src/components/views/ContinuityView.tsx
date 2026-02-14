/**
 * AURORA SANCTUM — Continuity View
 * Scene continuity notes & references with visual tracking
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Film, Eye, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const continuityNotes = [
  {
    scene: 'SC-1', title: 'INT. OFFICE — DAY',
    items: [
      { type: 'wardrobe', note: 'Marcus: Navy suit, red tie, silver watch on left wrist', status: 'verified' },
      { type: 'props', note: 'Coffee mug — left side of desk, half full', status: 'verified' },
      { type: 'hair', note: 'Elena: Hair down, parted left, no accessories', status: 'verified' },
      { type: 'set', note: 'Computer screen showing data dashboard (VFX plate)', status: 'pending' },
    ],
  },
  {
    scene: 'SC-2', title: 'EXT. ROOFTOP — NIGHT',
    items: [
      { type: 'wardrobe', note: 'Marcus: Black tactical jacket, dark pants, boots', status: 'verified' },
      { type: 'wardrobe', note: 'Agent K: Charcoal suit, no tie, earpiece right ear', status: 'verified' },
      { type: 'weather', note: 'Wet ground — rain machines needed for continuity', status: 'flagged' },
      { type: 'lighting', note: 'Moonlight from camera right, city lights background', status: 'verified' },
      { type: 'props', note: 'Briefcase — Agent K carries in right hand', status: 'pending' },
    ],
  },
  {
    scene: 'SC-3', title: 'INT. LABORATORY — DAY',
    items: [
      { type: 'wardrobe', note: 'Elena: White lab coat over blue blouse, ID badge left pocket', status: 'verified' },
      { type: 'props', note: 'Holographic device — center of table, blue glow', status: 'pending' },
      { type: 'set', note: 'Lab monitors showing DNA sequences (practical screens)', status: 'verified' },
      { type: 'hair', note: 'Dr. Webb: Glasses on, hair tied back', status: 'verified' },
    ],
  },
  {
    scene: 'SC-4', title: 'EXT. WAREHOUSE — NIGHT',
    items: [
      { type: 'wardrobe', note: 'All cast: Tactical gear — matching from SC-2 for Marcus', status: 'flagged' },
      { type: 'props', note: 'Cargo van — dented front bumper, license plate visible', status: 'pending' },
      { type: 'sfx', note: 'Smoke level — medium density, ground-hugging', status: 'pending' },
      { type: 'set', note: 'Warehouse door — partially open, interior light spill', status: 'verified' },
      { type: 'blood', note: 'Guard #1 — blood on right temple after stunt', status: 'pending' },
    ],
  },
  {
    scene: 'SC-5', title: 'INT. SAFE HOUSE — DAWN',
    items: [
      { type: 'wardrobe', note: 'Marcus: Gray t-shirt, bandage on left forearm from SC-4', status: 'flagged' },
      { type: 'lighting', note: 'Golden hour light through east-facing window', status: 'verified' },
      { type: 'props', note: 'Two coffee cups on counter, newspaper on table', status: 'pending' },
    ],
  },
];

const statusColors = {
  verified: { bg: 'oklch(0.72 0.17 162 / 12%)', color: 'oklch(0.72 0.17 162)', icon: CheckCircle2 },
  pending: { bg: 'oklch(0.82 0.15 85 / 12%)', color: 'oklch(0.82 0.15 85)', icon: Clock },
  flagged: { bg: 'oklch(0.62 0.22 15 / 12%)', color: 'oklch(0.62 0.22 15)', icon: AlertTriangle },
};

const typeColors: Record<string, string> = {
  wardrobe: 'oklch(0.62 0.24 295)',
  props: 'oklch(0.82 0.15 192)',
  hair: 'oklch(0.82 0.15 85)',
  set: 'oklch(0.72 0.17 162)',
  weather: 'oklch(0.62 0.18 255)',
  lighting: 'oklch(0.82 0.15 85)',
  sfx: 'oklch(0.62 0.22 15)',
  blood: 'oklch(0.62 0.22 15)',
};

export default function ContinuityView() {
  const totalItems = continuityNotes.reduce((acc, s) => acc + s.items.length, 0);
  const verified = continuityNotes.reduce((acc, s) => acc + s.items.filter(i => i.status === 'verified').length, 0);
  const flagged = continuityNotes.reduce((acc, s) => acc + s.items.filter(i => i.status === 'flagged').length, 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Notes', value: totalItems.toString(), accent: 'oklch(0.82 0.15 192)' },
          { label: 'Verified', value: verified.toString(), accent: 'oklch(0.72 0.17 162)' },
          { label: 'Pending', value: (totalItems - verified - flagged).toString(), accent: 'oklch(0.82 0.15 85)' },
          { label: 'Flagged', value: flagged.toString(), accent: 'oklch(0.62 0.22 15)' },
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

      {/* Scene Cards */}
      {continuityNotes.map((scene, si) => (
        <GlassCard key={scene.scene} delay={0.3 + si * 0.08}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5" style={{ color: 'oklch(0.82 0.15 192)' }} strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 192)' }}>
                {scene.scene}
              </span>
              <h3 className="text-[15px] font-semibold tracking-[0.5px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                {scene.title}
              </h3>
            </div>
            <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              {scene.items.length} ITEMS
            </span>
          </div>

          <div className="space-y-2">
            {scene.items.map((item, ii) => {
              const sc = statusColors[item.status as keyof typeof statusColors];
              const StatusIcon = sc.icon;
              const tc = typeColors[item.type] || 'oklch(0.5 0.015 260)';

              return (
                <motion.div
                  key={ii}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + si * 0.08 + ii * 0.04 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[oklch(1_0_0/3%)] transition-colors border-l-2"
                  style={{ borderLeftColor: tc }}
                >
                  <StatusIcon className="w-4 h-4 flex-shrink-0" style={{ color: sc.color }} strokeWidth={1.5} />
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase flex-shrink-0 min-w-[70px] text-center" style={{
                    background: `${tc}12`,
                    color: tc,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {item.type}
                  </span>
                  <span className="text-[12px] flex-1" style={{ color: 'oklch(0.75 0.01 260)' }}>
                    {item.note}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase flex-shrink-0" style={{
                    background: sc.bg,
                    color: sc.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {item.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
