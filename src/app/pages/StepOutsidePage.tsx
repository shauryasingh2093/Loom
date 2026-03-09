import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLoom } from '../context/LoomContext';

/* ─── Environment thread visualisation ─────────────────────── */
function EnvThreads({ calm }: { calm: boolean }) {
  if (calm) {
    // Smooth, flowing threads
    return (
      <svg width="100%" height="68" viewBox="0 0 310 68" preserveAspectRatio="none">
        {[
          { d: 'M0 30 C75 24 155 36 230 30 C265 27 290 29 310 30', color: '#5BA891', w: 2.2, delay: 0, amp: 2, dur: 4.5 },
          { d: 'M0 42 C75 46 155 38 230 42 C265 44 290 42 310 42', color: '#5BA891', w: 1.8, delay: 0.25, amp: 1.5, dur: 5, op: 0.7 },
          { d: 'M0 52 C75 48 155 56 230 52 C265 50 290 53 310 52', color: '#7AC4AA', w: 1.4, delay: 0.12, amp: 1, dur: 5.5, op: 0.5 },
        ].map((p, i) => (
          <motion.path key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
            strokeLinecap="round" opacity={p.op ?? 1}
            animate={{ y: [-p.amp, p.amp, -p.amp] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </svg>
    );
  }

  // Slightly tangled — beginning to relax
  return (
    <svg width="100%" height="68" viewBox="0 0 310 68" preserveAspectRatio="none">
      {[
        { d: 'M0 34 C22 16 44 52 66 30 C88 10 110 48 132 28 C154 10 176 48 198 28 C220 10 242 46 264 28 C284 14 298 36 310 28', color: '#5BA891', w: 2, delay: 0, amp: 4, dur: 2.8 },
        { d: 'M0 44 C22 62 44 24 66 46 C88 68 110 28 132 50 C154 70 176 30 198 52 C220 72 242 34 264 52 C284 66 298 46 310 50', color: '#5BA891', w: 1.7, delay: 0.4, amp: 3, dur: 3.2, op: 0.72 },
        { d: 'M0 24 C18 38 36 10 54 26 C72 42 90 14 108 28 C126 42 144 16 162 30 C180 44 198 18 216 32 C234 46 252 20 270 32 C290 44 302 26 310 28', color: '#7AC4AA', w: 1.5, delay: 0.2, amp: 2.5, dur: 3.6, op: 0.6 },
      ].map((p, i) => (
        <motion.path key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
          strokeLinecap="round" opacity={p.op ?? 1}
          animate={{ y: [-p.amp, p.amp, -p.amp] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </svg>
  );
}

/* ─── Circular countdown ring ───────────────────────────────── */
const R = 46;
const CIRC = 2 * Math.PI * R;

function CountdownRing({ progress, seconds }: { progress: number; seconds: number }) {
  const offset = CIRC * (1 - progress);
  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
        {/* Track */}
        <circle cx="60" cy="60" r={R} stroke="rgba(91,168,145,0.15)" strokeWidth="5" fill="none" />
        {/* Progress */}
        <circle cx="60" cy="60" r={R}
          stroke="#5BA891" strokeWidth="5" fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      {/* Center text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 0,
      }}>
        <span style={{ fontFamily: "'Lora', serif", fontSize: '1.6rem', color: '#2A2218', fontWeight: 500, lineHeight: 1 }}>
          {seconds}
        </span>
        <span style={{ fontSize: '0.58rem', color: '#8ABCB0', fontWeight: 600, letterSpacing: '0.05em', marginTop: 2 }}>SEC</span>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export function StepOutsidePage() {
  const navigate = useNavigate();
  const { resolveStress } = useLoom();
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 5000;

  const secondsLeft = Math.ceil((1 - progress) * 5);

  useEffect(() => {
    if (!started) return;
    startRef.current = performance.now();

    const tick = () => {
      const p = Math.min((performance.now() - startRef.current) / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        resolveStress();
        navigate('/step-outside-done');
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started]);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#F5F3E3',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ height: 64, flexShrink: 0 }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex', alignItems: 'center',
          paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
          flexShrink: 0, gap: 12,
        }}
      >
        <button onClick={() => navigate('/companion')}
          style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 10,
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#5A5044" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <p style={{ color: '#5BA891', fontSize: '0.68rem', fontWeight: 600, marginBottom: 1 }}>Environment · 5 min reset</p>
          <h1 style={{ fontFamily: "'Lora', serif", color: '#2A2218', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 }}>
            Step Outside
          </h1>
        </div>
      </motion.div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Thread visual */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            margin: '0 16px 14px',
            background: started ? 'rgba(91,168,145,0.06)' : 'rgba(255,255,255,0.55)',
            border: `1px solid ${started ? 'rgba(91,168,145,0.2)' : 'rgba(0,0,0,0.05)'}`,
            borderRadius: 18, padding: '14px 12px 10px',
            transition: 'all 0.6s ease',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: '#8ABCB0', fontWeight: 600, marginBottom: 8, paddingLeft: 2 }}>
            {started ? 'Environment threads — calming' : 'Environment threads — settling'}
          </p>
          <EnvThreads calm={started} />
        </motion.div>

        <AnimatePresence mode="wait">
          {!started ? (
            /* ── Guidance state ── */
            <motion.div key="guidance"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ paddingLeft: 16, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {/* Instruction card */}
              <div style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 18, padding: '16px 18px',
              }}>
                <p style={{ fontSize: '0.75rem', color: '#2A2218', lineHeight: 1.7, marginBottom: 0 }}>
                  A short change of environment can calm your sensory threads.
                  Step outside, take a few slow breaths, and notice the air and sounds around you.
                </p>
              </div>

              {/* Steps */}
              {[
                { glyph: '≈', color: '#5BA891', text: 'Find a door or window — go outside if you can' },
                { glyph: '◎', color: '#5BA891', text: 'Take three slow, deep breaths' },
                { glyph: '✦', color: '#5BA891', text: 'Notice the air, sounds, and space around you' },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(91,168,145,0.06)',
                    border: '1px solid rgba(91,168,145,0.14)',
                    borderRadius: 14, padding: '11px 14px',
                  }}
                >
                  <span style={{ fontSize: '1rem', color: step.color, width: 20, textAlign: 'center', flexShrink: 0 }}>{step.glyph}</span>
                  <p style={{ fontSize: '0.73rem', color: '#5A5044', lineHeight: 1.5 }}>{step.text}</p>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStarted(true)}
                style={{
                  width: '100%', padding: '15px 0', borderRadius: 16, marginTop: 4,
                  background: 'linear-gradient(135deg, #5BA891 0%, #4A9080 100%)',
                  color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: '0.92rem',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(91,168,145,0.3)',
                }}
              >
                Start reset
              </motion.button>

              <button
                onClick={() => navigate('/companion')}
                style={{
                  background: 'none', border: 'none',
                  color: '#B0A494', fontSize: '0.72rem', fontWeight: 500,
                  cursor: 'pointer', padding: '4px 0 16px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Skip activity
              </button>
            </motion.div>

          ) : (
            /* ── Active / timer state ── */
            <motion.div key="active"
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
              style={{
                paddingLeft: 16, paddingRight: 16,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 16,
              }}
            >
              {/* Countdown ring */}
              <CountdownRing progress={progress} seconds={secondsLeft} />

              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: 'italic',
                  color: '#4A8070', fontSize: '0.9rem', lineHeight: 1.7,
                }}>
                  "Step outside now.<br />Let your environment threads breathe."
                </p>
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i}
                    style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: progress * 5 > i ? '#5BA891' : 'rgba(91,168,145,0.2)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate('/companion')}
                style={{
                  background: 'none', border: 'none',
                  color: '#B0A494', fontSize: '0.7rem', fontWeight: 500,
                  cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                End early
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
