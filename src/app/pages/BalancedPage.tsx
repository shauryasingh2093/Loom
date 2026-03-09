import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useLoom } from '../context/LoomContext';
import { WeaveCanvas } from '../components/WeaveCanvas';
import { ThreadMeter } from '../components/ThreadMeter';

function FloatingThreads() {
  const threads = [
    { color: '#5BA891', x: '15%', delay: 0, dur: 3.2 },
    { color: '#B84040', x: '50%', delay: 0.6, dur: 4.0 },
    { color: '#8858A4', x: '80%', delay: 1.1, dur: 3.6 },
    { color: '#D4AC50', x: '35%', delay: 0.3, dur: 2.8 },
    { color: '#5BA891', x: '65%', delay: 0.9, dur: 3.4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {threads.map((t, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 rounded-full"
          style={{
            height: 40 + i * 8,
            background: `linear-gradient(180deg, transparent, ${t.color}80, transparent)`,
            left: t.x,
            top: '10%',
          }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: ['0%', '-120%'], opacity: [0, 0.8, 0] }}
          transition={{
            duration: t.dur,
            delay: t.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function BalancedPage() {
  const navigate = useNavigate();
  const { stress, threads, resetStress } = useLoom();

  const handleReset = () => {
    resetStress();
    navigate('/dashboard');
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: '#F5F3E3' }}
    >
      <FloatingThreads />

      {/* Dynamic Island safe area */}
      <div style={{ height: 54 }} />

      {/* Header with golden shimmer */}
      <div className="px-6 pb-2 flex-shrink-0 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{ fontSize: '1.3rem' }}
          >
            ✦
          </motion.span>
          <div>
            <p style={{ color: '#AFA090', fontSize: '0.72rem', fontWeight: 500 }}>
              Untangle complete
            </p>
            <h1
              style={{
                fontFamily: "'Lora', serif",
                color: '#2A2218',
                fontSize: '1.35rem',
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              Your Weave is{' '}
              <span style={{ color: '#5BA891', fontStyle: 'italic' }}>Calm</span>
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Weave canvas – calm state */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="mx-4 rounded-2xl overflow-hidden flex-shrink-0 relative"
        style={{
          height: '40%',
          border: '1px solid rgba(91,168,145,0.2)',
          boxShadow: '0 4px 24px rgba(91,168,145,0.15)',
        }}
      >
        <WeaveCanvas stress={stress} />

        {/* Flowing badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{
            background: 'rgba(245,243,227,0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(91,168,145,0.4)',
          }}
        >
          <span style={{ color: '#5BA891', fontSize: '0.88rem' }}>✦</span>
          <span style={{ color: '#5BA891', fontSize: '0.72rem', fontWeight: 600 }}>
            {stress}% balanced
          </span>
        </motion.div>
      </motion.div>

      {/* Thread meters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mx-4 mt-3 rounded-2xl px-4 py-4 flex flex-col gap-3 flex-shrink-0"
        style={{
          background: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(91,168,145,0.12)',
        }}
      >
        <ThreadMeter type="environment" level={threads.environment} />
        <ThreadMeter type="body" level={threads.body} />
        <ThreadMeter type="mind" level={threads.mind} />
      </motion.div>

      {/* Loom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mx-4 mt-3 px-4 py-3 rounded-xl flex-shrink-0"
        style={{ background: 'rgba(91,168,145,0.08)', border: '1px solid rgba(91,168,145,0.15)' }}
      >
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            color: '#4A8070',
            fontSize: '0.85rem',
            lineHeight: 1.6,
          }}
        >
          "Beautifully done. Your threads are loosening."
        </p>
        <p style={{ color: '#8ABCB0', fontSize: '0.68rem', marginTop: 6, fontWeight: 500 }}>
          — Loom
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mx-4 mt-3 flex flex-col gap-2 flex-shrink-0 pb-8"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #5BA891 0%, #4A9080 100%)',
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(91,168,145,0.28)',
          }}
        >
          Return to your weave
        </button>

        <button
          onClick={handleReset}
          className="w-full py-3 rounded-2xl"
          style={{
            background: 'transparent',
            color: '#AFA090',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '0.82rem',
            border: '1px solid rgba(0,0,0,0.08)',
            cursor: 'pointer',
          }}
        >
          ↺  Demo again
        </button>
      </motion.div>
    </div>
  );
}