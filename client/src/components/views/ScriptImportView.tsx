/**
 * AURORA SANCTUM — Script Import View
 * Import & parse screenplay files with auto-breakdown
 */
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Upload, FileText, Zap, Eye, Check, AlertCircle,
  Film, MapPin, Sun, Moon, Users, Hash,
} from "lucide-react";

interface DetectedScene {
  number: number;
  intExt: string;
  location: string;
  dayNight: string;
  description: string;
  cast: string[];
  pageEstimate: string;
}

const sampleScript = `INT. COFFEE SHOP - DAY

MARCUS enters the busy coffee shop and looks around nervously. He spots ELENA sitting in the corner booth.

MARCUS
I need to find her before they do.

ELENA
(looking up from her laptop)
You're late. Again.

EXT. CITY STREET - NIGHT

Rain pours down as MARCUS runs through the empty streets. A black sedan follows slowly behind.

AGENT K
(into radio)
Target is on the move. Heading north on 5th.

INT. LABORATORY - DAY

DR. WEBB adjusts the controls on a massive device. Screens flicker with data.

DR. WEBB
The readings are off the charts. If we activate it now—

MARCUS
(bursting through the door)
Don't touch that switch!

EXT. ROOFTOP - NIGHT

ELENA and MARCUS stand at the edge, looking out over the city. The wind whips around them.

ELENA
There's no going back after this.

MARCUS
I know.

INT. WAREHOUSE - NIGHT

The final confrontation. MARCUS, ELENA, AGENT K, and DR. WEBB face each other in the dim light.`;

const detectedScenes: DetectedScene[] = [
  { number: 1, intExt: 'INT', location: 'COFFEE SHOP', dayNight: 'DAY', description: 'Marcus enters, spots Elena in corner booth', cast: ['Marcus', 'Elena'], pageEstimate: '1 4/8' },
  { number: 2, intExt: 'EXT', location: 'CITY STREET', dayNight: 'NIGHT', description: 'Marcus runs through rain, black sedan follows', cast: ['Marcus', 'Agent K'], pageEstimate: '1 2/8' },
  { number: 3, intExt: 'INT', location: 'LABORATORY', dayNight: 'DAY', description: 'Dr. Webb at controls, Marcus bursts in', cast: ['Marcus', 'Dr. Webb'], pageEstimate: '1 6/8' },
  { number: 4, intExt: 'EXT', location: 'ROOFTOP', dayNight: 'NIGHT', description: 'Elena and Marcus overlook city', cast: ['Marcus', 'Elena'], pageEstimate: '0 6/8' },
  { number: 5, intExt: 'INT', location: 'WAREHOUSE', dayNight: 'NIGHT', description: 'Final confrontation between all characters', cast: ['Marcus', 'Elena', 'Agent K', 'Dr. Webb'], pageEstimate: '2 0/8' },
];

const dayNightColors: Record<string, string> = {
  DAY: 'oklch(0.82 0.15 85)',
  NIGHT: 'oklch(0.62 0.24 295)',
};

export default function ScriptImportView() {
  const [scriptText, setScriptText] = useState(sampleScript);
  const [isParsed, setIsParsed] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleParse = () => {
    setIsParsed(true);
  };

  const handleImport = async () => {
    setIsImporting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsImporting(false);
  };

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
              Script Import Tool
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[1px] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
              <FileText className="w-3.5 h-3.5" /> Supports FDX, PDF, Plain Text
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Import Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Script Input */}
        <GlassCard delay={0.1} hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold tracking-[1px] text-white" style={{ fontFamily: 'var(--font-grotesk)' }}>
              Script Text
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-[1px] border border-[oklch(1_0_0/8%)] bg-[oklch(0.15_0.015_260/40%)] text-[oklch(0.6_0.015_260)] hover:bg-[oklch(0.2_0.015_260/40%)] transition-all"
                style={{ fontFamily: 'var(--font-mono)' }}>
                <Upload className="w-3 h-3" /> UPLOAD FILE
              </button>
            </div>
          </div>
          <p className="text-[11px] mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
            Paste your screenplay text below. The system will automatically detect scenes using standard format (INT./EXT. LOCATION - DAY/NIGHT).
          </p>
          <textarea
            value={scriptText}
            onChange={(e) => { setScriptText(e.target.value); setIsParsed(false); }}
            className="w-full rounded-xl p-4 text-[12px] leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-[oklch(0.82_0.15_192/40%)]"
            style={{
              minHeight: '350px',
              background: 'oklch(0.08 0.01 260 / 80%)',
              border: '1px solid oklch(1 0 0 / 8%)',
              fontFamily: 'var(--font-mono)',
              color: 'oklch(0.75 0.01 260)',
            }}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleParse}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-[1px] transition-all"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'oklch(0.82 0.15 192 / 15%)',
                color: 'oklch(0.82 0.15 192)',
                border: '1px solid oklch(0.82 0.15 192 / 25%)',
              }}>
              <Eye className="w-3.5 h-3.5" /> PREVIEW DETECTION
            </button>
            <button
              onClick={handleImport}
              disabled={!isParsed || isImporting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-[1px] transition-all disabled:opacity-40"
              style={{
                fontFamily: 'var(--font-mono)',
                background: isParsed ? 'oklch(0.72 0.17 162 / 15%)' : 'oklch(0.15 0.015 260 / 40%)',
                color: isParsed ? 'oklch(0.72 0.17 162)' : 'oklch(0.5 0.015 260)',
                border: `1px solid ${isParsed ? 'oklch(0.72 0.17 162 / 25%)' : 'oklch(1 0 0 / 8%)'}`,
              }}>
              <Zap className="w-3.5 h-3.5" /> {isImporting ? 'IMPORTING...' : 'IMPORT SCRIPT'}
            </button>
          </div>
        </GlassCard>

        {/* Detection Results */}
        <div className="space-y-4">
          {/* Detection Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Scenes Detected', value: isParsed ? '5' : '—', color: 'oklch(0.82 0.15 192)' },
              { label: 'Total Pages', value: isParsed ? '7 2/8' : '—', color: 'oklch(0.62 0.24 295)' },
              { label: 'Cast Members', value: isParsed ? '4' : '—', color: 'oklch(0.72 0.17 162)' },
            ].map((stat, i) => (
              <GlassCard key={stat.label} delay={0.15 + i * 0.04} className="!p-3">
                <p className="text-[9px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                  {stat.label}
                </p>
                <p className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-grotesk)', color: stat.color }}>
                  {stat.value}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Scene List */}
          <GlassCard delay={0.25} hover={false}>
            <h3 className="text-[14px] font-semibold tracking-[1px] text-white mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>
              Detected Scenes
            </h3>

            {!isParsed ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-10 h-10 mb-3" style={{ color: 'oklch(0.4 0.015 260)' }} strokeWidth={1.5} />
                <p className="text-[12px] tracking-[1px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.015 260)' }}>
                  Click "Preview Detection" to analyze script
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {detectedScenes.map((scene, i) => (
                  <motion.div
                    key={scene.number}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="p-3 rounded-xl border border-[oklch(1_0_0/6%)] bg-[oklch(0.1_0.015_260/40%)] hover:bg-[oklch(0.12_0.015_260/50%)] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[12px] font-bold px-2 py-0.5 rounded"
                        style={{ fontFamily: 'var(--font-mono)', background: 'oklch(0.82 0.15 192 / 15%)', color: 'oklch(0.82 0.15 192)' }}>
                        <Hash className="w-3 h-3 inline" />{scene.number}
                      </span>
                      <span className="text-[10px] font-bold tracking-[1px] px-2 py-0.5 rounded"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: scene.intExt === 'INT' ? 'oklch(0.62 0.18 255 / 15%)' : 'oklch(0.72 0.17 162 / 15%)',
                          color: scene.intExt === 'INT' ? 'oklch(0.62 0.18 255)' : 'oklch(0.72 0.17 162)',
                        }}>
                        {scene.intExt}
                      </span>
                      <span className="text-[12px] font-semibold text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3" style={{ color: 'oklch(0.5 0.015 260)' }} />
                        {scene.location}
                      </span>
                      <span className="text-[10px] font-bold tracking-[1px]"
                        style={{ fontFamily: 'var(--font-mono)', color: dayNightColors[scene.dayNight] || 'oklch(0.6 0.015 260)' }}>
                        {scene.dayNight === 'DAY' ? <Sun className="w-3 h-3 inline mr-0.5" /> : <Moon className="w-3 h-3 inline mr-0.5" />}
                        {scene.dayNight}
                      </span>
                    </div>
                    <p className="text-[11px] mb-2" style={{ color: 'oklch(0.65 0.01 260)' }}>{scene.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] flex items-center gap-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                        <Users className="w-3 h-3" /> {scene.cast.join(', ')}
                      </span>
                      <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.5 0.015 260)' }}>
                        <Film className="w-3 h-3 inline mr-0.5" /> {scene.pageEstimate} pg
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
