/**
 * AURORA SANCTUM — Sidebar Navigation
 * Monolithic glass panel with luminous navigation items
 */
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  ListOrdered,
  Layers,
  Camera,
  Film,
  Users,
  CalendarDays,
  Wrench,
  Archive,
  BarChart3,
  Target,
  AlertTriangle,
  DollarSign,
  FileText,
  Contact,
  Phone,
  Brain,
  StickyNote,
  Upload,
  Download,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  title: string;
  variant?: 'standard' | 'business' | 'tools';
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    title: 'Command',
    variant: 'standard',
    defaultOpen: true,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'schedule', label: 'Schedule', icon: ListOrdered },
      { id: 'breakdown', label: 'Breakdown', icon: Layers },
      { id: 'shotlist', label: 'Shot List', icon: Camera },
      { id: 'continuity', label: 'Continuity', icon: Film },
      { id: 'cast-crew', label: 'Cast & Crew', icon: Users },
      { id: 'days', label: 'Shoot Days', icon: CalendarDays },
      { id: 'tech', label: 'Tech & Gear', icon: Wrench },
      { id: 'vault', label: 'Vault', icon: Archive },
    ],
  },
  {
    title: 'Planning',
    variant: 'standard',
    defaultOpen: true,
    items: [
      { id: 'gantt', label: 'Gantt Chart', icon: BarChart3 },
      { id: 'milestones', label: 'Milestones', icon: Target },
      { id: 'risk', label: 'Risk Matrix', icon: AlertTriangle },
    ],
  },
  {
    title: 'Finance',
    variant: 'standard',
    defaultOpen: true,
    items: [
      { id: 'financials', label: 'Financials', icon: DollarSign },
    ],
  },
  {
    title: 'Resources',
    variant: 'standard',
    defaultOpen: true,
    items: [
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'contacts', label: 'Contacts', icon: Contact },
    ],
  },
  {
    title: 'Production CRM',
    variant: 'standard',
    defaultOpen: false,
    items: [
      { id: 'prod-pipeline', label: 'Pipeline', icon: Target },
      { id: 'prod-dialer', label: 'Dialer', icon: Phone },
      { id: 'prod-intel', label: 'Intel', icon: Brain },
    ],
  },
  {
    title: 'Business CRM',
    variant: 'business',
    defaultOpen: false,
    items: [
      { id: 'biz-pipeline', label: 'Pipeline', icon: Target },
      { id: 'biz-dialer', label: 'Dialer', icon: Phone },
      { id: 'biz-intel', label: 'Intel', icon: Brain },
    ],
  },
  {
    title: 'Tools',
    variant: 'tools',
    defaultOpen: false,
    items: [
      { id: 'script-import', label: 'Script Import', icon: Upload },
      { id: 'notes', label: 'Production Notes', icon: StickyNote },
    ],
  },
];

interface SidebarProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
}

function NavSectionGroup({
  section,
  activeView,
  onNavigate,
  sectionIndex,
}: {
  section: NavSection;
  activeView: string;
  onNavigate: (viewId: string) => void;
  sectionIndex: number;
}) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);

  const titleColor =
    section.variant === 'business'
      ? 'text-neon-gold'
      : 'text-neon-cyan';

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-5 py-2",
          "text-[10px] font-bold tracking-[2.5px] uppercase transition-all duration-300",
          titleColor,
          "hover:opacity-100 opacity-70"
        )}
      >
        <span>{section.title}</span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3 opacity-50" />
        ) : (
          <ChevronRight className="w-3 h-3 opacity-50" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isBusiness = section.variant === 'business';

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: itemIndex * 0.03,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-2.5 relative transition-all duration-300",
                    "text-[13px] font-medium tracking-wide",
                    "border-l-2 border-transparent",
                    isActive && !isBusiness && "text-neon-cyan bg-[oklch(0.82_0.15_192/8%)] border-l-neon-cyan",
                    isActive && isBusiness && "text-neon-gold bg-[oklch(0.82_0.15_85/8%)] border-l-neon-gold",
                    !isActive && "text-[oklch(0.55_0.015_260)] hover:text-[oklch(0.85_0.005_260)] hover:bg-[oklch(1_0_0/3%)]"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute right-3 w-1.5 h-1.5 rounded-full",
                        isBusiness ? "bg-neon-gold" : "bg-neon-cyan"
                      )}
                      style={{
                        boxShadow: isBusiness
                          ? '0 0 8px oklch(0.82 0.15 85 / 60%)'
                          : '0 0 8px oklch(0.82 0.15 192 / 60%)',
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[280px] h-screen flex flex-col relative overflow-hidden border-r border-[oklch(1_0_0/6%)]"
      style={{
        background: 'linear-gradient(180deg, oklch(0.1 0.02 260 / 90%) 0%, oklch(0.05 0.015 260 / 95%) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Sidebar edge glow */}
      <div
        className="absolute top-0 right-0 w-px h-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, oklch(0.82 0.15 192 / 40%) 20%, oklch(0.62 0.24 295 / 30%) 50%, oklch(0.82 0.15 192 / 40%) 80%, transparent 100%)',
          animation: 'sidebarPulse 8s ease-in-out infinite',
        }}
      />

      {/* Brand */}
      <div className="px-5 py-6 border-b border-[oklch(1_0_0/6%)]">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-[var(--font-display)] text-lg text-[oklch(0.03_0.015_260)]"
            style={{
              background: 'linear-gradient(135deg, oklch(0.82 0.15 192), oklch(0.62 0.24 295))',
              boxShadow: '0 0 20px oklch(0.82 0.15 192 / 30%)',
            }}
          >
            DC
          </div>
          <div>
            <h1
              className="text-[22px] tracking-[3px] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              DC ALACRITY
            </h1>
          </div>
        </div>
        <p
          className="text-[10px] tracking-[2px] uppercase mt-1"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'oklch(0.5 0.015 260)',
          }}
        >
          Production Command System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navSections.map((section, i) => (
          <NavSectionGroup
            key={section.title}
            section={section}
            activeView={activeView}
            onNavigate={onNavigate}
            sectionIndex={i}
          />
        ))}
      </nav>

      {/* Project Selector */}
      <div className="px-5 py-4 border-t border-[oklch(1_0_0/6%)] bg-[oklch(0.08_0.01_260/80%)]">
        <p
          className="text-[9px] font-semibold tracking-[1.5px] uppercase mb-2"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'oklch(0.45 0.015 260)',
          }}
        >
          Active Production
        </p>
        <select
          className="w-full bg-[oklch(0.12_0.015_260/60%)] border border-[oklch(1_0_0/8%)] rounded-lg px-3 py-2 text-[13px] text-[oklch(0.85_0.005_260)] backdrop-blur-sm appearance-none focus:outline-none focus:border-[oklch(0.82_0.15_192/40%)] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <option>My Production</option>
        </select>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] uppercase border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.7_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] hover:text-[oklch(0.85_0.005_260)] transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            + New
          </button>
          <button className="flex-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] uppercase border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.7_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] hover:text-[oklch(0.85_0.005_260)] transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Rename
          </button>
        </div>
      </div>
    </aside>
  );
}
