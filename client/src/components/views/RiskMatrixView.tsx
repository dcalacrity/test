/**
 * AURORA SANCTUM — Risk Matrix View
 * Visual risk assessment with impact/probability grid
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, Plus, TrendingUp } from "lucide-react";

interface RiskItem {
  id: string;
  title: string;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  status: 'active' | 'mitigated' | 'monitoring';
  mitigation: string;
  owner: string;
}

const risks: RiskItem[] = [
  { id: 'R-001', title: 'Weather Delay', description: 'Outdoor scenes may be delayed due to inclement weather', probability: 'High', impact: 'High', status: 'active', mitigation: 'Cover set prepared, flexible schedule', owner: 'Production Manager' },
  { id: 'R-002', title: 'Equipment Failure', description: 'Primary camera system malfunction during shoot', probability: 'Low', impact: 'High', status: 'monitoring', mitigation: 'Backup camera on standby, rental insurance', owner: 'DP' },
  { id: 'R-003', title: 'Talent Scheduling', description: 'Lead actor availability conflict with reshoots', probability: 'Medium', impact: 'High', status: 'active', mitigation: 'Pre-negotiated hold dates, schedule flexibility', owner: 'Line Producer' },
  { id: 'R-004', title: 'Budget Overrun', description: 'Post-production costs exceeding estimates', probability: 'Medium', impact: 'Medium', status: 'monitoring', mitigation: 'Contingency fund allocated, phased delivery', owner: 'Producer' },
  { id: 'R-005', title: 'Location Access', description: 'Permit delays for warehouse location', probability: 'Low', impact: 'Medium', status: 'mitigated', mitigation: 'Backup location secured, permits filed early', owner: 'Location Manager' },
];

const probColors: Record<string, string> = {
  Low: 'oklch(0.72 0.17 162)',
  Medium: 'oklch(0.82 0.15 85)',
  High: 'oklch(0.62 0.22 15)',
};

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: 'oklch(0.62 0.22 15 / 15%)', color: 'oklch(0.62 0.22 15)', label: 'ACTIVE' },
  monitoring: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'MONITORING' },
  mitigated: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)', label: 'MITIGATED' },
};

export default function RiskMatrixView() {
  const activeRisks = risks.filter(r => r.status === 'active').length;
  const highRisks = risks.filter(r => r.probability === 'High' || r.impact === 'High').length;

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Toolbar */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Plus className="w-3.5 h-3.5" />
              ADD RISK
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'oklch(0.62 0.22 15)' }} />
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.62 0.22 15)' }}>
                {activeRisks} Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" style={{ color: 'oklch(0.72 0.17 162)' }} />
              <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.72 0.17 162)' }}>
                {risks.filter(r => r.status === 'mitigated').length} Mitigated
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Risks', value: risks.length.toString(), color: 'oklch(0.82 0.15 192)' },
          { label: 'Active', value: activeRisks.toString(), color: 'oklch(0.62 0.22 15)' },
          { label: 'High Severity', value: highRisks.toString(), color: 'oklch(0.82 0.15 85)' },
          { label: 'Mitigated', value: risks.filter(r => r.status === 'mitigated').length.toString(), color: 'oklch(0.72 0.17 162)' },
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

      {/* Risk Cards */}
      <div className="space-y-3">
        {risks.map((risk, i) => {
          const status = statusStyles[risk.status];
          return (
            <GlassCard key={risk.id} delay={0.15 + i * 0.05}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 192)' }}>
                    {risk.id}
                  </span>
                  <h4 className="text-[15px] font-semibold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                    {risk.title}
                  </h4>
                </div>
                <span className="text-[9px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                  style={{ fontFamily: 'var(--font-mono)', background: status.bg, color: status.color }}>
                  {status.label}
                </span>
              </div>

              <p className="text-[13px] text-[oklch(0.7_0.015_260)] mb-3">{risk.description}</p>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-[9px] tracking-[1px] mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>PROBABILITY</p>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{
                    fontFamily: 'var(--font-mono)',
                    background: `${probColors[risk.probability]}15`,
                    color: probColors[risk.probability],
                  }}>
                    {risk.probability}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] tracking-[1px] mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>IMPACT</p>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{
                    fontFamily: 'var(--font-mono)',
                    background: `${probColors[risk.impact]}15`,
                    color: probColors[risk.impact],
                  }}>
                    {risk.impact}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] tracking-[1px] mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>OWNER</p>
                  <span className="text-[11px] text-[oklch(0.7_0.015_260)]">{risk.owner}</span>
                </div>
                <div>
                  <p className="text-[9px] tracking-[1px] mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>MITIGATION</p>
                  <span className="text-[11px] text-[oklch(0.6_0.015_260)]">{risk.mitigation}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
