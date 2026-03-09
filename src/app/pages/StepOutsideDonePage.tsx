import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

/* ─── Smooth environment threads ────────────────────────────── */
function SmoothEnvThreads() {
  return (
    <svg width="100%" height="72" viewBox="0 0 310 72" preserveAspectRatio="none">
      {[
        { d: 'M0 28 C75 22 155 34 230 28 C265 25 290 27 310 28', color: '#5BA891', w: 2.4, op: 1, amp: 2.5, dur: 4.5, delay: 0 },
        { d: 'M0 40 C75 44 155 36 230 40 C265 42 290 40 310 40', color: '#5BA891', w: 2, op: 0.75, amp: 2, dur: 5, delay: 0.2 },
        { d: 'M0 52 C75 48 155 56 230 52 C265 50 290 54 310 52', color: '#7AC4AA', w: 1.5, op: 0.5, amp: 1.5, dur: 5.5, delay: 0.1 },
        { d: 'M0 20 C75 17 155 23 230 20 C265 18 290 20 310 20', color: '#A8D8CC', w: 1.2, op: 0.3, amp: 1, dur: 6, delay: 0.3 },
      ].map((p, i) => (
        <motion.path
          key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
          strokeLinecap="round" opacity={p.op}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: p.op, y: [-p.amp, p.amp, -p.amp] }}
          transition={{
            pathLength: { duration: 1.2, delay: i * 0.15, ease: 'easeOut' },
            opacity: { duration: 0.8, delay: i * 0.15 },
            y: { duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </svg>
  );
}

export function StepOutsideDonePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#F5F3E3',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ height: 64, flexShrink: 0 }} />

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', padding: '0 20px' }}>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 240, damping: 18 }}
          style={{ display: 'flex', justifyContent: 'center', paddingTop: 20, paddingBottom: 6 }}
        >
          <div style={{ position: 'relative' }}>
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -16, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(91,168,145,0.22) 0%, transparent 70%)',
              }}
            />
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(91,168,145,0.18), rgba(122,196,170,0.22))',
              border: '2px solid rgba(91,168,145,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                width="28" height="28" viewBox="0 0 28 28" fill="none"
              >
                <motion.path d="M6 14L11 19L22 9" stroke="#5BA891" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
                />
              </motion.svg>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <p style={{ color: '#5BA891', fontSize: '0.68rem', fontWeight: 600, marginBottom: 5 }}>Environment · Reset complete</p>
          <h1 style={{
            fontFamily: "'Lora', serif", color: '#2A2218',
            fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2,
          }}>
            Nice reset
          </h1>
        </motion.div>

        {/* Thread visualization */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            background: 'rgba(91,168,145,0.07)',
            border: '1px solid rgba(91,168,145,0.18)',
            borderRadius: 18, padding: '14px 12px 10px',
            marginBottom: 16,
          }}
        >
          <p style={{ fontSize: '0.62rem', color: '#8ABCB0', fontWeight: 600, marginBottom: 8, paddingLeft: 2 }}>
            Environment threads — flowing
          </p>
          <SmoothEnvThreads />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(91,168,145,0.12)',
            borderRadius: 16, padding: '16px 18px',
            marginBottom: 24,
          }}
        >
          <p style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic',
            color: '#4A8070', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 6,
          }}>
            "Your environment threads are calming. Your weave is becoming more balanced."
          </p>
          <p style={{ color: '#8ABCB0', fontSize: '0.66rem', fontWeight: 500 }}>— Loom</p>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          onClick={() => navigate('/dashboard')}
          style={{
            width: '100%', padding: '15px 0', borderRadius: 16,
            background: 'linear-gradient(135deg, #5BA891 0%, #4A9080 100%)',
            color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: '0.92rem',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(91,168,145,0.28)',
          }}
        >
          See your weave
        </motion.button>
      </div>
    </div>
  );
}
