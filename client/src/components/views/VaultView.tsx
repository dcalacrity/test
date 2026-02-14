/**
 * AURORA SANCTUM — Vault View
 * Digital asset management with glass file cards and grid/list toggle
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  Upload, Search, Grid3X3, List, Film, Image, FileText, Music,
  Folder, HardDrive, Clock, Download,
} from "lucide-react";
import { useState } from "react";

interface VaultAsset {
  name: string;
  type: 'video' | 'image' | 'document' | 'audio' | 'folder';
  size: string;
  modified: string;
  tags: string[];
  scene?: string;
}

const assets: VaultAsset[] = [
  { name: 'Scene_01_Master_Take3.mov', type: 'video', size: '4.2 GB', modified: 'Feb 13, 2026', tags: ['Scene 1', 'Master'], scene: '1' },
  { name: 'Scene_03_Coverage_A.mov', type: 'video', size: '3.8 GB', modified: 'Feb 13, 2026', tags: ['Scene 3', 'Coverage'], scene: '3' },
  { name: 'BTS_Day1_Photos', type: 'folder', size: '847 MB', modified: 'Feb 12, 2026', tags: ['BTS', 'Day 1'] },
  { name: 'Location_Scout_Warehouse.jpg', type: 'image', size: '12.4 MB', modified: 'Feb 11, 2026', tags: ['Location', 'Warehouse'] },
  { name: 'Sound_Design_Draft_v2.wav', type: 'audio', size: '156 MB', modified: 'Feb 10, 2026', tags: ['Sound', 'Draft'] },
  { name: 'Script_Final_v4.pdf', type: 'document', size: '2.1 MB', modified: 'Feb 9, 2026', tags: ['Script', 'Final'] },
  { name: 'Storyboard_Act2.pdf', type: 'document', size: '8.7 MB', modified: 'Feb 8, 2026', tags: ['Storyboard', 'Act 2'] },
  { name: 'Color_Reference_LUT.cube', type: 'document', size: '1.2 MB', modified: 'Feb 7, 2026', tags: ['Color', 'LUT'] },
  { name: 'Scene_05_Lab_Ambience.wav', type: 'audio', size: '89 MB', modified: 'Feb 7, 2026', tags: ['Sound', 'Scene 5'] },
  { name: 'VFX_Plate_Device_v1.exr', type: 'image', size: '234 MB', modified: 'Feb 6, 2026', tags: ['VFX', 'Device'] },
];

const typeIcons: Record<string, typeof Film> = {
  video: Film,
  image: Image,
  document: FileText,
  audio: Music,
  folder: Folder,
};

const typeColors: Record<string, string> = {
  video: 'oklch(0.82 0.15 192)',
  image: 'oklch(0.72 0.17 162)',
  document: 'oklch(0.82 0.15 85)',
  audio: 'oklch(0.62 0.24 295)',
  folder: 'oklch(0.75 0.15 55)',
};

export default function VaultView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Toolbar */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[oklch(0.45_0.015_260)]" />
              <input
                type="text"
                placeholder="Search vault..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-[12px] bg-[oklch(0.12_0.015_260/60%)] border border-[oklch(1_0_0/8%)] text-[oklch(0.85_0.005_260)] placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-[oklch(0.82_0.15_192/40%)] transition-colors w-[240px]"
                style={{ fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)' }}
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Upload className="w-3.5 h-3.5" />
              UPLOAD
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: viewMode === 'grid' ? 'oklch(0.82 0.15 192 / 15%)' : 'transparent',
                color: viewMode === 'grid' ? 'oklch(0.82 0.15 192)' : 'oklch(0.5 0.015 260)',
                border: viewMode === 'grid' ? '1px solid oklch(0.82 0.15 192 / 25%)' : '1px solid transparent',
              }}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: viewMode === 'list' ? 'oklch(0.82 0.15 192 / 15%)' : 'transparent',
                color: viewMode === 'list' ? 'oklch(0.82 0.15 192)' : 'oklch(0.5 0.015 260)',
                border: viewMode === 'list' ? '1px solid oklch(0.82 0.15 192 / 25%)' : '1px solid transparent',
              }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Storage Stats */}
      <div className="grid grid-cols-3 gap-3">
        <GlassCard delay={0.05} className="!p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              Total Assets
            </p>
            <HardDrive className="w-3.5 h-3.5" style={{ color: 'oklch(0.82 0.15 192)' }} />
          </div>
          <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.82 0.15 192)' }}>847</p>
        </GlassCard>
        <GlassCard delay={0.08} className="!p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              Storage Used
            </p>
            <Folder className="w-3.5 h-3.5" style={{ color: 'oklch(0.62 0.24 295)' }} />
          </div>
          <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.62 0.24 295)' }}>124 GB</p>
        </GlassCard>
        <GlassCard delay={0.11} className="!p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-semibold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              Last Upload
            </p>
            <Clock className="w-3.5 h-3.5" style={{ color: 'oklch(0.82 0.15 85)' }} />
          </div>
          <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: 'oklch(0.82 0.15 85)' }}>2h ago</p>
        </GlassCard>
      </div>

      {/* Asset Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((asset, i) => {
            const Icon = typeIcons[asset.type];
            const color = typeColors[asset.type];

            return (
              <GlassCard key={asset.name} delay={0.15 + i * 0.03}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[oklch(0.85_0.005_260)] truncate">{asset.name}</p>
                    <p className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                      {asset.size} · {asset.modified}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded" style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'oklch(0.15 0.015 260 / 60%)',
                      color: 'oklch(0.55 0.015 260)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard delay={0.15} hover={false}>
          <div className="grid gap-4 py-2 border-b border-[oklch(1_0_0/8%)]"
            style={{ gridTemplateColumns: '40px 1fr 80px 100px 100px 40px' }}>
            {['', 'Name', 'Size', 'Modified', 'Tags', ''].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                {h}
              </span>
            ))}
          </div>
          {filtered.map((asset, i) => {
            const Icon = typeIcons[asset.type];
            const color = typeColors[asset.type];
            return (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.03 }}
                className="grid gap-4 py-3 items-center border-b border-[oklch(1_0_0/4%)] hover:bg-[oklch(1_0_0/2%)] transition-colors cursor-pointer"
                style={{ gridTemplateColumns: '40px 1fr 80px 100px 100px 40px' }}
              >
                <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
                <span className="text-[12px] text-[oklch(0.85_0.005_260)] truncate">{asset.name}</span>
                <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>{asset.size}</span>
                <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>{asset.modified}</span>
                <div className="flex gap-1 overflow-hidden">
                  {asset.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[8px] px-1 py-0.5 rounded truncate" style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'oklch(0.15 0.015 260 / 60%)',
                      color: 'oklch(0.5 0.015 260)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Download className="w-3.5 h-3.5 text-[oklch(0.4_0.015_260)] hover:text-[oklch(0.7_0.015_260)] transition-colors" />
              </motion.div>
            );
          })}
        </GlassCard>
      )}
    </div>
  );
}
