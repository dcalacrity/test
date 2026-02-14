/**
 * AURORA SANCTUM — Placeholder View
 * Premium "coming soon" placeholder with animated glass cards
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  Target, Phone, Brain, StickyNote, Upload,
  Rocket, Sparkles, Zap,
  type LucideIcon,
} from "lucide-react";

const viewConfig: Record<string, { title: string; icon: LucideIcon; description: string; accent: string; features: string[] }> = {
  'prod-pipeline': {
    title: 'Production Pipeline',
    icon: Target,
    description: 'Production deal flow & tracking',
    accent: 'oklch(0.82 0.15 192)',
    features: ['Deal stage tracking', 'Automated follow-ups', 'Revenue forecasting', 'Pipeline analytics'],
  },
  'prod-dialer': {
    title: 'Production Dialer',
    icon: Phone,
    description: 'Call management & outreach tracking',
    accent: 'oklch(0.62 0.24 295)',
    features: ['Click-to-call', 'Call recording', 'Contact scoring', 'Activity timeline'],
  },
  'prod-intel': {
    title: 'Production Intel',
    icon: Brain,
    description: 'Market intelligence & research',
    accent: 'oklch(0.82 0.15 85)',
    features: ['Market trends', 'Competitor analysis', 'Talent insights', 'Industry reports'],
  },
  'biz-pipeline': {
    title: 'Business Pipeline',
    icon: Target,
    description: 'Business development deal flow',
    accent: 'oklch(0.82 0.15 85)',
    features: ['Opportunity tracking', 'Revenue pipeline', 'Win/loss analysis', 'Forecast modeling'],
  },
  'biz-dialer': {
    title: 'Business Dialer',
    icon: Phone,
    description: 'Business call management',
    accent: 'oklch(0.72 0.17 162)',
    features: ['Power dialer', 'Voicemail drop', 'Call analytics', 'CRM integration'],
  },
  'biz-intel': {
    title: 'Business Intel',
    icon: Brain,
    description: 'Business intelligence & analytics',
    accent: 'oklch(0.62 0.18 255)',
    features: ['Revenue analytics', 'Client insights', 'Market positioning', 'Growth metrics'],
  },
  'script-import': {
    title: 'Script Import',
    icon: Upload,
    description: 'Import & parse screenplay files',
    accent: 'oklch(0.82 0.15 192)',
    features: ['PDF parsing', 'FDX import', 'Auto-breakdown', 'Scene detection'],
  },
  'notes': {
    title: 'Production Notes',
    icon: StickyNote,
    description: 'Collaborative production notes',
    accent: 'oklch(0.62 0.24 295)',
    features: ['Real-time collaboration', 'Rich text editor', 'File attachments', 'Version history'],
  },
};

interface PlaceholderViewProps {
  viewId: string;
}

export default function PlaceholderView({ viewId }: PlaceholderViewProps) {
  const config = viewConfig[viewId] || {
    title: viewId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: Sparkles,
    description: 'Module content',
    accent: 'oklch(0.82 0.15 192)',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  };

  const Icon = config.icon;

  return (
    <div className="p-6 flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[600px] w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{
            background: `${config.accent}12`,
            border: `1px solid ${config.accent}25`,
            boxShadow: `0 0 40px ${config.accent}15`,
          }}
        >
          <Icon className="w-10 h-10" style={{ color: config.accent }} strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h2
          className="text-[32px] tracking-[3px] text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.title}
        </h2>
        <p className="text-[13px] tracking-[1px] mb-8" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
          {config.description}
        </p>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
          style={{
            background: `${config.accent}10`,
            border: `1px solid ${config.accent}25`,
          }}
        >
          <Rocket className="w-4 h-4" style={{ color: config.accent }} strokeWidth={1.5} />
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: config.accent }}>
            Coming Soon
          </span>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3">
          {config.features.map((feature, i) => (
            <GlassCard key={feature} delay={0.4 + i * 0.08}>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: config.accent }} strokeWidth={1.5} />
                <span className="text-[12px] text-left" style={{ color: 'oklch(0.7 0.015 260)' }}>
                  {feature}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
