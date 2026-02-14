/**
 * AURORA SANCTUM — Home Page
 * Main orchestrator: Login → App Shell with Sidebar + Views
 * Design: Ethereal Glassmorphism Cathedral
 */
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";
import LoginOverlay from "@/components/LoginOverlay";
import Sidebar from "@/components/Sidebar";
import CommandBar from "@/components/CommandBar";
import DashboardView from "@/components/views/DashboardView";
import CalendarView from "@/components/views/CalendarView";
import ScheduleView from "@/components/views/ScheduleView";
import FinancialsView from "@/components/views/FinancialsView";
import CastCrewView from "@/components/views/CastCrewView";
import ShotListView from "@/components/views/ShotListView";
import VaultView from "@/components/views/VaultView";
import RiskMatrixView from "@/components/views/RiskMatrixView";
import BreakdownView from "@/components/views/BreakdownView";
import GanttView from "@/components/views/GanttView";
import MilestonesView from "@/components/views/MilestonesView";
import ContinuityView from "@/components/views/ContinuityView";
import ShootDaysView from "@/components/views/ShootDaysView";
import TechGearView from "@/components/views/TechGearView";
import DocumentsView from "@/components/views/DocumentsView";
import ContactsView from "@/components/views/ContactsView";
import PipelineView from "@/components/views/PipelineView";
import DialerView from "@/components/views/DialerView";
import IntelView from "@/components/views/IntelView";
import ScriptImportView from "@/components/views/ScriptImportView";
import ProductionNotesView from "@/components/views/ProductionNotesView";

const VIEW_TITLES: Record<string, string> = {
  'dashboard': 'DASHBOARD',
  'calendar': 'CALENDAR',
  'schedule': 'SCHEDULE',
  'breakdown': 'BREAKDOWN',
  'shotlist': 'SHOT LIST',
  'continuity': 'CONTINUITY',
  'cast-crew': 'CAST & CREW',
  'days': 'SHOOT DAYS',
  'tech': 'TECH & GEAR',
  'vault': 'VAULT',
  'gantt': 'GANTT CHART',
  'milestones': 'MILESTONES',
  'risk': 'RISK MATRIX',
  'financials': 'FINANCIALS',
  'documents': 'DOCUMENTS',
  'contacts': 'CONTACTS',
  'prod-pipeline': 'PROD PIPELINE',
  'prod-dialer': 'PROD DIALER',
  'prod-intel': 'PROD INTEL',
  'biz-pipeline': 'BIZ PIPELINE',
  'biz-dialer': 'BIZ DIALER',
  'biz-intel': 'BIZ INTEL',
  'script-import': 'SCRIPT IMPORT',
  'notes': 'PRODUCTION NOTES',
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<'demo' | 'cloud'>('demo');
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = useCallback((loginMode: 'demo' | 'cloud') => {
    setMode(loginMode);
    setIsLoggedIn(true);
  }, []);

  const handleNavigate = useCallback((viewId: string) => {
    setActiveView(viewId);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveView('dashboard');
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'schedule':
        return <ScheduleView />;
      case 'financials':
        return <FinancialsView />;
      case 'cast-crew':
        return <CastCrewView />;
      case 'shotlist':
        return <ShotListView />;
      case 'vault':
        return <VaultView />;
      case 'risk':
        return <RiskMatrixView />;
      case 'breakdown':
        return <BreakdownView />;
      case 'gantt':
        return <GanttView />;
      case 'milestones':
        return <MilestonesView />;
      case 'continuity':
        return <ContinuityView />;
      case 'days':
        return <ShootDaysView />;
      case 'tech':
        return <TechGearView />;
      case 'documents':
        return <DocumentsView />;
      case 'contacts':
        return <ContactsView />;
      case 'prod-pipeline':
        return <PipelineView variant="production" />;
      case 'prod-dialer':
        return <DialerView variant="production" />;
      case 'prod-intel':
        return <IntelView variant="production" />;
      case 'biz-pipeline':
        return <PipelineView variant="business" />;
      case 'biz-dialer':
        return <DialerView variant="business" />;
      case 'biz-intel':
        return <IntelView variant="business" />;
      case 'script-import':
        return <ScriptImportView />;
      case 'notes':
        return <ProductionNotesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Aurora Background — always present */}
      <AuroraBackground />

      {/* Login Overlay */}
      <LoginOverlay visible={!isLoggedIn} onLogin={handleLogin} />

      {/* App Shell */}
      <AnimatePresence>
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 h-screen flex"
          >
            {/* Sidebar */}
            <Sidebar activeView={activeView} onNavigate={handleNavigate} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Command Bar */}
              <CommandBar
                title={VIEW_TITLES[activeView] || activeView.toUpperCase()}
                mode={mode}
                onLogout={handleLogout}
              />

              {/* View Container */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
