/**
 * AURORA SANCTUM — Breakdown View
 * Scene-by-scene element breakdown with categorized tags
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  Layers, Users, MapPin, Shirt, Car, Zap,
  Music, Camera, Palette, ChevronRight,
} from "lucide-react";

const categories = [
  { id: 'cast', label: 'Cast', icon: Users, color: 'oklch(0.82 0.15 192)' },
  { id: 'locations', label: 'Locations', icon: MapPin, color: 'oklch(0.72 0.17 162)' },
  { id: 'wardrobe', label: 'Wardrobe', icon: Shirt, color: 'oklch(0.62 0.24 295)' },
  { id: 'vehicles', label: 'Vehicles', icon: Car, color: 'oklch(0.82 0.15 85)' },
  { id: 'sfx', label: 'SFX', icon: Zap, color: 'oklch(0.62 0.22 15)' },
  { id: 'music', label: 'Music', icon: Music, color: 'oklch(0.62 0.18 255)' },
  { id: 'camera', label: 'Camera', icon: Camera, color: 'oklch(0.82 0.15 192)' },
  { id: 'art', label: 'Art Dept', icon: Palette, color: 'oklch(0.72 0.17 162)' },
];

const scenes = [
  {
    id: 'SC-1', title: 'INT. OFFICE — DAY', pages: '2 3/8', setting: 'INT', time: 'DAY',
    elements: {
      cast: ['Marcus', 'Elena'],
      locations: ['Corporate Office Set'],
      wardrobe: ['Marcus — Business Suit', 'Elena — Lab Coat'],
      vehicles: [],
      sfx: ['Computer screen glow'],
      camera: ['Dolly track', 'Steadicam'],
    },
  },
  {
    id: 'SC-2', title: 'EXT. ROOFTOP — NIGHT', pages: '1 5/8', setting: 'EXT', time: 'NIGHT',
    elements: {
      cast: ['Marcus', 'Agent K'],
      locations: ['Downtown Rooftop'],
      wardrobe: ['Marcus — Tactical Gear', 'Agent K — Dark Suit'],
      vehicles: ['Black SUV (background)'],
      sfx: ['Wind machine', 'Rain effects'],
      camera: ['Crane', 'Drone B-roll'],
    },
  },
  {
    id: 'SC-3', title: 'INT. LABORATORY — DAY', pages: '3 1/8', setting: 'INT', time: 'DAY',
    elements: {
      cast: ['Elena', 'Dr. Webb', 'Lab Tech #1'],
      locations: ['Laboratory Set'],
      wardrobe: ['Elena — Lab Coat', 'Dr. Webb — Scrubs', 'Lab Tech — Uniform'],
      vehicles: [],
      sfx: ['Holographic displays', 'Device activation'],
      camera: ['Macro lens', 'Slider'],
    },
  },
  {
    id: 'SC-4', title: 'EXT. WAREHOUSE — NIGHT', pages: '4 2/8', setting: 'EXT', time: 'NIGHT',
    elements: {
      cast: ['Marcus', 'Elena', 'Agent K', 'Guard #1', 'Guard #2'],
      locations: ['Industrial Warehouse'],
      wardrobe: ['All — Tactical Gear'],
      vehicles: ['Cargo Van', 'Motorcycle'],
      sfx: ['Gunfire FX', 'Explosions (practical)', 'Smoke machines'],
      camera: ['Handheld', 'Crash cam'],
    },
  },
  {
    id: 'SC-5', title: 'INT. SAFE HOUSE — DAWN', pages: '1 7/8', setting: 'INT', time: 'DAWN',
    elements: {
      cast: ['Marcus', 'Elena'],
      locations: ['Apartment Set'],
      wardrobe: ['Marcus — Casual', 'Elena — Casual'],
      vehicles: [],
      sfx: ['Window light effect'],
      camera: ['Prime lenses', 'Natural light'],
    },
  },
];

export default function BreakdownView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Category Summary */}
      <div className="grid grid-cols-8 gap-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <GlassCard key={cat.id} delay={i * 0.04}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: cat.color }} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-semibold tracking-[1px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.6 0.015 260)' }}>
                  {cat.label}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Scene Breakdowns */}
      {scenes.map((scene, si) => (
        <GlassCard key={scene.id} delay={0.3 + si * 0.08}>
          {/* Scene Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-[1px]"
                style={{
                  background: 'oklch(0.82 0.15 192 / 15%)',
                  color: 'oklch(0.82 0.15 192)',
                  border: '1px solid oklch(0.82 0.15 192 / 25%)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {scene.id}
              </span>
              <h3 className="text-[16px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
                {scene.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{
                background: scene.setting === 'INT' ? 'oklch(0.62 0.24 295 / 15%)' : 'oklch(0.72 0.17 162 / 15%)',
                color: scene.setting === 'INT' ? 'oklch(0.62 0.24 295)' : 'oklch(0.72 0.17 162)',
                fontFamily: 'var(--font-mono)',
              }}>
                {scene.setting}
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{
                background: scene.time === 'NIGHT' ? 'oklch(0.62 0.18 255 / 15%)' : 'oklch(0.82 0.15 85 / 15%)',
                color: scene.time === 'NIGHT' ? 'oklch(0.62 0.18 255)' : 'oklch(0.82 0.15 85)',
                fontFamily: 'var(--font-mono)',
              }}>
                {scene.time}
              </span>
              <span className="text-[11px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                {scene.pages} pgs
              </span>
            </div>
          </div>

          {/* Element Tags */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(scene.elements).map(([catId, items]) => {
              if (items.length === 0) return null;
              const cat = categories.find(c => c.id === catId);
              if (!cat) return null;
              const CatIcon = cat.icon;
              return (
                <div key={catId}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color }} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold tracking-[1.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: cat.color }}>
                      {cat.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item, ii) => (
                      <motion.span
                        key={ii}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + si * 0.08 + ii * 0.03 }}
                        className="px-2 py-1 rounded-md text-[10px]"
                        style={{
                          background: `${cat.color}08`,
                          border: `1px solid ${cat.color}18`,
                          color: 'oklch(0.75 0.01 260)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
