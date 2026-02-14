/**
 * AURORA SANCTUM — Login Overlay
 * Spectacular aurora-lit login screen with glassmorphism panels
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LOGIN_AURORA_BG = "https://private-us-east-1.manuscdn.com/sessionFile/YyDUjlpPqPggQsTBWWnQPY/sandbox/gU7PsCs9JMEg6r1wTW808l-img-5_1771018934000_na1fn_bG9naW4tYXVyb3Jh.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXlEVWpscFBxUGdnUXNUQldXblFQWS9zYW5kYm94L2dVN1BzQ3M5Sk1FZzZyMXdUVzgwOGwtaW1nLTVfMTc3MTAxODkzNDAwMF9uYTFmbl9iRzluYVc0dFlYVnliM0poLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Lx2DCf45gHJUG3g6U1a1-ACeGgjlCY5Tcm7ZR~rfXpo9AX3Q4-cAn9ISI-9McpjZbBB1WC2r10d48CTwOVhipURf4ko6bZTPFan1ZxtZGodHygF1q2AeBZVpPvzSzJidXYbGTvybXiL8qfXPbgX63rHRAXojStOmKKpRXtDP-UPFX9qRpjMALr8JPXxnXUK672QMsJdsnBkyR4QneKkn7a~xlPStR3jsT-euWx02l7Sy~aFnHSePrgEGBr34rH5FIbYlFQHHhKmn~MAznyruenJ9kFEpYM-ayuhsVG0zJa0Y~NUcGlZniCD9q-q6iomo-2zKayo7fWDecRtsmXtNNA__";

interface LoginOverlayProps {
  onLogin: (mode: 'demo' | 'cloud') => void;
  visible: boolean;
}

export default function LoginOverlay({ onLogin, visible }: LoginOverlayProps) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (mode: 'demo' | 'cloud') => {
    setLoading(true);
    setStatus(mode === 'demo' ? 'Initializing demo environment...' : 'Opening authentication...');
    await new Promise(r => setTimeout(r, 800));
    setStatus('Loading production data...');
    await new Promise(r => setTimeout(r, 600));
    onLogin(mode);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${LOGIN_AURORA_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-[oklch(0.03_0.015_260/60%)]" />

          {/* Animated aurora overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, oklch(0.82 0.15 192 / 15%), transparent 50%),
                radial-gradient(circle at 70% 80%, oklch(0.62 0.24 295 / 10%), transparent 50%),
                radial-gradient(circle at 50% 50%, oklch(0.82 0.15 85 / 5%), transparent 70%)
              `,
              animation: 'pulseGlow 8s ease-in-out infinite',
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Brand */}
            <h1
              className="text-[96px] tracking-[16px] mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                textShadow: '0 0 80px oklch(0.82 0.15 192 / 50%)',
              }}
            >
              <span style={{ color: 'oklch(0.82 0.15 192)', animation: 'pulseGlow 3s ease-in-out infinite' }}>DC</span>
              {' '}
              <span className="text-white" style={{ textShadow: '0 0 40px oklch(1 0 0 / 30%)' }}>ALACRITY</span>
            </h1>

            <p
              className="text-[12px] tracking-[6px] mb-12"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'oklch(0.6 0.015 260)',
                textShadow: '0 0 20px oklch(0.82 0.15 192 / 30%)',
              }}
            >
              <span style={{ color: 'oklch(0.82 0.15 192 / 30%)' }}>━━━━━</span>
              {' '}PRODUCTION COMMAND SYSTEM{' '}
              <span style={{ color: 'oklch(0.82 0.15 192 / 30%)' }}>━━━━━</span>
            </p>

            {/* Login Buttons */}
            <div className="flex gap-8 mb-6">
              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLogin('demo')}
                disabled={loading}
                className="relative min-w-[280px] px-10 py-8 rounded-2xl text-center overflow-hidden transition-all duration-400 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.75 0.15 55 / 12%), oklch(0.75 0.15 55 / 4%))',
                  border: '2px solid oklch(0.75 0.15 55)',
                  color: 'oklch(0.75 0.15 55)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  boxShadow: '0 8px 32px oklch(0.75 0.15 55 / 20%)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, oklch(0.75 0.15 55), oklch(0.65 0.15 55))';
                  e.currentTarget.style.color = 'oklch(0.03 0.015 260)';
                  e.currentTarget.style.boxShadow = '0 16px 64px oklch(0.75 0.15 55 / 50%), 0 0 80px oklch(0.75 0.15 55 / 30%)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, oklch(0.75 0.15 55 / 12%), oklch(0.75 0.15 55 / 4%))';
                  e.currentTarget.style.color = 'oklch(0.75 0.15 55)';
                  e.currentTarget.style.boxShadow = '0 8px 32px oklch(0.75 0.15 55 / 20%)';
                  e.currentTarget.style.borderColor = 'oklch(0.75 0.15 55)';
                }}
              >
                DEMO MODE
                <div className="text-[10px] font-medium tracking-[2px] mt-2 opacity-70">
                  EXPLORE LOCALLY
                </div>
              </motion.button>

              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLogin('cloud')}
                disabled={loading}
                className="relative min-w-[280px] px-10 py-8 rounded-2xl text-center overflow-hidden transition-all duration-400 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.72 0.17 162 / 12%), oklch(0.72 0.17 162 / 4%))',
                  border: '2px solid oklch(0.72 0.17 162)',
                  color: 'oklch(0.72 0.17 162)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  boxShadow: '0 8px 32px oklch(0.72 0.17 162 / 20%)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, oklch(0.72 0.17 162), oklch(0.62 0.17 162))';
                  e.currentTarget.style.color = 'oklch(0.03 0.015 260)';
                  e.currentTarget.style.boxShadow = '0 16px 64px oklch(0.72 0.17 162 / 50%), 0 0 80px oklch(0.72 0.17 162 / 30%)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, oklch(0.72 0.17 162 / 12%), oklch(0.72 0.17 162 / 4%))';
                  e.currentTarget.style.color = 'oklch(0.72 0.17 162)';
                  e.currentTarget.style.boxShadow = '0 8px 32px oklch(0.72 0.17 162 / 20%)';
                  e.currentTarget.style.borderColor = 'oklch(0.72 0.17 162)';
                }}
              >
                CLOUD SYNC
                <div className="text-[10px] font-medium tracking-[2px] mt-2 opacity-70">
                  GOOGLE SIGN-IN
                </div>
              </motion.button>
            </div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="max-w-[700px] text-center px-8 py-6 rounded-xl"
              style={{
                background: 'oklch(0.1 0.015 260 / 60%)',
                border: '1px solid oklch(1 0 0 / 8%)',
                backdropFilter: 'blur(16px)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'oklch(0.5 0.015 260)',
                lineHeight: 1.8,
              }}
            >
              <strong className="text-[oklch(0.85_0.005_260)] font-bold tracking-[1px]">Demo Mode</strong> runs entirely in your browser.{' '}
              <strong className="text-[oklch(0.85_0.005_260)] font-bold tracking-[1px]">Cloud Sync</strong> saves to Firebase with Google authentication.
            </motion.div>

            {/* Status */}
            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-[11px] tracking-[2px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'oklch(0.82 0.15 192)',
                  textShadow: '0 0 20px oklch(0.82 0.15 192 / 50%)',
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    background: 'oklch(0.82 0.15 192)',
                    animation: 'pulseGlow 1.5s ease-in-out infinite',
                  }}
                />
                {status}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
