import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useLoom } from '../context/LoomContext';
import { BottomNav } from '../components/BottomNav';

/* ─── Thread timeline SVG ───────────────────────────────────── */
type ThreadPhase = 'tangled' | 'settling' | 'flowing';

function ThreadViz({ phase }: { phase: ThreadPhase }) {
  const paths: Record<ThreadPhase, { d: string; color: string; delay: number }[]> = {
    tangled: [
      {
        d: 'M0 32 C14 6 26 56 42 22 C58 -4 70 52 86 26 C102 2 116 54 130 28 C144 4 158 48 174 22 C188 0 202 50 218 26 C232 4 248 46 264 28 C278 12 294 42 320 28',
        color: '#8858A4', delay: 0,
      },
      {
        d: 'M0 38 C14 64 28 10 44 40 C60 70 74 14 90 44 C106 74 120 20 136 48 C152 76 166 22 182 52 C198 80 214 28 230 56 C246 84 260 36 276 58 C292 80 306 42 320 50',
        color: '#B84040', delay: 0.4,
      },
      {
        d: 'M0 26 C18 46 32 8 48 34 C64 60 78 12 94 38 C110 64 124 16 140 42 C156 68 170 24 186 48 C202 72 218 30 234 52 C250 74 266 32 282 54 C298 76 310 44 320 38',
        color: '#5BA891', delay: 0.2,
      },
    ],
    settling: [
      {
        d: 'M0 28 C40 16 80 40 120 26 C160 12 200 36 240 26 C270 18 300 30 320 26',
        color: '#8858A4', delay: 0,
      },
      {
        d: 'M0 40 C40 52 80 28 120 42 C160 56 200 32 240 44 C270 52 300 40 320 44',
        color: '#B84040', delay: 0.3,
      },
      {
        d: 'M0 22 C40 30 80 14 120 22 C160 30 200 16 240 24 C270 18 300 26 320 22',
        color: '#5BA891', delay: 0.15,
      },
    ],
    flowing: [
      {
        d: 'M0 28 C80 22 160 34 240 28 C280 25 305 27 320 28',
        color: '#8858A4', delay: 0,
      },
      {
        d: 'M0 40 C80 44 160 36 240 40 C280 42 305 40 320 40',
        color: '#B84040', delay: 0.25,
      },
      {
        d: 'M0 50 C80 46 160 54 240 50 C280 48 305 51 320 50',
        color: '#5BA891', delay: 0.12,
      },
    ],
  };

  const amplitude = phase === 'tangled' ? 4 : phase === 'settling' ? 2 : 1;
  const duration = phase === 'tangled' ? 2.2 : phase === 'settling' ? 3.2 : 4.5;

  return (
    <svg width="100%" height="68" viewBox="0 0 320 68" preserveAspectRatio="none">
      {paths[phase].map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke={p.color}
          strokeWidth={phase === 'flowing' ? 2 : 1.6}
          fill="none"
          strokeLinecap="round"
          opacity={phase === 'flowing' ? 0.85 : 0.7}
          animate={{ y: [-amplitude, amplitude, -amplitude] }}
          transition={{
            duration: duration + i * 0.3,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Day progress bar ──────────────────────────────────────── */
function DayProgress({ balance }: { balance: number }) {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
      }}>
        <span style={{ fontSize: '0.65rem', color: '#B84040', fontWeight: 500 }}>Morning</span>
        <span style={{
          fontSize: '0.68rem',
          color: '#2A2218',
          fontWeight: 700,
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
        }}>
          Today's balance: {balance}%
        </span>
        <span style={{ fontSize: '0.65rem', color: '#5BA891', fontWeight: 500 }}>Evening</span>
      </div>
      <div style={{
        height: 6,
        borderRadius: 100,
        background: 'rgba(0,0,0,0.07)',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Gradient fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${balance}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            height: '100%',
            borderRadius: 100,
            background: 'linear-gradient(90deg, #B84040 0%, #C8883A 50%, #5BA891 100%)',
          }}
        />
        {/* Marker dot */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${balance}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#FDFCF6',
            border: '2px solid #C8883A',
            boxShadow: '0 0 8px rgba(200,136,58,0.5)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Timeline card ─────────────────────────────────────────── */
const TIMELINE = [
  {
    phase: 'tangled' as ThreadPhase,
    time: 'Morning · 6am–12pm',
    icon: '☀',
    iconColor: '#C8883A',
    state: 'Tangled',
    stateColor: '#B84040',
    stateBg: 'rgba(184,64,64,0.08)',
    note: 'Noise and notifications pulled threads tight.',
  },
  {
    phase: 'settling' as ThreadPhase,
    time: 'Afternoon · 12pm–5pm',
    icon: '◎',
    iconColor: '#8858A4',
    state: 'Settling',
    stateColor: '#C8883A',
    stateBg: 'rgba(200,136,58,0.08)',
    note: 'A breathing reset helped ease the weave.',
  },
  {
    phase: 'flowing' as ThreadPhase,
    time: 'Evening · 5pm–now',
    icon: '✦',
    iconColor: '#5BA891',
    state: 'Flowing',
    stateColor: '#5BA891',
    stateBg: 'rgba(91,168,145,0.1)',
    note: 'Stepping outside brought your threads into flow.',
  },
];

export function WeaveTodayPage() {
  const navigate = useNavigate();
  const { stress } = useLoom();
  const balance = Math.round(100 - stress);

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
        style={{ paddingLeft: 22, paddingRight: 22, paddingBottom: 14, flexShrink: 0 }}
      >
        <p style={{ color: '#AFA090', fontSize: '0.7rem', fontWeight: 500, marginBottom: 2 }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 style={{
          fontFamily: "'Lora', serif",
          color: '#2A2218',
          fontSize: '1.3rem',
          fontWeight: 500,
          lineHeight: 1.25,
        }}>
          Your Weave Today
        </h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ flexShrink: 0, marginBottom: 14 }}
      >
        <DayProgress balance={balance} />
      </motion.div>

      {/* Timeline — scrollable */}
      <div style={{ flex: 1, overflow: 'auto', paddingLeft: 14, paddingRight: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 10 }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              style={{
                background: 'rgba(255,255,255,0.62)',
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              {/* Card header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px 6px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: '0.95rem', color: item.iconColor }}>{item.icon}</span>
                  <span style={{ fontSize: '0.7rem', color: '#6A5E54', fontWeight: 500 }}>{item.time}</span>
                </div>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: item.stateColor,
                  background: item.stateBg,
                  padding: '3px 9px',
                  borderRadius: 100,
                }}>
                  {item.state}
                </span>
              </div>

              {/* Thread visualization */}
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <ThreadViz phase={item.phase} />
              </div>

              {/* Note */}
              <p style={{
                fontSize: '0.7rem',
                color: '#8A7E74',
                padding: '6px 14px 12px',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}>
                {item.note}
              </p>
            </motion.div>
          ))}

          {/* Insight quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              background: 'rgba(91,168,145,0.07)',
              border: '1px solid rgba(91,168,145,0.18)',
              borderRadius: 16,
              padding: '12px 16px',
            }}
          >
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              color: '#4A8070',
              fontSize: '0.82rem',
              lineHeight: 1.65,
            }}>
              "Your weave began stabilizing after your breathing reset."
            </p>
            <p style={{ color: '#8ABCB0', fontSize: '0.66rem', marginTop: 5, fontWeight: 500 }}>— Loom</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="weave" />
    </div>
  );
}
