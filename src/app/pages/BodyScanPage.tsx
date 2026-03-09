import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLoom } from '../context/LoomContext';

/* ─── Body thread visualisation ────────────────────────────── */
function BodyThreads({ tense }: { tense: boolean }) {
  if (!tense) {
    // Loosening — smooth
    return (
      <svg width="100%" height="68" viewBox="0 0 310 68" preserveAspectRatio="none">
        {[
          { d: 'M0 28 C75 22 155 34 230 28 C265 25 290 27 310 28', color: '#B84040', w: 2.2, op: 1, amp: 2, dur: 4.5, delay: 0 },
          { d: 'M0 40 C75 44 155 36 230 40 C265 42 290 40 310 40', color: '#B84040', w: 1.8, op: 0.7, amp: 1.5, dur: 5, delay: 0.2 },
          { d: 'M0 52 C75 48 155 56 230 52 C265 50 290 54 310 52', color: '#C86060', w: 1.4, op: 0.45, amp: 1, dur: 5.5, delay: 0.1 },
        ].map((p, i) => (
          <motion.path key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
            strokeLinecap="round" opacity={p.op}
            animate={{ y: [-p.amp, p.amp, -p.amp] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </svg>
    );
  }

  // Tense — high-frequency, crossing paths
  return (
    <svg width="100%" height="68" viewBox="0 0 310 68" preserveAspectRatio="none">
      {[
        {
          d: 'M0 28 C16 14 30 42 46 24 C62 8 76 40 92 24 C108 8 122 40 138 24 C154 8 168 40 184 24 C200 8 214 40 230 24 C246 10 260 38 276 24 C290 12 302 32 310 26',
          color: '#B84040', w: 2, op: 1, amp: 3.5, dur: 1.8, delay: 0,
        },
        {
          d: 'M0 44 C16 58 30 28 46 48 C62 66 76 32 92 50 C108 66 122 32 138 50 C154 66 168 32 184 50 C200 66 214 34 230 52 C246 66 260 38 276 52 C290 62 302 46 310 50',
          color: '#B84040', w: 1.8, op: 0.75, amp: 3, dur: 2.2, delay: 0.3,
        },
        {
          d: 'M0 36 C14 48 26 22 40 36 C54 50 66 22 80 36 C94 50 108 22 122 36 C136 50 150 22 164 36 C178 50 192 22 206 36 C220 50 234 22 248 36 C262 50 276 24 290 36 C300 46 306 32 310 34',
          color: '#C86060', w: 1.5, op: 0.5, amp: 2.5, dur: 2.6, delay: 0.15,
        },
      ].map((p, i) => (
        <motion.path key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
          strokeLinecap="round" opacity={p.op}
          animate={{ y: [-p.amp, p.amp, -p.amp] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </svg>
  );
}

/* ─── Step data ─────────────────────────────────────────────── */
const STEPS = [
  {
    glyph: '≈',
    title: 'Relax your shoulders',
    detail: 'Let them drop away from your ears and soften.',
    color: '#B84040',
    bg: 'rgba(184,64,64,0.08)',
    border: 'rgba(184,64,64,0.18)',
  },
  {
    glyph: '◎',
    title: 'Release jaw tension',
    detail: 'Let your teeth part slightly and unclench.',
    color: '#C8883A',
    bg: 'rgba(200,136,58,0.08)',
    border: 'rgba(200,136,58,0.18)',
  },
  {
    glyph: '⌁',
    title: 'Slow your breathing',
    detail: 'Breathe in for 4, hold for 2, out for 6.',
    color: '#8858A4',
    bg: 'rgba(136,88,164,0.08)',
    border: 'rgba(136,88,164,0.18)',
  },
];

/* ─── Step progress bar ─────────────────────────────────────── */
function StepBar({ progress }: { progress: number }) {
  return (
    <div style={{ height: 3, borderRadius: 100, background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
        style={{ height: '100%', background: '#B84040', borderRadius: 100 }}
      />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export function BodyScanPage() {
  const navigate = useNavigate();
  const { resolveStress } = useLoom();

  // scanStep: -1 = idle, 0/1/2 = active, 3 = done
  const [scanStep, setScanStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState(0);
  const STEP_MS = 2500;

  // Drive each step's progress bar, then advance
  useEffect(() => {
    if (scanStep < 0) return;
    if (scanStep >= 3) {
      resolveStress();
      navigate('/body-scan-done');
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const p = Math.min((performance.now() - start) / STEP_MS, 1);
      setStepProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setScanStep(s => s + 1);
        setStepProgress(0);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [scanStep]);

  const isActive = scanStep >= 0;

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
          <p style={{ color: '#B84040', fontSize: '0.68rem', fontWeight: 600, marginBottom: 1 }}>Body · 3 min scan</p>
          <h1 style={{ fontFamily: "'Lora', serif", color: '#2A2218', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 }}>
            Body Scan
          </h1>
        </div>
      </motion.div>

      <div style={{ flex: 1, overflow: 'auto', paddingLeft: 16, paddingRight: 16 }}>

        {/* Thread visual */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: isActive ? 'rgba(184,64,64,0.05)' : 'rgba(255,255,255,0.55)',
            border: `1px solid ${isActive ? 'rgba(184,64,64,0.18)' : 'rgba(0,0,0,0.05)'}`,
            borderRadius: 18, padding: '14px 12px 10px',
            marginBottom: 14, transition: 'all 0.6s ease',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: isActive ? '#C89090' : '#B84040', fontWeight: 600, marginBottom: 8, paddingLeft: 2, opacity: 0.8 }}>
            {isActive ? 'Body threads — loosening' : 'Body threads — tense'}
          </p>
          <BodyThreads tense={!isActive} />
        </motion.div>

        {/* Instruction text — only when idle */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              key="instruction"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 16, padding: '14px 16px', marginBottom: 14,
              }}
            >
              <p style={{ fontSize: '0.75rem', color: '#2A2218', lineHeight: 1.7 }}>
                Slowly scan your body from head to toe. Notice areas of tension and allow them to soften.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          {STEPS.map((step, i) => {
            const isCurrentStep = scanStep === i;
            const isDone = scanStep > i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.09 }}
                style={{
                  background: isCurrentStep
                    ? step.bg
                    : isDone
                    ? 'rgba(91,168,145,0.06)'
                    : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${isCurrentStep ? step.border : isDone ? 'rgba(91,168,145,0.18)' : 'rgba(0,0,0,0.05)'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
                  {/* Step number / done check */}
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: isDone ? 'rgba(91,168,145,0.12)' : isCurrentStep ? step.bg : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${isDone ? 'rgba(91,168,145,0.25)' : isCurrentStep ? step.border : 'rgba(0,0,0,0.06)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.95rem',
                    color: isDone ? '#5BA891' : isCurrentStep ? step.color : '#C0B4A8',
                    transition: 'all 0.4s ease',
                  }}>
                    {isDone ? '✓' : step.glyph}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '0.78rem', fontWeight: 600,
                      color: isCurrentStep ? step.color : isDone ? '#5BA891' : '#8A7E74',
                      lineHeight: 1.3, marginBottom: 3,
                      transition: 'color 0.4s ease',
                    }}>
                      {step.title}
                    </p>
                    <p style={{ fontSize: '0.68rem', color: '#9A8E82', lineHeight: 1.4 }}>
                      {step.detail}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isCurrentStep && (
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: step.color, flexShrink: 0,
                      }}
                    />
                  )}
                </div>

                {/* Progress bar — only on current step */}
                {isCurrentStep && (
                  <div style={{ paddingLeft: 14, paddingRight: 14, paddingBottom: 10 }}>
                    <StepBar progress={stepProgress} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA — only when idle */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 16 }}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setScanStep(0)}
                style={{
                  width: '100%', padding: '15px 0', borderRadius: 16,
                  background: 'linear-gradient(135deg, #B84040 0%, #943232 100%)',
                  color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: '0.92rem',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(184,64,64,0.28)',
                  marginBottom: 10,
                }}
              >
                Begin body scan
              </motion.button>

              <button
                onClick={() => navigate('/companion')}
                style={{
                  background: 'none', border: 'none',
                  color: '#B0A494', fontSize: '0.72rem', fontWeight: 500,
                  cursor: 'pointer', padding: '4px 0 8px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Skip activity
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanning message — only when active */}
        <AnimatePresence>
          {isActive && scanStep < 3 && (
            <motion.p
              key="scanning"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', fontSize: '0.72rem',
                color: '#9A8E82', fontStyle: 'italic',
                fontFamily: "'Lora', serif",
                paddingBottom: 16,
              }}
            >
              Follow each step as it guides you…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}