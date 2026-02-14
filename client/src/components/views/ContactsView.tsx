/**
 * AURORA SANCTUM — Contacts View
 * Contact directory & communication hub
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Contact, Phone, Mail, MapPin, Search, UserPlus } from "lucide-react";
import { useState } from "react";

const contacts = [
  { name: 'Sarah Mitchell', role: 'Location Manager', company: 'Mitchell Locations', phone: '(555) 111-2233', email: 'sarah@mitchelllocations.com', city: 'Los Angeles', category: 'vendor' },
  { name: 'Tom Rodriguez', role: 'Insurance Agent', company: 'FilmSafe Insurance', phone: '(555) 222-3344', email: 'tom@filmsafe.com', city: 'Los Angeles', category: 'vendor' },
  { name: 'Amy Chen', role: 'Casting Director', company: 'Chen Casting', phone: '(555) 333-4455', email: 'amy@chencasting.com', city: 'Los Angeles', category: 'vendor' },
  { name: 'Jake Williams', role: 'Stunt Coordinator', company: 'Action FX', phone: '(555) 444-5566', email: 'jake@actionfx.com', city: 'Los Angeles', category: 'crew' },
  { name: 'Maria Santos', role: 'Catering Manager', company: 'Craft Services Pro', phone: '(555) 555-6677', email: 'maria@craftpro.com', city: 'Los Angeles', category: 'vendor' },
  { name: 'David Park', role: 'VFX Supervisor', company: 'Digital Canvas', phone: '(555) 666-7788', email: 'david@digitalcanvas.com', city: 'Burbank', category: 'post' },
  { name: 'Lisa Thompson', role: 'Colorist', company: 'Color Lab', phone: '(555) 777-8899', email: 'lisa@colorlab.com', city: 'Hollywood', category: 'post' },
  { name: 'Robert Kim', role: 'Sound Designer', company: 'SoundWorks', phone: '(555) 888-9900', email: 'robert@soundworks.com', city: 'Burbank', category: 'post' },
  { name: 'Jennifer Adams', role: 'Entertainment Lawyer', company: 'Adams & Associates', phone: '(555) 999-0011', email: 'jennifer@adamslaw.com', city: 'Beverly Hills', category: 'legal' },
  { name: 'Chris Morgan', role: 'Equipment Manager', company: 'Panavision', phone: '(555) 000-1122', email: 'chris@panavision.com', city: 'Woodland Hills', category: 'vendor' },
];

const categoryColors: Record<string, { bg: string; color: string }> = {
  vendor: { bg: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)' },
  crew: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)' },
  post: { bg: 'oklch(0.62 0.24 295 / 15%)', color: 'oklch(0.62 0.24 295)' },
  legal: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)' },
};

export default function ContactsView() {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.45 0.015 260)' }} strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] bg-[oklch(0.12_0.015_260/60%)] border border-[oklch(1_0_0/8%)] text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-[oklch(0.82_0.15_192/40%)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', backdropFilter: 'blur(12px)' }}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-[1px]"
          style={{
            background: 'linear-gradient(135deg, oklch(0.82 0.15 192), oklch(0.62 0.24 295))',
            color: 'oklch(0.03 0.015 260)',
            fontFamily: 'var(--font-mono)',
          }}>
          <UserPlus className="w-4 h-4" strokeWidth={1.5} />
          ADD CONTACT
        </button>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((contact, i) => {
          const cc = categoryColors[contact.category] || categoryColors.vendor;
          return (
            <GlassCard key={contact.name} delay={0.1 + i * 0.04}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold"
                    style={{
                      background: `${cc.color}15`,
                      border: `1px solid ${cc.color}25`,
                      color: cc.color,
                      fontFamily: 'var(--font-display)',
                    }}>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                      {contact.name}
                    </h3>
                    <p className="text-[11px]" style={{ color: 'oklch(0.6 0.015 260)' }}>
                      {contact.role}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase" style={{
                  background: cc.bg,
                  color: cc.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {contact.category}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                <div className="flex items-center gap-2" style={{ color: 'oklch(0.6 0.015 260)' }}>
                  <Contact className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                  {contact.company}
                </div>
                <div className="flex items-center gap-2" style={{ color: 'oklch(0.6 0.015 260)' }}>
                  <Phone className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                  {contact.phone}
                </div>
                <div className="flex items-center gap-2" style={{ color: 'oklch(0.6 0.015 260)' }}>
                  <Mail className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                  {contact.email}
                </div>
                <div className="flex items-center gap-2" style={{ color: 'oklch(0.5 0.015 260)' }}>
                  <MapPin className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                  {contact.city}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
