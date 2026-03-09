import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Toggle ────────────────────────────────────────────────── */
function Toggle({ on, onChange, color }: { on: boolean; onChange: () => void; color: string }) {
  return (
    <motion.button
      onClick={onChange}
      style={{
        width: 42,
        height: 24,
        borderRadius: 100,
        background: on ? color : 'rgba(0,0,0,0.1)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        flexShrink: 0,
        transition: 'background 0.25s',
      }}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        style={{
          position: 'absolute',
          top: 3,
          left: 0,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }}
      />
    </motion.button>
  );
}

/* ─── Section card ──────────────────────────────────────────── */
interface SectionProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  toggleLabel?: string;
  toggleColor?: string;
  defaultOn?: boolean;
  actionLabel?: string;
  actionColor?: string;
  onAction?: () => void;
  border: string;
}

function Section({
  icon, iconColor, iconBg, title, description,
  toggleLabel, toggleColor, defaultOn = true,
  actionLabel, actionColor, onAction, border,
}: SectionProps) {
  const [on, setOn] = useState(defaultOn);
  const [done, setDone] = useState(false);

  const handleAction = () => {
    if (onAction) onAction();
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.58)',
      border: `1px solid ${border}`,
      borderRadius: 18,
      padding: '14px 16px',
      boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          color: iconColor,
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.8rem', color: '#2A2218', fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>
            {title}
          </p>
          <p style={{ fontSize: '0.7rem', color: '#8A7E74', lineHeight: 1.55 }}>
            {description}
          </p>
        </div>
      </div>

      {/* Controls */}
      {toggleLabel && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}>
          <span style={{ fontSize: '0.7rem', color: '#6A5E54', fontWeight: 500 }}>{toggleLabel}</span>
          <Toggle on={on} onChange={() => setOn(!on)} color={toggleColor || '#5BA891'} />
        </div>
      )}

      {actionLabel && (
        <div style={{ paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: '0.68rem', color: '#5BA891', fontWeight: 600, textAlign: 'center', padding: '4px 0' }}
              >
                ✓ Done
              </motion.p>
            ) : (
              <motion.button
                key="btn"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleAction}
                style={{
                  background: `${actionColor}12`,
                  border: `1px solid ${actionColor}30`,
                  borderRadius: 10,
                  padding: '7px 14px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: actionColor,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  width: '100%',
                }}
              >
                {actionLabel}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export function PrivacySafetyPage() {
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 14,
          flexShrink: 0,
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: 10,
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#5A5044" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <p style={{ color: '#AFA090', fontSize: '0.68rem', fontWeight: 500, marginBottom: 1 }}>
            Safeguards
          </p>
          <h1 style={{
            fontFamily: "'Lora', serif",
            color: '#2A2218',
            fontSize: '1.2rem',
            fontWeight: 500,
          }}>
            Your Data &amp; Safety
          </h1>
        </div>
      </motion.div>

      {/* Cards — scrollable */}
      <div style={{ flex: 1, overflow: 'auto', paddingLeft: 14, paddingRight: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 14 }}>

          {/* Data Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Section
              icon="◎"
              iconColor="#5BA891"
              iconBg="rgba(91,168,145,0.12)"
              title="Data Privacy"
              description="Loom processes all signals locally on your device. Your emotional data is never shared, sold, or sent to external servers."
              toggleLabel="Local processing only"
              toggleColor="#5BA891"
              defaultOn={true}
              border="rgba(91,168,145,0.16)"
            />
          </motion.div>

          {/* User Control */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <Section
              icon="⌁"
              iconColor="#8858A4"
              iconBg="rgba(136,88,164,0.1)"
              title="User Control"
              description="You are always in control of your weave. Pause sensing at any time, or delete your personal insights and thread history."
              toggleLabel="Pause sensing"
              toggleColor="#8858A4"
              defaultOn={false}
              actionLabel="Delete my thread history"
              actionColor="#B84040"
              border="rgba(136,88,164,0.14)"
            />
          </motion.div>

          {/* Shared Space Awareness */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
          >
            <Section
              icon="≈"
              iconColor="#C8883A"
              iconBg="rgba(200,136,58,0.1)"
              title="Shared Space Awareness"
              description="Loom only senses your personal signals. It never analyzes, identifies, or profiles other people in your environment."
              toggleLabel="Only sense me"
              toggleColor="#C8883A"
              defaultOn={true}
              border="rgba(200,136,58,0.14)"
            />
          </motion.div>

          {/* Emotional Safety */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34 }}
          >
            <Section
              icon="✦"
              iconColor="#B84040"
              iconBg="rgba(184,64,64,0.08)"
              title="Emotional Safety"
              description="Loom offers guidance and reflection, not clinical diagnosis. If you are in distress, please seek support from a qualified professional."
              toggleLabel="Show crisis resources"
              toggleColor="#B84040"
              defaultOn={true}
              border="rgba(184,64,64,0.12)"
            />
          </motion.div>

          {/* Footer message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              textAlign: 'center',
              padding: '10px 16px 4px',
            }}
          >
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: '#8A7E74',
              lineHeight: 1.6,
            }}>
              "Your weave belongs only to you."
            </p>
            <p style={{ fontSize: '0.62rem', color: '#B0A494', marginTop: 5 }}>— Loom</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
