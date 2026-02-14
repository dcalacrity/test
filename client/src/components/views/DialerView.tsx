/**
 * AURORA SANCTUM — Dialer View (CRM Call HUD)
 * Power dialer with contact queue and call management
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone, PhoneOff, PhoneForwarded, SkipForward,
  User, Clock, MessageSquare, Star, Volume2,
  Mic, MicOff, Pause, Play, ChevronRight,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  stage: string;
  lastCall?: string;
  notes?: string;
  priority: 'high' | 'medium' | 'low';
}

interface DialerViewProps {
  variant: 'production' | 'business';
}

const prodContacts: Contact[] = [
  { id: 'c1', name: 'Sarah Chen', company: 'Talent Agency X', phone: '(310) 555-0142', stage: 'New', priority: 'high', notes: 'Interested in lead role casting' },
  { id: 'c2', name: 'Mike Torres', company: 'Grip & Electric', phone: '(818) 555-0198', stage: 'Contacted', priority: 'medium', lastCall: '2 days ago' },
  { id: 'c3', name: 'Lisa Park', company: 'Catering Solutions', phone: '(323) 555-0177', stage: 'Negotiating', priority: 'medium', lastCall: '5 days ago' },
  { id: 'c4', name: 'James Wright', company: 'Location Scout Pro', phone: '(424) 555-0133', stage: 'New', priority: 'high' },
  { id: 'c5', name: 'Anna Kim', company: 'Wardrobe Dept', phone: '(213) 555-0166', stage: 'Contacted', priority: 'low', lastCall: '1 week ago' },
  { id: 'c6', name: 'David Reyes', company: 'Sound Design', phone: '(310) 555-0211', stage: 'Committed', priority: 'high', lastCall: '3 days ago' },
];

const bizContacts: Contact[] = [
  { id: 'b1', name: 'TechVision Corp', company: 'Corporate Video', phone: '(415) 555-0301', stage: 'New', priority: 'high', notes: 'CEO interested in brand film' },
  { id: 'b2', name: 'Bloom Agency', company: 'Commercial', phone: '(212) 555-0422', stage: 'Pitched', priority: 'medium', lastCall: '1 day ago' },
  { id: 'b3', name: 'Metro Real Estate', company: 'VR Tour', phone: '(305) 555-0188', stage: 'Contacted', priority: 'medium', lastCall: '4 days ago' },
  { id: 'b4', name: 'FitLife Brand', company: 'Social Content', phone: '(646) 555-0277', stage: 'New', priority: 'low' },
  { id: 'b5', name: 'Nexus Gaming', company: 'Cinematic Trailer', phone: '(310) 555-0399', stage: 'Negotiating', priority: 'high', lastCall: '2 days ago' },
  { id: 'b6', name: 'Stellar Hotels', company: 'Brand Film', phone: '(702) 555-0155', stage: 'Pitched', priority: 'high', lastCall: '6 days ago' },
];

const priorityDot = {
  high: 'oklch(0.62 0.22 15)',
  medium: 'oklch(0.82 0.15 85)',
  low: 'oklch(0.62 0.18 255)',
};

export default function DialerView({ variant }: DialerViewProps) {
  const contacts = variant === 'production' ? prodContacts : bizContacts;
  const accentColor = variant === 'production' ? 'oklch(0.82 0.15 192)' : 'oklch(0.82 0.15 85)';
  const tagLabel = variant === 'production' ? 'PRODUCTION CRM' : 'BUSINESS CRM';
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleCall = (contact: Contact) => {
    setActiveContact(contact);
    setIsCalling(true);
  };

  const handleEndCall = () => {
    setIsCalling(false);
  };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Header */}
      <GlassCard delay={0} className="!p-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[1px]"
            style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
            {tagLabel}
          </span>
          <span className="text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            Dialer HUD
          </span>
        </div>
      </GlassCard>

      {/* Dialer Grid */}
      <div className="grid grid-cols-[1fr_320px] gap-4" style={{ minHeight: '500px' }}>
        {/* Main Dialer Area */}
        <GlassCard delay={0.1} hover={false}>
          {!activeContact ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}25`, boxShadow: `0 0 40px ${accentColor}15` }}>
                <Phone className="w-10 h-10" style={{ color: accentColor }} strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-[24px] tracking-[3px] text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                SELECT A CONTACT
              </h3>
              <p className="text-[12px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                Click a contact from the queue to begin
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[20px] font-bold"
                  style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                  {activeContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-[28px] font-bold text-white mb-1" style={{ fontFamily: 'var(--font-grotesk)' }}>
                  {activeContact.name}
                </h3>
                <p className="text-[13px] mb-2" style={{ color: 'oklch(0.6 0.015 260)' }}>{activeContact.company}</p>
                <p className="text-[22px] font-bold tracking-[2px]" style={{ fontFamily: 'var(--font-mono)', color: accentColor }}>
                  {activeContact.phone}
                </p>
              </motion.div>

              {/* Call Status */}
              {isCalling && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.72 0.17 162)', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
                  <span className="text-[11px] tracking-[2px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.72 0.17 162)' }}>
                    CONNECTED — 02:34
                  </span>
                </motion.div>
              )}

              {/* Script / Notes */}
              {activeContact.notes && (
                <div className="w-full max-w-[400px] mb-6 px-4 py-3 rounded-xl"
                  style={{ background: 'oklch(0.12 0.015 260 / 60%)', border: '1px solid oklch(1 0 0 / 6%)' }}>
                  <p className="text-[9px] font-bold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                    NOTES
                  </p>
                  <p className="text-[13px]" style={{ color: 'oklch(0.7 0.015 260)' }}>{activeContact.notes}</p>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center gap-4">
                {!isCalling ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCalling(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'oklch(0.72 0.17 162)', boxShadow: '0 0 30px oklch(0.72 0.17 162 / 40%)' }}>
                    <Phone className="w-7 h-7 text-[oklch(0.03_0.015_260)]" />
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-12 h-12 rounded-full flex items-center justify-center border"
                      style={{ background: isMuted ? 'oklch(0.62 0.22 15 / 20%)' : 'oklch(0.15 0.015 260 / 60%)', borderColor: 'oklch(1 0 0 / 10%)' }}>
                      {isMuted ? <MicOff className="w-5 h-5" style={{ color: 'oklch(0.62 0.22 15)' }} /> : <Mic className="w-5 h-5" style={{ color: 'oklch(0.7 0.015 260)' }} />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEndCall}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'oklch(0.62 0.22 15)', boxShadow: '0 0 30px oklch(0.62 0.22 15 / 40%)' }}>
                      <PhoneOff className="w-7 h-7 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center border"
                      style={{ background: 'oklch(0.15 0.015 260 / 60%)', borderColor: 'oklch(1 0 0 / 10%)' }}>
                      <Volume2 className="w-5 h-5" style={{ color: 'oklch(0.7 0.015 260)' }} />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{ background: 'oklch(0.82 0.15 192 / 15%)', borderColor: 'oklch(0.82 0.15 192 / 25%)' }}>
                  <PhoneForwarded className="w-5 h-5" style={{ color: 'oklch(0.82 0.15 192)' }} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{ background: 'oklch(0.15 0.015 260 / 60%)', borderColor: 'oklch(1 0 0 / 10%)' }}>
                  <SkipForward className="w-5 h-5" style={{ color: 'oklch(0.7 0.015 260)' }} />
                </motion.button>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Contact Queue Panel */}
        <div className="flex flex-col">
          <div className="px-3 py-3 mb-2 rounded-xl flex items-center justify-between"
            style={{ background: 'oklch(0.12 0.015 260 / 50%)', border: '1px solid oklch(1 0 0 / 8%)' }}>
            <span className="text-[11px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: accentColor }}>
              Contact Queue
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}15`, color: accentColor }}>
              {contacts.length}
            </span>
          </div>

          <div className="space-y-1.5 overflow-y-auto flex-1">
            {contacts.map((contact, i) => (
              <motion.button
                key={contact.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                onClick={() => handleCall(contact)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
                  activeContact?.id === contact.id
                    ? 'border-[oklch(0.82_0.15_192/40%)] bg-[oklch(0.82_0.15_192/8%)]'
                    : 'border-[oklch(1_0_0/6%)] bg-[oklch(0.12_0.015_260/40%)] hover:bg-[oklch(0.15_0.015_260/50%)] hover:border-[oklch(1_0_0/10%)]'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: priorityDot[contact.priority] }} />
                    <span className="text-[12px] font-semibold text-white">{contact.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[oklch(0.3_0.015_260)]" />
                </div>
                <p className="text-[10px] ml-3.5 mb-1" style={{ color: 'oklch(0.5 0.015 260)' }}>{contact.company}</p>
                <div className="flex items-center gap-3 ml-3.5">
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>{contact.phone}</span>
                  <span className="text-[8px] font-bold tracking-[1px] px-1.5 py-0.5 rounded"
                    style={{ fontFamily: 'var(--font-mono)', background: `${accentColor}10`, color: `${accentColor}` }}>
                    {contact.stage.toUpperCase()}
                  </span>
                </div>
                {contact.lastCall && (
                  <p className="text-[9px] ml-3.5 mt-1 flex items-center gap-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>
                    <Clock className="w-2.5 h-2.5" /> Last: {contact.lastCall}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
