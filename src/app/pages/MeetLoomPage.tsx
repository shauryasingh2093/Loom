import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';

/* ─── Animated thread knot ──────────────────────────────────── */
function LoomKnot() {
  return (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(136,88,164,0.18) 0%, rgba(91,168,145,0.1) 50%, transparent 70%)',
        }}
      />
      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: '1px solid rgba(136,88,164,0.15)',
        }}
      />
      {/* Thread SVG */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Thread 1 — Mind (purple) */}
        <motion.path
          d="M 20 80 Q 50 20 80 80 Q 110 140 140 80"
          stroke="#8858A4"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Thread 2 — Environment (sage) */}
        <motion.path
          d="M 80 18 Q 140 50 80 80 Q 20 110 80 142"
          stroke="#5BA891"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Thread 3 — Body (coral) */}
        <motion.path
          d="M 22 52 Q 80 80 138 52"
          stroke="#B84040"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Thread 4 — Gold (balance) */}
        <motion.path
          d="M 22 108 Q 80 80 138 108"
          stroke="#C8883A"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cross thread */}
        <motion.path
          d="M 40 32 Q 80 80 120 128"
          stroke="#8858A4"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 120 32 Q 80 80 40 128"
          stroke="#5BA891"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Central knot dot */}
        <motion.circle
          cx="80"
          cy="80"
          r="5"
          fill="#F5F3E3"
          stroke="#C8883A"
          strokeWidth="1.8"
          animate={{ r: [5, 6.5, 5], opacity: [1, 0.7, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

/* ─── Feature list item ─────────────────────────────────────── */
function Feature({ glyph, color, text }: { glyph: string; color: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: `${color}14`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.78rem',
        color,
        flexShrink: 0,
        marginTop: 1,
      }}>
        {glyph}
      </div>
      <p style={{ fontSize: '0.75rem', color: '#5A5044', lineHeight: 1.55, paddingTop: 4 }}>
        {text}
      </p>
    </div>
  );
}

export function MeetLoomPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#F5F3E3',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Safe area */}
      <div style={{ height: 64, flexShrink: 0 }} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Thread knot visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 16,
            paddingBottom: 8,
            flexShrink: 0,
          }}
        >
          <LoomKnot />
        </motion.div>

        {/* Title + message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: 'center',
            paddingLeft: 28,
            paddingRight: 28,
            flexShrink: 0,
          }}
        >
          <p style={{ color: '#AFA090', fontSize: '0.7rem', fontWeight: 500, marginBottom: 4 }}>
            Your thread companion
          </p>
          <h1 style={{
            fontFamily: "'Lora', serif",
            color: '#2A2218',
            fontSize: '1.55rem',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: 14,
          }}>
            Meet Loom
          </h1>
          <div style={{
            background: 'rgba(200,136,58,0.07)',
            border: '1px solid rgba(200,136,58,0.2)',
            borderRadius: 16,
            padding: '14px 18px',
            marginBottom: 18,
          }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              color: '#5A4830',
              fontSize: '0.9rem',
              lineHeight: 1.7,
            }}>
              "I help you notice when your threads begin to tighten and guide you back to balance."
            </p>
            <p style={{ color: '#B89060', fontSize: '0.66rem', marginTop: 7, fontWeight: 500 }}>— Loom</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            paddingLeft: 22,
            paddingRight: 22,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <Feature
            glyph="⌁"
            color="#8858A4"
            text="Senses when your mind, body, and environment threads shift out of alignment."
          />
          <Feature
            glyph="≈"
            color="#5BA891"
            text="Offers gentle prompts and micro-activities to untangle tightened threads."
          />
          <Feature
            glyph="✦"
            color="#C8883A"
            text="Learns your patterns over time and surfaces insights unique to your weave."
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            padding: '20px 22px 10px',
            flexShrink: 0,
          }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/companion')}
            style={{
              width: '100%',
              padding: '15px 0',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #C8883A 0%, #8858A4 100%)',
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(136,88,164,0.28)',
            }}
          >
            Talk to Loom
          </motion.button>
        </motion.div>

        {/* Privacy link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          onClick={() => navigate('/privacy')}
          style={{
            background: 'none',
            border: 'none',
            color: '#AFA090',
            fontSize: '0.7rem',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: '0 22px 16px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1L5.5 1.5C3.5 1.5 2 3 2 5C2 7 3.5 8.5 5.5 8.5C7.5 8.5 9 7 9 5C9 3 7.5 1.5 5.5 1.5L5.5 1Z"
              stroke="#AFA090" strokeWidth="1.1" strokeLinecap="round" />
            <line x1="5.5" y1="4.5" x2="5.5" y2="7" stroke="#AFA090" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="5.5" cy="3.2" r="0.6" fill="#AFA090" />
          </svg>
          Your data & safety →
        </motion.button>
      </div>

      {/* Bottom nav */}
      <BottomNav active="guide" />
    </div>
  );
}
