import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';

/* ─── Mini thread diagram SVGs ──────────────────────────────── */
function NoiseTangleDiagram() {
  return (
    <svg width="100%" height="52" viewBox="0 0 240 52" preserveAspectRatio="none">
      {/* Calm start */}
      <motion.path d="M0 26 C20 22 40 30 60 26" stroke="#8858A4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"
        animate={{ y: [-1, 1, -1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M0 32 C20 36 40 28 60 32" stroke="#5BA891" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"
        animate={{ y: [1, -1, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
      {/* Chaotic middle (noise) */}
      <motion.path d="M60 26 C75 8 88 48 102 18 C116 -4 128 50 140 24" stroke="#8858A4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"
        animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M60 32 C75 52 88 12 102 42 C116 68 128 14 140 38" stroke="#B84040" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"
        animate={{ y: [3, -3, 3] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M60 20 C72 42 84 4 100 32 C116 56 128 20 140 26" stroke="#5BA891" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"
        animate={{ y: [-2, 2, -2] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      {/* Settling end */}
      <motion.path d="M140 24 C170 14 200 28 240 22" stroke="#8858A4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55"
        animate={{ y: [-1, 1, -1] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M140 38 C170 44 200 36 240 40" stroke="#5BA891" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"
        animate={{ y: [1, -1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      {/* Noise indicator line */}
      <line x1="60" y1="4" x2="60" y2="48" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="62" y="10" style={{ fontSize: '7px', fill: '#AFA090' }}>noise</text>
    </svg>
  );
}

function BodyTightenDiagram() {
  return (
    <svg width="100%" height="52" viewBox="0 0 240 52" preserveAspectRatio="none">
      {/* Relaxed start */}
      <motion.path d="M0 26 C30 22 60 30 90 26 C110 24 130 28 150 26" stroke="#B84040" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"
        animate={{ y: [-1, 1, -1] }} transition={{ duration: 4, repeat: Infinity }} />
      {/* Tightening */}
      <motion.path d="M150 26 C165 20 175 16 185 12 C195 8 205 10 215 10 C225 10 232 11 240 10" stroke="#B84040" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9"
        animate={{ y: [-2, 0, -2] }} transition={{ duration: 2.5, repeat: Infinity }} />
      {/* Supporting threads */}
      <motion.path d="M0 36 C40 34 80 36 120 34 C150 33 180 30 215 28 C225 28 232 28 240 28" stroke="#8858A4" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.45"
        animate={{ y: [0.5, -0.5, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.path d="M0 18 C40 18 80 16 120 18 C150 19 180 22 215 24 C225 24 232 24 240 24" stroke="#5BA891" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.35"
        animate={{ y: [-0.5, 0.5, -0.5] }} transition={{ duration: 5.5, repeat: Infinity }} />
      {/* Meeting marker */}
      <line x1="150" y1="4" x2="150" y2="48" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="152" y="10" style={{ fontSize: '7px', fill: '#AFA090' }}>meeting</text>
    </svg>
  );
}

function OutsideCalmDiagram() {
  return (
    <svg width="100%" height="52" viewBox="0 0 240 52" preserveAspectRatio="none">
      {/* Tangled start */}
      <motion.path d="M0 26 C14 8 28 46 42 20 C56 -2 68 48 80 26" stroke="#5BA891" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7"
        animate={{ y: [-3, 3, -3] }} transition={{ duration: 2.2, repeat: Infinity }} />
      <motion.path d="M0 36 C14 58 28 14 42 42 C56 66 68 18 80 36" stroke="#8858A4" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.6"
        animate={{ y: [2, -2, 2] }} transition={{ duration: 2.5, repeat: Infinity }} />
      {/* Transition zone */}
      <motion.path d="M80 26 C100 22 115 28 130 26" stroke="#5BA891" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"
        animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ duration: 3, repeat: Infinity }} />
      {/* Smooth end */}
      <motion.path d="M130 26 C160 22 200 30 240 26" stroke="#5BA891" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"
        animate={{ y: [-1, 1, -1] }} transition={{ duration: 4.5, repeat: Infinity }} />
      <motion.path d="M130 36 C160 40 200 34 240 38" stroke="#8858A4" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.55"
        animate={{ y: [0.5, -0.5, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.path d="M130 18 C160 14 200 20 240 18" stroke="#C8883A" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.45"
        animate={{ y: [-0.5, 0.5, -0.5] }} transition={{ duration: 5.5, repeat: Infinity }} />
      {/* Outside marker */}
      <line x1="130" y1="4" x2="130" y2="48" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="132" y="10" style={{ fontSize: '7px', fill: '#AFA090' }}>outside</text>
    </svg>
  );
}

function MorningLightDiagram() {
  return (
    <svg width="100%" height="52" viewBox="0 0 240 52" preserveAspectRatio="none">
      {/* Pre-light: scattered */}
      <motion.path d="M0 30 C20 22 35 38 50 28 C65 18 80 36 100 28" stroke="#C8883A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55"
        animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }} />
      {/* After light: harmonious */}
      <motion.path d="M100 28 C130 24 170 32 210 28 C225 26 235 27 240 28" stroke="#C8883A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"
        animate={{ y: [-1, 1, -1] }} transition={{ duration: 4.5, repeat: Infinity }} />
      <motion.path d="M100 36 C130 40 170 34 210 37 C225 38 235 37 240 37" stroke="#8858A4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"
        animate={{ y: [0.5, -0.5, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.path d="M100 20 C130 16 170 22 210 19 C225 18 235 19 240 19" stroke="#5BA891" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"
        animate={{ y: [-0.5, 0.5, -0.5] }} transition={{ duration: 5.5, repeat: Infinity }} />
      {/* Light marker */}
      <line x1="100" y1="4" x2="100" y2="48" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="102" y="10" style={{ fontSize: '7px', fill: '#AFA090' }}>light</text>
    </svg>
  );
}

/* ─── Insight card data ─────────────────────────────────────── */
const INSIGHTS = [
  {
    id: 'noise',
    glyph: '⌁',
    glyphColor: '#8858A4',
    glyphBg: 'rgba(136,88,164,0.1)',
    thread: 'Mind',
    threadColor: '#8858A4',
    title: 'Noise tangles your weave during study',
    detail: 'When background noise rises, your mind threads tighten first — pulling body and environment threads with them.',
    frequency: 'Noticed 5 times this week',
    Diagram: NoiseTangleDiagram,
    bg: 'rgba(136,88,164,0.04)',
    border: 'rgba(136,88,164,0.12)',
  },
  {
    id: 'meetings',
    glyph: '◎',
    glyphColor: '#B84040',
    glyphBg: 'rgba(184,64,64,0.1)',
    thread: 'Body',
    threadColor: '#B84040',
    title: 'Body threads tighten after long meetings',
    detail: 'Extended focus tasks cause your body thread to slowly contract. A short movement break restores flow.',
    frequency: 'Noticed 3 times this week',
    Diagram: BodyTightenDiagram,
    bg: 'rgba(184,64,64,0.04)',
    border: 'rgba(184,64,64,0.12)',
  },
  {
    id: 'outside',
    glyph: '≈',
    glyphColor: '#5BA891',
    glyphBg: 'rgba(91,168,145,0.1)',
    thread: 'Environment',
    threadColor: '#5BA891',
    title: 'Your weave stabilizes after stepping outside',
    detail: 'Even 5 minutes outdoors consistently smooths all three threads. Your environment thread leads the recovery.',
    frequency: 'Noticed 7 times this week',
    Diagram: OutsideCalmDiagram,
    bg: 'rgba(91,168,145,0.04)',
    border: 'rgba(91,168,145,0.14)',
  },
  {
    id: 'light',
    glyph: '✦',
    glyphColor: '#C8883A',
    glyphBg: 'rgba(200,136,58,0.1)',
    thread: 'All threads',
    threadColor: '#C8883A',
    title: 'Morning light aligns your mind threads',
    detail: 'Days that start with natural light show markedly smoother weave patterns through the morning.',
    frequency: 'Noticed 4 times this week',
    Diagram: MorningLightDiagram,
    bg: 'rgba(200,136,58,0.04)',
    border: 'rgba(200,136,58,0.12)',
  },
];

export function PatternInsightsPage() {
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ paddingLeft: 22, paddingRight: 22, paddingBottom: 6, flexShrink: 0 }}
      >
        <p style={{ color: '#AFA090', fontSize: '0.7rem', fontWeight: 500, marginBottom: 2 }}>
          What Loom has noticed
        </p>
        <h1 style={{
          fontFamily: "'Lora', serif",
          color: '#2A2218',
          fontSize: '1.3rem',
          fontWeight: 500,
          lineHeight: 1.25,
        }}>
          Your Patterns
        </h1>
      </motion.div>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          paddingLeft: 22,
          paddingRight: 22,
          paddingBottom: 12,
          fontSize: '0.72rem',
          color: '#9A8E82',
          lineHeight: 1.6,
          flexShrink: 0,
        }}
      >
        Patterns your weave repeats — threads don't lie.
      </motion.p>

      {/* Cards — scrollable */}
      <div style={{ flex: 1, overflow: 'auto', paddingLeft: 14, paddingRight: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 10 }}>
          {INSIGHTS.map((ins, i) => (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              style={{
                background: ins.bg,
                border: `1px solid ${ins.border}`,
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              {/* Card header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px 6px',
              }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: ins.glyphBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  color: ins.glyphColor,
                  flexShrink: 0,
                }}>
                  {ins.glyph}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.75rem', color: '#2A2218', fontWeight: 600, lineHeight: 1.35 }}>
                    {ins.title}
                  </p>
                  <span style={{
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    color: ins.threadColor,
                    background: `${ins.threadColor}14`,
                    padding: '2px 7px',
                    borderRadius: 100,
                    marginTop: 2,
                    display: 'inline-block',
                  }}>
                    {ins.thread}
                  </span>
                </div>
              </div>

              {/* Thread diagram */}
              <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4 }}>
                <ins.Diagram />
              </div>

              {/* Detail + frequency */}
              <div style={{ padding: '6px 14px 12px' }}>
                <p style={{
                  fontSize: '0.7rem',
                  color: '#7A6E64',
                  lineHeight: 1.55,
                  marginBottom: 6,
                }}>
                  {ins.detail}
                </p>
                <p style={{ fontSize: '0.63rem', color: ins.threadColor, fontWeight: 600, opacity: 0.8 }}>
                  {ins.frequency}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="threads" />
    </div>
  );
}
