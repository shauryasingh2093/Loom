import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLoom } from '../context/LoomContext';

const ACTIVITIES = [
  {
    id: 'breath',
    icon: '🌬️',
    title: 'Breath Reset',
    duration: '2 min',
    description: 'Slow your body threads',
    color: '#5BA891',
    bg: 'rgba(91,168,145,0.1)',
    border: 'rgba(91,168,145,0.25)',
  },
  {
    id: 'walk',
    icon: '🚶',
    title: 'Step Outside',
    duration: '5 min',
    description: 'Clear environment threads',
    color: '#8AAA5A',
    bg: 'rgba(138,170,90,0.1)',
    border: 'rgba(138,170,90,0.25)',
  },
  {
    id: 'scan',
    icon: '✦',
    title: 'Body Scan',
    duration: '3 min',
    description: 'Release tension in body',
    color: '#8858A4',
    bg: 'rgba(136,88,164,0.1)',
    border: 'rgba(136,88,164,0.25)',
  },
];

function LoomAvatar() {
  return (
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path
            d="M36 6C36 6 18 18 18 36C18 45.9 26.1 54 36 54C45.9 54 54 45.9 54 36C54 18 36 6 36 6Z"
            stroke="#5BA891"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
          />
        </svg>
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path
            d="M6 36C6 36 18 18 36 18C54 18 66 36 66 36"
            stroke="#B84040"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 4"
          />
          <path
            d="M6 36C6 36 18 54 36 54C54 54 66 36 66 36"
            stroke="#8858A4"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 4"
          />
        </svg>
      </motion.div>
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(136,88,164,0.15), rgba(91,168,145,0.15))',
            border: '1.5px solid rgba(136,88,164,0.3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7.5" stroke="#8858A4" strokeWidth="1.3" fill="none"/>
            <path d="M10 2.5C10 2.5 6.5 5.5 6.5 10C6.5 12.5 8 14.5 10 14.5C12 14.5 13.5 12.5 13.5 10C13.5 5.5 10 2.5 10 2.5Z" fill="rgba(136,88,164,0.2)" stroke="#8858A4" strokeWidth="1.2"/>
            <path d="M2.5 10C2.5 10 5.5 8.5 10 8.5C14.5 8.5 17.5 10 17.5 10" stroke="#5BA891" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CompanionPage() {
  const navigate = useNavigate();
  const { threads } = useLoom();
  const [showMessage, setShowMessage] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const dominantThread =
    threads.body >= threads.environment && threads.body >= threads.mind
      ? 'body'
      : threads.mind >= threads.environment
      ? 'mind'
      : 'environment';

  const messages: Record<string, string> = {
    body: `Your body threads are showing tension right now — I can sense tightness that's been building. Your breath is shorter than usual, and your muscles are holding stress you may not even notice.`,
    mind: `Your mind threads are moving fast today — looping thoughts and scattered focus. The mental noise is spilling into your body and making it hard to feel settled.`,
    environment: `Your environment threads are pulling hard. High stimulation around you — noise, movement, density. It's tangling your inner weave without you realizing it.`,
  };

  useEffect(() => {
    const t1 = setTimeout(() => setShowMessage(true), 600);
    const t2 = setTimeout(() => setShowActivities(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleActivity = (id: string) => {
    setSelected(id);
    const routes: Record<string, string> = {
      breath: '/activity',
      walk: '/step-outside',
      scan: '/body-scan',
    };
    setTimeout(() => navigate(routes[id] ?? '/activity'), 400);
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: '#F5F3E3' }}
    >
      {/* Dynamic Island safe area */}
      <div style={{ height: 54 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pb-2 flex-shrink-0">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#5A5044" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ color: '#8A8070', fontSize: '0.8rem', fontWeight: 500 }}>Your Loom</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center pt-4 pb-6"
        >
          <LoomAvatar />
          <p
            className="mt-3"
            style={{
              fontFamily: "'Lora', serif",
              color: '#2A2218',
              fontSize: '1.05rem',
              fontWeight: 500,
            }}
          >
            Loom
          </p>
          <p style={{ color: '#AFA090', fontSize: '0.72rem', marginTop: 2 }}>Your sensory companion</p>
        </motion.div>

        {/* AI Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl p-4 mb-4"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {/* Typing indicator becomes message */}
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: 'italic',
                  color: '#3A3028',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                }}
              >
                {messages[dominantThread]}
              </p>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#AFA090', fontSize: '0.72rem', fontWeight: 500 }}>
                  What would help right now?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activity suggestions */}
        <AnimatePresence>
          {showActivities && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              {ACTIVITIES.map((act, i) => (
                <motion.button
                  key={act.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleActivity(act.id)}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 text-left"
                  style={{
                    background: selected === act.id ? act.bg : 'rgba(255,255,255,0.55)',
                    border: `1.5px solid ${selected === act.id ? act.border : 'rgba(0,0,0,0.06)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: act.bg, border: `1px solid ${act.border}` }}
                  >
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          color: '#2A2218',
                          fontSize: '0.9rem',
                        }}
                      >
                        {act.title}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ background: act.bg, color: act.color, fontWeight: 500 }}
                      >
                        {act.duration}
                      </span>
                    </div>
                    <p style={{ color: '#8A7E70', fontSize: '0.78rem', marginTop: 2 }}>
                      {act.description}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke={act.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              ))}

              {/* Untangle Threads → Scribble */}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: ACTIVITIES.length * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/scribble')}
                className="w-full rounded-2xl flex items-center gap-4 text-left"
                style={{
                  padding: '14px 16px',
                  background: 'linear-gradient(135deg, rgba(136,88,164,0.1) 0%, rgba(184,64,64,0.08) 100%)',
                  border: '1.5px solid rgba(136,88,164,0.22)',
                  cursor: 'pointer',
                  marginTop: 2,
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(136,88,164,0.18), rgba(184,64,64,0.12))',
                    border: '1px solid rgba(136,88,164,0.28)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <motion.path
                      d="M3 11 C5 7 8 15 11 10 C14 5 17 13 19 9"
                      stroke="#8858A4"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                      animate={{ d: [
                        'M3 11 C5 7 8 15 11 10 C14 5 17 13 19 9',
                        'M3 11 C5 13 8 9 11 11 C14 13 17 9 19 11',
                        'M3 11 C5 7 8 15 11 10 C14 5 17 13 19 9',
                      ]}}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M3 14 C6 18 9 10 12 14 C15 18 17 12 19 14"
                      stroke="#B84040"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      animate={{ d: [
                        'M3 14 C6 18 9 10 12 14 C15 18 17 12 19 14',
                        'M3 14 C6 12 9 16 12 14 C15 12 17 16 19 14',
                        'M3 14 C6 18 9 10 12 14 C15 18 17 12 19 14',
                      ]}}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    />
                  </svg>
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      color: '#2A2218',
                      fontSize: '0.9rem',
                    }}>
                      Untangle Threads
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(136,88,164,0.1)',
                        color: '#8858A4',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                      }}
                    >
                      Free draw
                    </span>
                  </div>
                  <p style={{ color: '#8A7E70', fontSize: '0.78rem', marginTop: 2 }}>
                    Draw out the tangle — let your threads flow
                  </p>
                </div>

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="#8858A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}