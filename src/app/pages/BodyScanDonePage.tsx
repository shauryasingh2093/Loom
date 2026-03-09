import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

/* ─── Smooth body threads ────────────────────────────────────── */
function SmoothBodyThreads() {
  return (
    <svg width="100%" height="72" viewBox="0 0 310 72" preserveAspectRatio="none">
      {[
        { d: 'M0 26 C75 20 155 32 230 26 C265 23 290 25 310 26', color: '#B84040', w: 2.4, op: 1, amp: 2.5, dur: 4.5, delay: 0 },
        { d: 'M0 38 C75 42 155 34 230 38 C265 40 290 38 310 38', color: '#B84040', w: 2, op: 0.72, amp: 2, dur: 5, delay: 0.2 },
        { d: 'M0 50 C75 46 155 54 230 50 C265 48 290 52 310 50', color: '#C86060', w: 1.5, op: 0.48, amp: 1.5, dur: 5.5, delay: 0.1 },
        { d: 'M0 62 C75 59 155 65 230 62 C265 60 290 63 310 62', color: '#D08080', w: 1.2, op: 0.25, amp: 1, dur: 6.2, delay: 0.3 },
      ].map((p, i) => (
        <motion.path
          key={i} d={p.d} stroke={p.color} strokeWidth={p.w} fill="none"
          strokeLinecap="round" opacity={p.op}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: p.op, y: [-p.amp, p.amp, -p.amp] }}
          transition={{
            pathLength: { duration: 1.1, delay: i * 0.14, ease: 'easeOut' },
            opacity: { duration: 0.7, delay: i * 0.14 },
            y: { duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export function BodyScanDonePage() {
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
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -16, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(184,64,64,0.18) 0%, transparent 70%)',
              }}
            />
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(184,64,64,0.14), rgba(200,96,96,0.18))',
              border: '2px solid rgba(184,64,64,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Three relaxing lines */}
              <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
                {[
                  { d: 'M2 5 C9 2 16 8 28 5', delay: 0.3 },
                  { d: 'M2 11 C9 8 16 14 28 11', delay: 0.42 },
                  { d: 'M2 17 C9 14 16 20 28 17', delay: 0.54 },
                ].map((line, i) => (
                  <motion.path key={i} d={line.d} stroke="#B84040" strokeWidth="2"
                    strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: line.delay, ease: 'easeOut' }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <p style={{ color: '#B84040', fontSize: '0.68rem', fontWeight: 600, marginBottom: 5 }}>Body · Scan complete</p>
          <h1 style={{
            fontFamily: "'Lora', serif", color: '#2A2218',
            fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2,
          }}>
            Body tension reduced
          </h1>
        </motion.div>

        {/* Thread visualization */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            background: 'rgba(184,64,64,0.05)',
            border: '1px solid rgba(184,64,64,0.16)',
            borderRadius: 18, padding: '14px 12px 10px',
            marginBottom: 16,
          }}
        >
          <p style={{ fontSize: '0.62rem', color: '#C89090', fontWeight: 600, marginBottom: 8, paddingLeft: 2 }}>
            Body threads — flowing smoothly
          </p>
          <SmoothBodyThreads />
        </motion.div>

        {/* Steps summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            display: 'flex', gap: 8, marginBottom: 16,
          }}
        >
          {[
            { glyph: '≈', label: 'Shoulders', color: '#B84040' },
            { glyph: '◎', label: 'Jaw', color: '#C8883A' },
            { glyph: '⌁', label: 'Breath', color: '#8858A4' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.1 }}
              style={{
                flex: 1, background: 'rgba(91,168,145,0.07)',
                border: '1px solid rgba(91,168,145,0.18)',
                borderRadius: 12, padding: '8px 6px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#5BA891' }}>✓</span>
              <span style={{ fontSize: '0.6rem', color: '#5BA891', fontWeight: 600 }}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(184,64,64,0.1)',
            borderRadius: 16, padding: '16px 18px',
            marginBottom: 24,
          }}
        >
          <p style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic',
            color: '#5A3A3A', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 6,
          }}>
            "Your body threads have loosened and your weave is stabilizing."
          </p>
          <p style={{ color: '#C89090', fontSize: '0.66rem', fontWeight: 500 }}>— Loom</p>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => navigate('/dashboard')}
          style={{
            width: '100%', padding: '15px 0', borderRadius: 16,
            background: 'linear-gradient(135deg, #B84040 0%, #943232 100%)',
            color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: '0.92rem',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(184,64,64,0.26)',
            marginBottom: 16,
          }}
        >
          Return to weave
        </motion.button>
      </div>
    </div>
  );
}
