/**
 * AURORA SANCTUM — Pipeline View (CRM Kanban)
 * Drag-ready kanban board with deal stages and contact cards
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  Plus, Filter, Download, User, Phone, Mail, DollarSign,
  ArrowRight, Clock, Star, MoreHorizontal,
} from "lucide-react";

interface Deal {
  id: string;
  name: string;
  company: string;
  value: string;
  phone: string;
  email: string;
  daysInStage: number;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

interface Stage {
  id: string;
  label: string;
  color: string;
  deals: Deal[];
}

interface PipelineViewProps {
  variant: 'production' | 'business';
}

const prodStages: Stage[] = [
  {
    id: 'new', label: 'New Contacts', color: 'oklch(0.82 0.15 192)',
    deals: [
      { id: 'p1', name: 'Sarah Chen', company: 'Talent Agency X', value: '$5,000', phone: '(310) 555-0142', email: 'sarah@agencyx.com', daysInStage: 2, priority: 'high' },
      { id: 'p2', name: 'Mike Torres', company: 'Grip & Electric Co', value: '$3,200', phone: '(818) 555-0198', email: 'mike@gripco.com', daysInStage: 1, priority: 'medium' },
    ],
  },
  {
    id: 'contacted', label: 'Contacted', color: 'oklch(0.62 0.24 295)',
    deals: [
      { id: 'p3', name: 'Lisa Park', company: 'Catering Solutions', value: '$2,800', phone: '(323) 555-0177', email: 'lisa@catering.com', daysInStage: 5, priority: 'medium' },
    ],
  },
  {
    id: 'negotiating', label: 'Negotiating', color: 'oklch(0.82 0.15 85)',
    deals: [
      { id: 'p4', name: 'James Wright', company: 'Location Scout Pro', value: '$8,500', phone: '(424) 555-0133', email: 'james@locscout.com', daysInStage: 8, priority: 'high', notes: 'Waiting on location permits' },
      { id: 'p5', name: 'Anna Kim', company: 'Wardrobe Dept', value: '$4,200', phone: '(213) 555-0166', email: 'anna@wardrobe.com', daysInStage: 3, priority: 'low' },
    ],
  },
  {
    id: 'committed', label: 'Committed', color: 'oklch(0.72 0.17 162)',
    deals: [
      { id: 'p6', name: 'David Reyes', company: 'Sound Design Studio', value: '$6,000', phone: '(310) 555-0211', email: 'david@soundstudio.com', daysInStage: 12, priority: 'high' },
    ],
  },
  {
    id: 'closed', label: 'Closed', color: 'oklch(0.72 0.17 162)',
    deals: [
      { id: 'p7', name: 'Rachel Nguyen', company: 'Camera Rentals LA', value: '$12,000', phone: '(818) 555-0244', email: 'rachel@camrent.com', daysInStage: 20, priority: 'high' },
    ],
  },
];

const bizStages: Stage[] = [
  {
    id: 'new', label: 'New Leads', color: 'oklch(0.82 0.15 85)',
    deals: [
      { id: 'b1', name: 'TechVision Corp', company: 'Corporate Video', value: '$25,000', phone: '(415) 555-0301', email: 'info@techvision.com', daysInStage: 3, priority: 'high' },
      { id: 'b2', name: 'Bloom Agency', company: 'Commercial', value: '$18,000', phone: '(212) 555-0422', email: 'projects@bloom.co', daysInStage: 1, priority: 'medium' },
    ],
  },
  {
    id: 'contacted', label: 'Contacted', color: 'oklch(0.62 0.24 295)',
    deals: [
      { id: 'b3', name: 'Metro Real Estate', company: 'VR Tour', value: '$12,000', phone: '(305) 555-0188', email: 'media@metrore.com', daysInStage: 7, priority: 'medium' },
      { id: 'b4', name: 'FitLife Brand', company: 'Social Content', value: '$8,500', phone: '(646) 555-0277', email: 'marketing@fitlife.com', daysInStage: 4, priority: 'low' },
    ],
  },
  {
    id: 'pitched', label: 'Pitched', color: 'oklch(0.82 0.15 192)',
    deals: [
      { id: 'b5', name: 'Nexus Gaming', company: 'Cinematic Trailer', value: '$45,000', phone: '(310) 555-0399', email: 'creative@nexus.gg', daysInStage: 10, priority: 'high', notes: 'Proposal sent, follow up Friday' },
    ],
  },
  {
    id: 'negotiating', label: 'Negotiating', color: 'oklch(0.82 0.15 85)',
    deals: [
      { id: 'b6', name: 'Stellar Hotels', company: 'Brand Film', value: '$60,000', phone: '(702) 555-0155', email: 'brand@stellar.com', daysInStage: 15, priority: 'high' },
    ],
  },
  {
    id: 'closed', label: 'Closed Won', color: 'oklch(0.72 0.17 162)',
    deals: [
      { id: 'b7', name: 'Artisan Coffee', company: 'Commercial', value: '$15,000', phone: '(503) 555-0133', email: 'hello@artisancoffee.com', daysInStage: 30, priority: 'medium' },
      { id: 'b8', name: 'Zenith Auto', company: 'Product Launch', value: '$35,000', phone: '(248) 555-0199', email: 'media@zenithauto.com', daysInStage: 22, priority: 'high' },
    ],
  },
];

const priorityStyles = {
  high: { bg: 'oklch(0.62 0.22 15 / 15%)', color: 'oklch(0.62 0.22 15)', label: 'HIGH' },
  medium: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'MED' },
  low: { bg: 'oklch(0.62 0.18 255 / 15%)', color: 'oklch(0.62 0.18 255)', label: 'LOW' },
};

export default function PipelineView({ variant }: PipelineViewProps) {
  const stages = variant === 'production' ? prodStages : bizStages;
  const accentColor = variant === 'production' ? 'oklch(0.82 0.15 192)' : 'oklch(0.82 0.15 85)';
  const tagLabel = variant === 'production' ? 'PRODUCTION CRM' : 'BUSINESS CRM';
  const subtitle = variant === 'production' ? 'Talent, Vendors, Sponsors, Investors' : 'Cinema, VR, General Video, Cyber';
  const totalValue = stages.reduce((sum, s) => sum + s.deals.reduce((ds, d) => ds + parseInt(d.value.replace(/[$,]/g, '')), 0), 0);
  const totalDeals = stages.reduce((sum, s) => sum + s.deals.length, 0);

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
              {subtitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Filter className="w-3.5 h-3.5" /> FILTER
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px]"
              style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
              <Plus className="w-3.5 h-3.5" /> ADD CONTACT
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Pipeline', value: `$${totalValue.toLocaleString()}`, color: accentColor },
          { label: 'Active Deals', value: String(totalDeals), color: 'oklch(0.62 0.24 295)' },
          { label: 'Avg Deal Size', value: `$${Math.round(totalValue / totalDeals).toLocaleString()}`, color: 'oklch(0.72 0.17 162)' },
          { label: 'Close Rate', value: variant === 'production' ? '68%' : '42%', color: 'oklch(0.82 0.15 85)' },
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

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: '400px' }}>
        {stages.map((stage, si) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + si * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-[260px] flex flex-col"
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: stage.color, boxShadow: `0 0 8px ${stage.color}60` }} />
                <span className="text-[11px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: stage.color }}>
                  {stage.label}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ fontFamily: 'var(--font-mono)', background: `${stage.color}15`, color: stage.color }}>
                {stage.deals.length}
              </span>
            </div>

            {/* Deal Cards */}
            <div className="space-y-2 flex-1">
              {stage.deals.map((deal, di) => {
                const prio = priorityStyles[deal.priority];
                return (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + si * 0.06 + di * 0.04 }}
                    className="glass-card p-3 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                          style={{ background: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}25` }}>
                          {deal.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-white leading-tight">{deal.name}</p>
                          <p className="text-[10px]" style={{ color: 'oklch(0.5 0.015 260)' }}>{deal.company}</p>
                        </div>
                      </div>
                      <MoreHorizontal className="w-3.5 h-3.5 text-[oklch(0.3_0.015_260)] group-hover:text-[oklch(0.6_0.015_260)] transition-colors" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[14px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.72 0.17 162)' }}>
                        {deal.value}
                      </span>
                      <span className="text-[8px] font-bold tracking-[1px] px-1.5 py-0.5 rounded"
                        style={{ fontFamily: 'var(--font-mono)', background: prio.bg, color: prio.color }}>
                        {prio.label}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3" style={{ color: 'oklch(0.45 0.015 260)' }} />
                        <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>{deal.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3" style={{ color: 'oklch(0.45 0.015 260)' }} />
                        <span className="text-[10px] truncate" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>{deal.email}</span>
                      </div>
                    </div>

                    {deal.notes && (
                      <p className="text-[10px] mt-2 px-2 py-1 rounded" style={{ background: 'oklch(0.82 0.15 85 / 8%)', color: 'oklch(0.65 0.1 85)', fontStyle: 'italic' }}>
                        {deal.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[oklch(1_0_0/5%)]">
                      <Clock className="w-3 h-3" style={{ color: 'oklch(0.4 0.015 260)' }} />
                      <span className="text-[9px] tracking-[0.5px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                        {deal.daysInStage}d in stage
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Add card button */}
              <button className="w-full py-3 rounded-xl border border-dashed border-[oklch(1_0_0/8%)] text-[10px] font-semibold tracking-[1px] text-[oklch(0.4_0.015_260)] hover:border-[oklch(1_0_0/15%)] hover:text-[oklch(0.6_0.015_260)] hover:bg-[oklch(1_0_0/2%)] transition-all"
                style={{ fontFamily: 'var(--font-mono)' }}>
                <Plus className="w-3.5 h-3.5 inline mr-1" /> ADD
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
