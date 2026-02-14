/**
 * AURORA SANCTUM — Documents View
 * Production documents & templates management
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { FileText, FilePlus, Download, Eye, Folder, Clock } from "lucide-react";

const folders = [
  { name: 'Scripts', count: 4, color: 'oklch(0.82 0.15 192)' },
  { name: 'Call Sheets', count: 12, color: 'oklch(0.72 0.17 162)' },
  { name: 'Contracts', count: 8, color: 'oklch(0.82 0.15 85)' },
  { name: 'Storyboards', count: 3, color: 'oklch(0.62 0.24 295)' },
  { name: 'Insurance', count: 2, color: 'oklch(0.62 0.22 15)' },
  { name: 'Permits', count: 5, color: 'oklch(0.62 0.18 255)' },
];

const documents = [
  { name: 'Script_Final_v4.pdf', folder: 'Scripts', size: '2.1 MB', modified: 'Feb 12, 2026', status: 'current' },
  { name: 'Script_Draft_v3.pdf', folder: 'Scripts', size: '1.9 MB', modified: 'Feb 5, 2026', status: 'archived' },
  { name: 'CallSheet_Day1.pdf', folder: 'Call Sheets', size: '340 KB', modified: 'Feb 13, 2026', status: 'current' },
  { name: 'CallSheet_Day2.pdf', folder: 'Call Sheets', size: '320 KB', modified: 'Feb 13, 2026', status: 'current' },
  { name: 'Contract_MarcusChen.pdf', folder: 'Contracts', size: '890 KB', modified: 'Jan 28, 2026', status: 'signed' },
  { name: 'Contract_ElenaVasquez.pdf', folder: 'Contracts', size: '870 KB', modified: 'Jan 28, 2026', status: 'signed' },
  { name: 'Contract_JamesWebb.pdf', folder: 'Contracts', size: '850 KB', modified: 'Jan 30, 2026', status: 'pending' },
  { name: 'Storyboard_Act1.pdf', folder: 'Storyboards', size: '5.4 MB', modified: 'Feb 8, 2026', status: 'current' },
  { name: 'Insurance_Certificate.pdf', folder: 'Insurance', size: '1.2 MB', modified: 'Jan 15, 2026', status: 'current' },
  { name: 'LocationPermit_Rooftop.pdf', folder: 'Permits', size: '450 KB', modified: 'Feb 10, 2026', status: 'approved' },
  { name: 'LocationPermit_Warehouse.pdf', folder: 'Permits', size: '480 KB', modified: 'Feb 11, 2026', status: 'pending' },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  current: { bg: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)' },
  archived: { bg: 'oklch(0.5 0.015 260 / 15%)', color: 'oklch(0.5 0.015 260)' },
  signed: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)' },
  pending: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)' },
  approved: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)' },
};

export default function DocumentsView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-semibold tracking-[1px]"
            style={{
              background: 'linear-gradient(135deg, oklch(0.82 0.15 192), oklch(0.62 0.24 295))',
              color: 'oklch(0.03 0.015 260)',
              fontFamily: 'var(--font-mono)',
            }}>
            <FilePlus className="w-4 h-4" strokeWidth={1.5} />
            UPLOAD
          </button>
        </div>
        <span className="text-[10px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
          {documents.length} DOCUMENTS
        </span>
      </div>

      {/* Folders */}
      <div className="grid grid-cols-6 gap-3">
        {folders.map((folder, i) => (
          <GlassCard key={folder.name} delay={i * 0.04} className="cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Folder className="w-8 h-8 mb-2" style={{ color: folder.color }} strokeWidth={1.5} />
              <span className="text-[11px] font-semibold text-white mb-0.5">{folder.name}</span>
              <span className="text-[9px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                {folder.count} files
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Documents Table */}
      <GlassCard delay={0.3}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
            All Documents
          </h3>
        </div>

        <div className="grid grid-cols-[1fr_120px_80px_120px_80px_60px] gap-3 py-2 border-b border-[oklch(1_0_0/8%)]">
          {['Name', 'Folder', 'Size', 'Modified', 'Status', ''].map(h => (
            <span key={h} className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
              {h}
            </span>
          ))}
        </div>

        {documents.map((doc, i) => {
          const sc = statusColors[doc.status] || statusColors.current;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.04 }}
              className="grid grid-cols-[1fr_120px_80px_120px_80px_60px] gap-3 py-2.5 border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors items-center"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.6 0.015 260)' }} strokeWidth={1.5} />
                <span className="text-[12px] text-white truncate">{doc.name}</span>
              </div>
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>{doc.folder}</span>
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>{doc.size}</span>
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>{doc.modified}</span>
              <span className="px-2 py-0.5 rounded text-[8px] font-bold text-center uppercase" style={{
                background: sc.bg,
                color: sc.color,
                fontFamily: 'var(--font-mono)',
              }}>
                {doc.status}
              </span>
              <div className="flex gap-1">
                <button className="p-1 rounded hover:bg-[oklch(1_0_0/5%)] transition-colors">
                  <Eye className="w-3.5 h-3.5" style={{ color: 'oklch(0.5 0.015 260)' }} strokeWidth={1.5} />
                </button>
                <button className="p-1 rounded hover:bg-[oklch(1_0_0/5%)] transition-colors">
                  <Download className="w-3.5 h-3.5" style={{ color: 'oklch(0.5 0.015 260)' }} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </GlassCard>
    </div>
  );
}
