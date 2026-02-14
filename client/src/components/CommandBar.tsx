/**
 * AURORA SANCTUM — Command Bar
 * Top status bar with mode indicators and system status
 */
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

interface CommandBarProps {
  title: string;
  mode?: 'demo' | 'cloud';
  onLogout?: () => void;
}

export default function CommandBar({ title, mode = 'demo', onLogout }: CommandBarProps) {
  const modeColor = mode === 'demo' ? 'oklch(0.75 0.15 55)' : 'oklch(0.72 0.17 162)';
  const modeLabel = mode === 'demo' ? 'DEMO MODE' : 'CLOUD SYNC';

  return (
    <>
      {/* Top Mode Banner */}
      <div
        className="h-9 flex items-center justify-between px-6 border-b"
        style={{
          background: `linear-gradient(90deg, ${mode === 'demo' ? 'oklch(0.75 0.15 55 / 6%)' : 'oklch(0.72 0.17 162 / 6%)'}, oklch(0.05 0.015 260 / 80%))`,
          borderBottomColor: `${modeColor}`,
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '2px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-5">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold"
            style={{
              background: `${modeColor}15`,
              color: modeColor,
              border: `1px solid ${modeColor}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: modeColor,
                animation: 'pulseGlow 2s ease-in-out infinite',
              }}
            />
            {modeLabel}
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-semibold"
            style={{
              background: 'oklch(0.82 0.15 192 / 10%)',
              color: 'oklch(0.82 0.15 192)',
              border: '1px solid oklch(0.82 0.15 192 / 20%)',
            }}
          >
            PRODUCTION VIEW
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold tracking-[1.5px]"
            style={{
              background: 'oklch(0.72 0.17 162 / 10%)',
              color: 'oklch(0.72 0.17 162)',
              border: '1px solid oklch(0.72 0.17 162 / 20%)',
            }}
          >
            ON BUDGET
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-semibold tracking-[1px] transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: 'oklch(0.62 0.22 15 / 10%)',
              color: 'oklch(0.62 0.22 15)',
              border: '1px solid oklch(0.62 0.22 15 / 20%)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <LogOut className="w-3 h-3" />
            LOGOUT
          </button>
        </div>
      </div>

      {/* Page Title Bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: 'oklch(0.06 0.015 260 / 60%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.h1
          key={title}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] tracking-[4px] text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </motion.h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: 'oklch(0.72 0.17 162)',
                boxShadow: '0 0 8px oklch(0.72 0.17 162 / 60%)',
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[1px]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'oklch(0.6 0.015 260)',
              }}
            >
              SYNCED
            </span>
          </div>
          <span
            className="text-[11px] px-3 py-1 rounded-lg"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'oklch(0.6 0.015 260)',
              background: 'oklch(0.15 0.015 260 / 40%)',
              border: '1px solid oklch(1 0 0 / 6%)',
            }}
          >
            user@demo.com
          </span>
        </div>
      </div>
    </>
  );
}
