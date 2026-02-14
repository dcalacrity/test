/**
 * AURORA SANCTUM — Production Notes View
 * Rich text notes with categories, tags, and quick save
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Save, Plus, Search, Tag, Clock, Star, Trash2,
  FileText, Pin, ChevronRight, BookOpen,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  updated: string;
  tags: string[];
}

const initialNotes: Note[] = [
  {
    id: 'n1', title: 'Day 1 Wrap Notes', pinned: true, updated: '2 hours ago',
    category: 'Shoot Day',
    content: 'Completed 4 scenes. Scene 1 required 3 takes due to lighting issues. Scene 3 nailed on first take. Camera B had minor focus drift on close-ups — check lens calibration before Day 2.',
    tags: ['day-1', 'camera', 'priority'],
  },
  {
    id: 'n2', title: 'Location Permits Status', pinned: true, updated: '5 hours ago',
    category: 'Logistics',
    content: 'Downtown permits approved through March 15. Warehouse location still pending — follow up with city office Monday. Rooftop access confirmed for night shoots only (8PM-4AM).',
    tags: ['permits', 'locations'],
  },
  {
    id: 'n3', title: 'Cast Availability Changes', pinned: false, updated: '1 day ago',
    category: 'Cast',
    content: 'Elena (Sarah Chen) unavailable Feb 20-22 due to prior commitment. Need to reschedule Scene 4 and Scene 12. Agent K (Mike Torres) confirmed available all remaining dates.',
    tags: ['scheduling', 'cast'],
  },
  {
    id: 'n4', title: 'VFX Shot List Updates', pinned: false, updated: '2 days ago',
    category: 'Post-Production',
    content: 'Added 3 new VFX shots for the lab sequence. Total VFX shots now at 28. Budget impact: ~$4,200 additional. Need approval from producer before proceeding.',
    tags: ['vfx', 'budget'],
  },
  {
    id: 'n5', title: 'Catering Menu for Week 2', pinned: false, updated: '3 days ago',
    category: 'Logistics',
    content: 'Confirmed vegetarian and gluten-free options for all meal services. Breakfast call at 5:30 AM for early shoots. Coffee service to remain available throughout the day.',
    tags: ['catering', 'logistics'],
  },
];

const categories = ['All', 'Shoot Day', 'Logistics', 'Cast', 'Post-Production', 'General'];
const categoryColors: Record<string, string> = {
  'Shoot Day': 'oklch(0.82 0.15 192)',
  'Logistics': 'oklch(0.82 0.15 85)',
  'Cast': 'oklch(0.62 0.24 295)',
  'Post-Production': 'oklch(0.72 0.17 162)',
  'General': 'oklch(0.62 0.18 255)',
};

export default function ProductionNotesView() {
  const [notes] = useState<Note[]>(initialNotes);
  const [activeNote, setActiveNote] = useState<Note>(initialNotes[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n => {
    const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
    const matchesSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Header */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[1px]"
              style={{ fontFamily: 'var(--font-mono)', background: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)', border: '1px solid oklch(0.82 0.15 192 / 30%)' }}>
              TOOLS
            </span>
            <span className="text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              Production Notes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Save className="w-3.5 h-3.5" /> SAVE ALL
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px]"
              style={{ fontFamily: 'var(--font-mono)', background: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)', border: '1px solid oklch(0.82 0.15 192 / 25%)' }}>
              <Plus className="w-3.5 h-3.5" /> NEW NOTE
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Main Layout */}
      <div className="grid grid-cols-[300px_1fr] gap-4" style={{ minHeight: '500px' }}>
        {/* Sidebar: Note List */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'oklch(0.4 0.015 260)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[11px] focus:outline-none focus:ring-1 focus:ring-[oklch(0.82_0.15_192/40%)]"
              style={{
                background: 'oklch(0.1 0.015 260 / 50%)',
                border: '1px solid oklch(1 0 0 / 8%)',
                fontFamily: 'var(--font-mono)',
                color: 'oklch(0.75 0.01 260)',
              }}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-2 py-1 rounded-lg text-[9px] font-semibold tracking-[1px] transition-all"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: activeCategory === cat ? 'oklch(0.82 0.15 192 / 15%)' : 'oklch(0.12 0.015 260 / 40%)',
                  color: activeCategory === cat ? 'oklch(0.82 0.15 192)' : 'oklch(0.5 0.015 260)',
                  border: `1px solid ${activeCategory === cat ? 'oklch(0.82 0.15 192 / 25%)' : 'oklch(1 0 0 / 6%)'}`,
                }}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Note List */}
          <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight: '420px' }}>
            {pinnedNotes.length > 0 && (
              <p className="text-[8px] font-bold tracking-[2px] uppercase px-1 pt-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                PINNED
              </p>
            )}
            {pinnedNotes.map((note, i) => (
              <NoteListItem key={note.id} note={note} isActive={activeNote?.id === note.id} onClick={() => setActiveNote(note)} delay={0.1 + i * 0.03} />
            ))}
            {unpinnedNotes.length > 0 && (
              <p className="text-[8px] font-bold tracking-[2px] uppercase px-1 pt-2" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                NOTES
              </p>
            )}
            {unpinnedNotes.map((note, i) => (
              <NoteListItem key={note.id} note={note} isActive={activeNote?.id === note.id} onClick={() => setActiveNote(note)} delay={0.15 + i * 0.03} />
            ))}
          </div>
        </div>

        {/* Editor */}
        <GlassCard delay={0.2} hover={false}>
          {activeNote ? (
            <div className="h-full flex flex-col">
              {/* Note Header */}
              <div className="flex items-start justify-between mb-4 pb-3 border-b border-[oklch(1_0_0/6%)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {activeNote.pinned && <Pin className="w-3 h-3" style={{ color: 'oklch(0.82 0.15 85)' }} />}
                    <h3 className="text-[18px] font-bold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                      {activeNote.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: `${categoryColors[activeNote.category] || 'oklch(0.5 0.015 260)'}15`,
                        color: categoryColors[activeNote.category] || 'oklch(0.5 0.015 260)',
                      }}>
                      {activeNote.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] flex items-center gap-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                      <Clock className="w-3 h-3" /> {activeNote.updated}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-[oklch(1_0_0/5%)] transition-colors">
                    <Pin className="w-4 h-4" style={{ color: activeNote.pinned ? 'oklch(0.82 0.15 85)' : 'oklch(0.4 0.015 260)' }} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[oklch(0.62_0.22_15/10%)] transition-colors">
                    <Trash2 className="w-4 h-4" style={{ color: 'oklch(0.4 0.015 260)' }} />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <textarea
                defaultValue={activeNote.content}
                className="flex-1 w-full rounded-xl p-4 text-[13px] leading-relaxed resize-none focus:outline-none"
                style={{
                  minHeight: '300px',
                  background: 'oklch(0.08 0.01 260 / 50%)',
                  border: '1px solid oklch(1 0 0 / 5%)',
                  fontFamily: 'var(--font-mono)',
                  color: 'oklch(0.75 0.01 260)',
                }}
              />

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[oklch(1_0_0/6%)]">
                <Tag className="w-3 h-3" style={{ color: 'oklch(0.4 0.015 260)' }} />
                {activeNote.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-semibold tracking-[0.5px] px-2 py-0.5 rounded-full"
                    style={{ fontFamily: 'var(--font-mono)', background: 'oklch(0.15 0.015 260 / 50%)', color: 'oklch(0.55 0.015 260)', border: '1px solid oklch(1 0 0 / 6%)' }}>
                    {tag}
                  </span>
                ))}
                <button className="text-[9px] tracking-[0.5px] px-2 py-0.5 rounded-full border border-dashed border-[oklch(1_0_0/10%)] text-[oklch(0.4_0.015_260)] hover:text-[oklch(0.6_0.015_260)] transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  + add tag
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <BookOpen className="w-12 h-12 mb-3" style={{ color: 'oklch(0.3 0.015 260)' }} strokeWidth={1.5} />
              <p className="text-[13px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                Select a note to view
              </p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function NoteListItem({ note, isActive, onClick, delay }: { note: Note; isActive: boolean; onClick: () => void; delay: number }) {
  const catColor = categoryColors[note.category] || 'oklch(0.5 0.015 260)';
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
        isActive
          ? 'border-[oklch(0.82_0.15_192/40%)] bg-[oklch(0.82_0.15_192/8%)]'
          : 'border-[oklch(1_0_0/6%)] bg-[oklch(0.12_0.015_260/40%)] hover:bg-[oklch(0.15_0.015_260/50%)] hover:border-[oklch(1_0_0/10%)]'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {note.pinned && <Pin className="w-2.5 h-2.5 flex-shrink-0" style={{ color: 'oklch(0.82 0.15 85)' }} />}
        <span className="text-[12px] font-semibold text-white truncate">{note.title}</span>
      </div>
      <p className="text-[10px] line-clamp-2 mb-1.5" style={{ color: 'oklch(0.5 0.015 260)' }}>{note.content}</p>
      <div className="flex items-center gap-2">
        <span className="text-[8px] font-bold tracking-[0.5px] px-1.5 py-0.5 rounded"
          style={{ fontFamily: 'var(--font-mono)', background: `${catColor}10`, color: catColor }}>
          {note.category.toUpperCase()}
        </span>
        <span className="text-[9px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
          {note.updated}
        </span>
      </div>
    </motion.button>
  );
}
