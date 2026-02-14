/**
 * AURORA SANCTUM — Glass Card Component
 * Frosted glass panels with luminous borders and inner glow
 */
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: 'cyan' | 'violet' | 'emerald' | 'gold' | 'rose' | 'blue';
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

const accentClasses = {
  cyan: 'stat-accent-cyan',
  violet: 'stat-accent-violet',
  emerald: 'stat-accent-emerald',
  gold: 'stat-accent-gold',
  rose: 'stat-accent-rose',
  blue: 'stat-accent-blue',
};

export default function GlassCard({
  children,
  className,
  accent,
  delay = 0,
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'glass-card p-5',
        accent && accentClasses[accent],
        !hover && 'hover:transform-none hover:shadow-none',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
