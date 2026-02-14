/**
 * AURORA SANCTUM — Tech & Gear View
 * Equipment inventory & tracking with status management
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Wrench, Camera, Lightbulb, Mic, Monitor, HardDrive, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const categories = [
  { id: 'camera', label: 'Camera', icon: Camera, color: 'oklch(0.82 0.15 192)' },
  { id: 'lighting', label: 'Lighting', icon: Lightbulb, color: 'oklch(0.82 0.15 85)' },
  { id: 'audio', label: 'Audio', icon: Mic, color: 'oklch(0.62 0.24 295)' },
  { id: 'monitors', label: 'Monitors', icon: Monitor, color: 'oklch(0.72 0.17 162)' },
  { id: 'storage', label: 'Storage', icon: HardDrive, color: 'oklch(0.62 0.18 255)' },
  { id: 'grip', label: 'Grip', icon: Wrench, color: 'oklch(0.62 0.22 15)' },
];

const equipment = [
  { name: 'ARRI ALEXA Mini LF', category: 'camera', status: 'confirmed', vendor: 'Panavision', rate: '$1,200/day', days: 12, total: '$14,400' },
  { name: 'Cooke S7/i Full Frame Primes (Set)', category: 'camera', status: 'confirmed', vendor: 'Panavision', rate: '$800/day', days: 12, total: '$9,600' },
  { name: 'Angénieux EZ-1 30-90mm', category: 'camera', status: 'confirmed', vendor: 'Panavision', rate: '$350/day', days: 8, total: '$2,800' },
  { name: 'ARRI SkyPanel S60-C (x4)', category: 'lighting', status: 'confirmed', vendor: 'MBS Lighting', rate: '$200/day', days: 12, total: '$2,400' },
  { name: 'Litepanels Astra 6X (x6)', category: 'lighting', status: 'confirmed', vendor: 'MBS Lighting', rate: '$120/day', days: 12, total: '$1,440' },
  { name: 'ARRI M18 HMI (x2)', category: 'lighting', status: 'pending', vendor: 'MBS Lighting', rate: '$180/day', days: 5, total: '$900' },
  { name: 'Sound Devices Scorpio', category: 'audio', status: 'confirmed', vendor: 'Pro Audio LA', rate: '$250/day', days: 12, total: '$3,000' },
  { name: 'Sennheiser MKH 416 (x3)', category: 'audio', status: 'confirmed', vendor: 'Pro Audio LA', rate: '$45/day', days: 12, total: '$540' },
  { name: 'Lectrosonics DSQD (x4)', category: 'audio', status: 'pending', vendor: 'Pro Audio LA', rate: '$100/day', days: 12, total: '$1,200' },
  { name: 'SmallHD Cine 13 (x2)', category: 'monitors', status: 'confirmed', vendor: 'Panavision', rate: '$150/day', days: 12, total: '$1,800' },
  { name: 'Teradek Bolt 4K (x3)', category: 'monitors', status: 'confirmed', vendor: 'Panavision', rate: '$200/day', days: 12, total: '$2,400' },
  { name: 'Codex Compact Drive (x8)', category: 'storage', status: 'confirmed', vendor: 'Panavision', rate: '$50/day', days: 12, total: '$600' },
  { name: 'OWC ThunderBay 4 RAID', category: 'storage', status: 'confirmed', vendor: 'Own', rate: 'N/A', days: 12, total: '$0' },
  { name: 'Dana Dolly + Track (24ft)', category: 'grip', status: 'confirmed', vendor: 'Grip Trix', rate: '$175/day', days: 10, total: '$1,750' },
  { name: 'Steadicam Volt', category: 'grip', status: 'pending', vendor: 'Grip Trix', rate: '$400/day', days: 6, total: '$2,400' },
];

const statusConfig = {
  confirmed: { color: 'oklch(0.72 0.17 162)', icon: CheckCircle2, label: 'CONFIRMED' },
  pending: { color: 'oklch(0.82 0.15 85)', icon: Clock, label: 'PENDING' },
  issue: { color: 'oklch(0.62 0.22 15)', icon: AlertTriangle, label: 'ISSUE' },
};

export default function TechGearView() {
  const totalCost = equipment.reduce((acc, e) => acc + parseInt(e.total.replace(/[$,]/g, '') || '0'), 0);
  const confirmed = equipment.filter(e => e.status === 'confirmed').length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: equipment.length.toString(), accent: 'oklch(0.82 0.15 192)' },
          { label: 'Confirmed', value: confirmed.toString(), accent: 'oklch(0.72 0.17 162)' },
          { label: 'Pending', value: (equipment.length - confirmed).toString(), accent: 'oklch(0.82 0.15 85)' },
          { label: 'Total Cost', value: `$${totalCost.toLocaleString()}`, accent: 'oklch(0.62 0.24 295)' },
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

      {/* Equipment by Category */}
      {categories.map((cat, ci) => {
        const items = equipment.filter(e => e.category === cat.id);
        if (items.length === 0) return null;
        const CatIcon = cat.icon;

        return (
          <GlassCard key={cat.id} delay={0.3 + ci * 0.08}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}>
                <CatIcon className="w-4 h-4" style={{ color: cat.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                {cat.label}
              </h3>
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                {items.length} ITEMS
              </span>
            </div>

            {/* Table */}
            <div className="grid grid-cols-[1fr_100px_120px_80px_60px_80px_80px] gap-2 py-2 border-b border-[oklch(1_0_0/8%)]">
              {['Equipment', 'Status', 'Vendor', 'Rate', 'Days', 'Total', ''].map(h => (
                <span key={h} className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                  {h}
                </span>
              ))}
            </div>
            {items.map((item, ii) => {
              const sc = statusConfig[item.status as keyof typeof statusConfig];
              return (
                <motion.div
                  key={ii}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + ci * 0.08 + ii * 0.04 }}
                  className="grid grid-cols-[1fr_100px_120px_80px_60px_80px_80px] gap-2 py-2.5 border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors items-center"
                >
                  <span className="text-[12px] text-white">{item.name}</span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold text-center" style={{
                    background: `${sc.color}15`,
                    color: sc.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {sc.label}
                  </span>
                  <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>{item.vendor}</span>
                  <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.7 0.015 260)' }}>{item.rate}</span>
                  <span className="text-[11px] text-center" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>{item.days}</span>
                  <span className="text-[11px] font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 85)' }}>{item.total}</span>
                </motion.div>
              );
            })}
          </GlassCard>
        );
      })}
    </div>
  );
}
