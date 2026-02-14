/**
 * AURORA SANCTUM — Shoot Days View
 * Daily shoot planning & call sheet management
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { CalendarDays, Sun, Moon, Sunrise, MapPin, Clock, Users } from "lucide-react";

const shootDays = [
  {
    day: 1, date: 'Mar 1, 2026', callTime: '6:00 AM', wrapTime: '6:00 PM',
    location: 'Corporate Office Set — Stage 3', scenes: ['SC-1A', 'SC-1B', 'SC-1C'],
    status: 'scheduled', weather: 'INT', cast: 4, crew: 18,
    notes: 'First day — allow extra time for setup',
  },
  {
    day: 2, date: 'Mar 2, 2026', callTime: '7:00 AM', wrapTime: '7:00 PM',
    location: 'Corporate Office Set — Stage 3', scenes: ['SC-1D', 'SC-1E'],
    status: 'scheduled', weather: 'INT', cast: 3, crew: 18,
    notes: 'Continue office coverage',
  },
  {
    day: 3, date: 'Mar 4, 2026', callTime: '5:30 AM', wrapTime: '5:30 PM',
    location: 'Laboratory Set — Stage 5', scenes: ['SC-3A', 'SC-3B', 'SC-3C'],
    status: 'scheduled', weather: 'INT', cast: 5, crew: 22,
    notes: 'Practical effects — holographic device',
  },
  {
    day: 4, date: 'Mar 5, 2026', callTime: '6:00 AM', wrapTime: '8:00 PM',
    location: 'Laboratory Set — Stage 5', scenes: ['SC-3D', 'SC-3E'],
    status: 'scheduled', weather: 'INT', cast: 3, crew: 20,
    notes: 'Macro lens work — device activation sequence',
  },
  {
    day: 5, date: 'Mar 7, 2026', callTime: '2:00 PM', wrapTime: '2:00 AM',
    location: 'Downtown Rooftop — 5th & Main', scenes: ['SC-2A', 'SC-2B'],
    status: 'scheduled', weather: 'EXT/NIGHT', cast: 3, crew: 25,
    notes: 'Night shoot — rain machines on standby',
  },
  {
    day: 6, date: 'Mar 8, 2026', callTime: '3:00 PM', wrapTime: '3:00 AM',
    location: 'Downtown Rooftop — 5th & Main', scenes: ['SC-2C', 'SC-2D'],
    status: 'scheduled', weather: 'EXT/NIGHT', cast: 2, crew: 25,
    notes: 'Night shoot continued — stunt coordination',
  },
  {
    day: 7, date: 'Mar 10, 2026', callTime: '4:00 PM', wrapTime: '4:00 AM',
    location: 'Industrial Warehouse — Eastside', scenes: ['SC-4A', 'SC-4B'],
    status: 'tentative', weather: 'EXT/NIGHT', cast: 6, crew: 30,
    notes: 'Stunt day — pyrotechnics, additional safety crew',
  },
  {
    day: 8, date: 'Mar 11, 2026', callTime: '4:00 PM', wrapTime: '4:00 AM',
    location: 'Industrial Warehouse — Eastside', scenes: ['SC-4C', 'SC-4D', 'SC-4E'],
    status: 'tentative', weather: 'EXT/NIGHT', cast: 5, crew: 30,
    notes: 'Stunt day 2 — vehicle work',
  },
  {
    day: 9, date: 'Mar 14, 2026', callTime: '4:30 AM', wrapTime: '8:00 AM',
    location: 'Apartment Set — Stage 2', scenes: ['SC-5A', 'SC-5B'],
    status: 'tentative', weather: 'INT/DAWN', cast: 2, crew: 12,
    notes: 'Dawn shoot — natural light, minimal crew',
  },
  {
    day: 10, date: 'Mar 15, 2026', callTime: '7:00 AM', wrapTime: '5:00 PM',
    location: 'Various — Pickup shots', scenes: ['SC-1F', 'SC-3F'],
    status: 'tentative', weather: 'INT', cast: 4, crew: 15,
    notes: 'Pickup day — inserts, cutaways, B-roll',
  },
  {
    day: 11, date: 'Mar 17, 2026', callTime: '3:00 PM', wrapTime: '3:00 AM',
    location: 'Downtown Rooftop — 5th & Main', scenes: ['SC-2E'],
    status: 'tentative', weather: 'EXT/NIGHT', cast: 3, crew: 28,
    notes: 'Climax sequence — crane + drone',
  },
  {
    day: 12, date: 'Mar 18, 2026', callTime: '8:00 AM', wrapTime: '6:00 PM',
    location: 'Various', scenes: ['Pickups'],
    status: 'tentative', weather: 'INT/EXT', cast: 6, crew: 20,
    notes: 'WRAP DAY — final pickups + wrap party',
  },
];

const statusColors = {
  scheduled: { bg: 'oklch(0.72 0.17 162 / 15%)', color: 'oklch(0.72 0.17 162)', label: 'SCHEDULED' },
  tentative: { bg: 'oklch(0.82 0.15 85 / 15%)', color: 'oklch(0.82 0.15 85)', label: 'TENTATIVE' },
};

export default function ShootDaysView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Shoot Days', value: '12', accent: 'oklch(0.82 0.15 192)' },
          { label: 'Scheduled', value: '6', accent: 'oklch(0.72 0.17 162)' },
          { label: 'Night Shoots', value: '5', accent: 'oklch(0.62 0.18 255)' },
          { label: 'Stunt Days', value: '2', accent: 'oklch(0.62 0.22 15)' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.06}>
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.015 260)' }}>
              {stat.label}
            </p>
            <p className="text-[28px] font-bold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Shoot Day Cards */}
      <div className="grid grid-cols-2 gap-4">
        {shootDays.map((day, i) => {
          const sc = statusColors[day.status as keyof typeof statusColors];
          const isNight = day.weather.includes('NIGHT');
          const isDawn = day.weather.includes('DAWN');
          const TimeIcon = isNight ? Moon : isDawn ? Sunrise : Sun;
          const timeColor = isNight ? 'oklch(0.62 0.18 255)' : isDawn ? 'oklch(0.82 0.15 85)' : 'oklch(0.82 0.15 192)';

          return (
            <GlassCard key={day.day} delay={0.3 + i * 0.04}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[16px] font-bold"
                    style={{
                      background: `${timeColor}12`,
                      border: `1px solid ${timeColor}25`,
                      color: timeColor,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {day.day}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                      Day {day.day}
                    </p>
                    <p className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                      {day.date}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold" style={{
                  background: sc.bg,
                  color: sc.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {sc.label}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.72 0.17 162)' }} strokeWidth={1.5} />
                <span className="text-[11px] truncate" style={{ color: 'oklch(0.7 0.015 260)' }}>
                  {day.location}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" style={{ color: 'oklch(0.5 0.015 260)' }} strokeWidth={1.5} />
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>
                    {day.callTime} — {day.wrapTime}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TimeIcon className="w-3 h-3" style={{ color: timeColor }} strokeWidth={1.5} />
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: timeColor }}>
                    {day.weather}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" style={{ color: 'oklch(0.82 0.15 192)' }} strokeWidth={1.5} />
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>
                    {day.cast} cast
                  </span>
                </div>
                <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.4 0.015 260)' }}>|</span>
                <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>
                  {day.crew} crew
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {day.scenes.map(s => (
                  <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{
                    background: 'oklch(0.82 0.15 192 / 10%)',
                    color: 'oklch(0.82 0.15 192)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-[10px] italic" style={{ color: 'oklch(0.5 0.015 260)' }}>
                {day.notes}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
