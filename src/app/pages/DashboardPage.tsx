import { useNavigate } from 'react-router';
import { useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WeaveCanvas } from '../components/WeaveCanvas';
import { useLoom } from '../context/LoomContext';
import type { ThreadState } from '../context/LoomContext';
import loomLogo from 'figma:asset/0b44ac3de2fa893d41c5bb94c8af295c20f2f39a.png';
import { BottomNav } from '../components/BottomNav';

/* ─── State mapping ─────────────────────────────────────────── */
const STATES = [
  { max: 20,  label: 'Flowing',      color: '#5BA891', emoji: '✦', hint: 'Your threads are in harmony' },
  { max: 40,  label: 'Rippling',     color: '#8AAA5A', emoji: '≈', hint: 'Gentle tension in your weave' },
  { max: 60,  label: 'Knotting',     color: '#C8883A', emoji: '⌁', hint: 'Some threads are pulling tight' },
  { max: 80,  label: 'Tangled',      color: '#B84040', emoji: '⌀', hint: 'Your weave needs attention' },
  { max: 100, label: 'Tightly Bound',color: '#8B1A1A', emoji: '✕', hint: 'Threads are caught and tense' },
];
function getState(s: number) {
  return STATES.find(st => s <= st.max) ?? STATES[STATES.length - 1];
}

/* ─── Thread configs ─────────��──────────────────────────────── */
const THREAD_CFG = {
  environment: {
    color: '#5BA891',
    track: 'rgba(91,168,145,0.18)',
    label: 'Environment',
    descs: ['Calm', 'Active', 'Stimulated', 'Overwhelming'],
    Icon: () => (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C7 1 2 5 2 8.5C2 11.0376 4.23858 13 7 13C9.76142 13 12 11.0376 12 8.5C12 5 7 1 7 1Z"
          stroke="#5BA891" strokeWidth="1.4" fill="rgba(91,168,145,0.15)"/>
        <path d="M7 6V11" stroke="#5BA891" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  body: {
    color: '#B84040',
    track: 'rgba(184,64,64,0.15)',
    label: 'Body',
    descs: ['Relaxed', 'Engaged', 'Tense', 'Tight'],
    Icon: () => (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <path d="M7 2.5C5.34315 2.5 4 3.84315 4 5.5C4 6.5 4.5 7.4 5.4 7.9L5 11.5H9L8.6 7.9C9.5 7.4 10 6.5 10 5.5C10 3.84315 8.65685 2.5 7 2.5Z"
          stroke="#B84040" strokeWidth="1.4" fill="rgba(184,64,64,0.12)" strokeLinejoin="round"/>
      </svg>
    ),
  },
  mind: {
    color: '#8858A4',
    track: 'rgba(136,88,164,0.15)',
    label: 'Mind',
    descs: ['Clear', 'Busy', 'Racing', 'Overloaded'],
    Icon: () => (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2" fill="rgba(136,88,164,0.2)" stroke="#8858A4" strokeWidth="1.3"/>
        <path d="M7 1V2.5M7 11.5V13M1 7H2.5M11.5 7H13M2.93 2.93L4 4M10 10L11.07 11.07M11.07 2.93L10 4M4 10L2.93 11.07"
          stroke="#8858A4" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
};

/* ─── Draggable thread slider ───────────────────────────────── */
function ThreadSlider({
  value,
  onChange,
  color,
  trackBg,
}: {
  value: number;
  onChange: (v: number) => void;
  color: string;
  trackBg: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const compute = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    return Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={(e) => {
        dragging.current = true;
        trackRef.current?.setPointerCapture(e.pointerId);
        onChange(compute(e.clientX));
      }}
      onPointerMove={(e) => { if (dragging.current) onChange(compute(e.clientX)); }}
      onPointerUp={() => { dragging.current = false; }}
      style={{
        position: 'relative',
        height: 24,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Track background */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 5,
          borderRadius: 4,
          background: trackBg,
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            borderRadius: 4,
            transition: 'width 0.05s',
          }}
        />
      </div>
      {/* Thumb */}
      <div
        style={{
          position: 'absolute',
          left: `${value}%`,
          transform: 'translateX(-50%)',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#FDFCF8',
          border: `2.5px solid ${color}`,
          boxShadow: `0 2px 6px rgba(0,0,0,0.15), 0 0 0 3px ${color}22`,
          zIndex: 2,
        }}
      />
    </div>
  );
}

/* ─── Thread row ─────────────────────────────────────────────── */
function ThreadRow({
  type,
  level,
  onLevel,
}: {
  type: keyof typeof THREAD_CFG;
  level: number;
  onLevel: (v: number) => void;
}) {
  const cfg = THREAD_CFG[type];
  const descIdx = level < 25 ? 0 : level < 50 ? 1 : level < 75 ? 2 : 3;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* Icon bubble */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: cfg.track,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <cfg.Icon />
      </div>
      {/* Label + slider */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: '#5A5044', fontSize: '0.76rem', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {cfg.label}
          </span>
          <span style={{ color: cfg.color, fontSize: '0.70rem', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {cfg.descs[descIdx]}
          </span>
        </div>
        <ThreadSlider value={level} onChange={onLevel} color={cfg.color} trackBg={cfg.track} />
      </div>
    </div>
  );
}

/* ─── Loom mark ─────────────────────────────────────────────── */
function LoomMark() {
  return (
    <img
      src={loomLogo}
      alt="Loom"
      style={{
        width: 88,
        objectFit: 'contain',
        display: 'block',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

/* ─── Dashboard ─────────────────────────────────────────────── */
export function DashboardPage() {
  const navigate = useNavigate();
  const { stress, threads, setStress, setThreads } = useLoom();
  const state = getState(stress);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const handleThread = (type: keyof ThreadState, value: number) => {
    const next = { ...threads, [type]: value };
    setThreads(next);
    setStress(Math.round((next.environment + next.body + next.mind) / 3));
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F5F3E3',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Dynamic Island safe area */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingLeft: 22,
          paddingRight: 22,
          paddingBottom: 10,
          flexShrink: 0,
        }}
      >
        <div>
          <p style={{ color: '#AFA090', fontSize: '0.72rem', fontWeight: 500, marginBottom: 2 }}>
            {greeting} · {timeStr}
          </p>
          <h1
            style={{
              fontFamily: "'Lora', serif",
              color: '#2A2218',
              fontSize: '1.3rem',
              fontWeight: 500,
              lineHeight: 1.25,
            }}
          >
            Your weave is{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={state.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ color: state.color, fontStyle: 'italic' }}
              >
                {state.label.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p style={{ color: '#AFA090', fontSize: '0.70rem', marginTop: 3 }}>{state.hint}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, paddingTop: 2 }}>
          <LoomMark />
        </div>
      </motion.div>

      {/* ── Weave Canvas ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          marginLeft: 16,
          marginRight: 16,
          borderRadius: 20,
          overflow: 'hidden',
          flexShrink: 0,
          height: 218,
          position: 'relative',
          border: `1px solid ${state.color}28`,
          boxShadow: `0 4px 24px ${state.color}18, 0 1px 4px rgba(0,0,0,0.06)`,
        }}
      >
        <WeaveCanvas stress={stress} />

        {/* State badge */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(245,243,227,0.88)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${state.color}38`,
            borderRadius: 100,
            padding: '5px 11px 5px 8px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={state.emoji}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              style={{ fontSize: '0.9rem', color: state.color }}
            >
              {state.emoji}
            </motion.span>
          </AnimatePresence>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: state.color }}>
            {stress}%
          </span>
        </div>

        {/* Bottom hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            fontSize: '0.6rem',
            color: 'rgba(90,80,68,0.5)',
            fontWeight: 500,
          }}
        >
          drag sliders below to shift your weave
        </div>
      </motion.div>

      {/* ── Thread Controls ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          margin: '10px 16px 0',
          background: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: 20,
          padding: '14px 16px',
          flexShrink: 0,
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Section label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7E70', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Your Threads
          </p>
          <button
            onClick={() => navigate('/scan')}
            style={{
              fontSize: '0.64rem',
              fontWeight: 600,
              color: '#8858A4',
              background: 'rgba(136,88,164,0.08)',
              border: 'none',
              borderRadius: 100,
              padding: '3px 10px',
              cursor: 'pointer',
            }}
          >
            Re-scan
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ThreadRow type="environment" level={threads.environment} onLevel={v => handleThread('environment', v)} />
          <ThreadRow type="body"        level={threads.body}        onLevel={v => handleThread('body', v)} />
          <ThreadRow type="mind"        level={threads.mind}        onLevel={v => handleThread('mind', v)} />
        </div>
      </motion.div>

      {/* ── Primary CTA ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        style={{ margin: '10px 16px 0', flexShrink: 0 }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/companion')}
          style={{
            width: '100%',
            padding: '15px 20px',
            borderRadius: 16,
            background:
              stress > 50
                ? 'linear-gradient(135deg, #8858A4 0%, #B84040 100%)'
                : 'linear-gradient(135deg, #5BA891 0%, #8858A4 100%)',
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow:
              stress > 50
                ? '0 8px 28px rgba(136,88,164,0.3)'
                : '0 8px 28px rgba(91,168,145,0.28)',
          }}
        >
          {/* Chat icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.4" fill="rgba(255,255,255,0.15)"/>
            <path d="M6 7.5C6 7.5 7 5.5 9 5.5C11 5.5 12 7 12 8C12 9.5 10.5 10.5 9 10.5"
              stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="9" cy="12.5" r="0.8" fill="white"/>
          </svg>
          Talk to Loom
          {stress > 50 && (
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.22)',
                borderRadius: 100,
                padding: '2px 8px',
              }}
            >
              Imbalance detected
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* ── Bottom Nav ────────────────────────────────────── */}
      <div style={{ flexGrow: 1 }} />
      <BottomNav active="loom" />
    </div>
  );
}