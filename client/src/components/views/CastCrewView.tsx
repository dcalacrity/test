/**
 * AURORA SANCTUM — Cast & Crew View
 * Premium personnel directory with glass profile cards
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Phone, Mail, Star, UserCircle } from "lucide-react";
import { useState } from "react";

interface Person {
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  status: 'confirmed' | 'pending' | 'contacted';
  rate?: string;
  avatar?: string;
}

const castCrew: Person[] = [
  { name: 'Marcus Chen', role: 'Lead Actor', department: 'Cast', phone: '(555) 234-5678', email: 'marcus@email.com', status: 'confirmed', rate: '$2,500/day' },
  { name: 'Elena Vasquez', role: 'Lead Actress', department: 'Cast', phone: '(555) 345-6789', email: 'elena@email.com', status: 'confirmed', rate: '$2,200/day' },
  { name: 'James Webb', role: 'Supporting Actor', department: 'Cast', phone: '(555) 456-7890', email: 'jwebb@email.com', status: 'confirmed', rate: '$1,200/day' },
  { name: 'Sarah Kim', role: 'Director of Photography', department: 'Camera', phone: '(555) 567-8901', email: 'sarah.k@email.com', status: 'confirmed', rate: '$1,800/day' },
  { name: 'David Okafor', role: 'Gaffer', department: 'Lighting', phone: '(555) 678-9012', email: 'dokafor@email.com', status: 'confirmed', rate: '$800/day' },
  { name: 'Lisa Park', role: 'Production Designer', department: 'Art', phone: '(555) 789-0123', email: 'lisa.p@email.com', status: 'pending', rate: '$1,000/day' },
  { name: 'Mike Torres', role: 'Sound Mixer', department: 'Sound', phone: '(555) 890-1234', email: 'mtorres@email.com', status: 'confirmed', rate: '$600/day' },
  { name: 'Rachel Green', role: '1st AD', department: 'Production', phone: '(555) 901-2345', email: 'rgreen@email.com', status: 'contacted', rate: '$900/day' },
];

const departments = ['All', 'Cast', 'Camera', 'Lighting', 'Art', 'Sound', 'Production'];

const statusStyles: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)' },
  pending: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)' },
  contacted: { bg: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)' },
};

const deptColors: Record<string, string> = {
  Cast: 'oklch(0.62 0.24 295)',
  Camera: 'oklch(0.82 0.15 192)',
  Lighting: 'oklch(0.82 0.15 85)',
  Art: 'oklch(0.72 0.17 162)',
  Sound: 'oklch(0.62 0.18 255)',
  Production: 'oklch(0.75 0.15 55)',
};

export default function CastCrewView() {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = castCrew.filter(p => {
    const matchesDept = activeDept === 'All' || p.department === activeDept;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

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
                placeholder="Search cast & crew..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-[12px] bg-[oklch(0.12_0.015_260/60%)] border border-[oklch(1_0_0/8%)] text-[oklch(0.85_0.005_260)] placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-[oklch(0.82_0.15_192/40%)] transition-colors w-[240px]"
                style={{ fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)' }}
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] bg-[oklch(0.82_0.15_192/15%)] text-[oklch(0.82_0.15_192)] border border-[oklch(0.82_0.15_192/25%)] hover:bg-[oklch(0.82_0.15_192/25%)] transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}>
              <Plus className="w-3.5 h-3.5" />
              ADD MEMBER
            </button>
          </div>
          <div className="flex items-center gap-1">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] transition-all"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: activeDept === dept ? 'oklch(0.82 0.15 192 / 15%)' : 'transparent',
                  color: activeDept === dept ? 'oklch(0.82 0.15 192)' : 'oklch(0.5 0.015 260)',
                  border: activeDept === dept ? '1px solid oklch(0.82 0.15 192 / 25%)' : '1px solid transparent',
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Personnel Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((person, i) => {
          const status = statusStyles[person.status];
          const deptColor = deptColors[person.department] || 'oklch(0.82 0.15 192)';

          return (
            <GlassCard key={person.name} delay={0.1 + i * 0.05}>
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${deptColor}15`,
                    border: `1px solid ${deptColor}25`,
                  }}
                >
                  <UserCircle className="w-7 h-7" style={{ color: deptColor }} strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[15px] font-semibold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                      {person.name}
                    </h4>
                    <span
                      className="text-[9px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: status.bg,
                        color: status.color,
                      }}
                    >
                      {person.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[12px] text-[oklch(0.7_0.015_260)] mb-2">{person.role}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{
                      fontFamily: 'var(--font-mono)',
                      background: `${deptColor}15`,
                      color: deptColor,
                    }}>
                      {person.department}
                    </span>
                    {person.rate && (
                      <span className="text-[10px] font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.82 0.15 85)' }}>
                        {person.rate}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[11px] text-[oklch(0.5_0.015_260)]">
                      <Phone className="w-3 h-3" />
                      {person.phone}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[oklch(0.5_0.015_260)]">
                      <Mail className="w-3 h-3" />
                      {person.email}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
