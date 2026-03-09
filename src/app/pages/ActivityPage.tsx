import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useLoom } from '../context/LoomContext';
import { WeaveCanvas } from '../components/WeaveCanvas';

type Phase = 'in' | 'hold' | 'out' | 'pause';

const CYCLE_PHASES: { phase: Phase; label: string; duration: number; color: string }[] = [
  { phase: 'in', label: 'Breathe in…', duration: 4000, color: '#5BA891' },
  { phase: 'hold', label: 'Hold…', duration: 2000, color: '#D4AC50' },
  { phase: 'out', label: 'Breathe out…', duration: 5000, color: '#8858A4' },
  { phase: 'pause', label: 'Rest…', duration: 1500, color: '#AFA090' },
];
const TOTAL_CYCLES = 3;

export function ActivityPage() {
  const navigate = useNavigate();
  const { stress, resolveStress } = useLoom();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [displayStress, setDisplayStress] = useState(stress);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  const totalPhases = TOTAL_CYCLES * CYCLE_PHASES.length;
  const currentGlobalPhase = cycleIndex * CYCLE_PHASES.length + phaseIndex;
  const progress = currentGlobalPhase / totalPhases;

  const currentPhase = CYCLE_PHASES[phaseIndex];

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let globalPhase = 0;

    const runPhase = () => {
      const cycle = Math.floor(globalPhase / CYCLE_PHASES.length);
      const phase = globalPhase % CYCLE_PHASES.length;

      if (cycle >= TOTAL_CYCLES) {
        resolveStress();
        setCompleted(true);
        return;
      }

      setCycleIndex(cycle);
      setPhaseIndex(phase);

      // Gradually reduce displayed stress
      const newStress = Math.max(20, stress - (globalPhase / totalPhases) * (stress - 20));
      setDisplayStress(newStress);

      timerRef.current = setTimeout(() => {
        globalPhase++;
        runPhase();
      }, CYCLE_PHASES[phase].duration);
    };

    timerRef.current = setTimeout(runPhase, 600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const circleScale = currentPhase.phase === 'in' ? 1.35 : currentPhase.phase === 'hold' ? 1.35 : 1.0;

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
          onClick={() => navigate('/companion')}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#5A5044" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <p style={{ color: '#2A2218', fontWeight: 600, fontSize: '0.92rem' }}>Breath Reset</p>
          <p style={{ color: '#AFA090', fontSize: '0.7rem' }}>
            Cycle {Math.min(cycleIndex + 1, TOTAL_CYCLES)} of {TOTAL_CYCLES}
          </p>
        </div>
      </div>

      {/* Breathing circle section */}
      <div className="flex flex-col items-center justify-center flex-shrink-0 py-2" style={{ height: '42%' }}>
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div key="breathing" className="flex flex-col items-center gap-6">
              {/* Phase label */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: 'italic',
                    color: currentPhase.color,
                    fontSize: '1.1rem',
                  }}
                >
                  {currentPhase.label}
                </motion.p>
              </AnimatePresence>

              {/* Breathing circle */}
              <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
                {/* Outer glow rings */}
                {[1, 1.15, 1.3].map((s, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 100 * s,
                      height: 100 * s,
                      border: `1px solid ${currentPhase.color}`,
                      opacity: 0.2 - i * 0.05,
                    }}
                    animate={{ scale: circleScale }}
                    transition={{
                      duration:
                        currentPhase.phase === 'in'
                          ? 4
                          : currentPhase.phase === 'out'
                          ? 5
                          : 0.5,
                      ease: currentPhase.phase === 'hold' ? 'linear' : [0.4, 0, 0.2, 1],
                    }}
                  />
                ))}

                {/* Main circle */}
                <motion.div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 90,
                    height: 90,
                    background: `radial-gradient(circle, ${currentPhase.color}30, ${currentPhase.color}10)`,
                    border: `2px solid ${currentPhase.color}60`,
                  }}
                  animate={{ scale: circleScale }}
                  transition={{
                    duration:
                      currentPhase.phase === 'in'
                        ? 4
                        : currentPhase.phase === 'out'
                        ? 5
                        : 0.5,
                    ease: currentPhase.phase === 'hold' ? 'linear' : [0.4, 0, 0.2, 1],
                  }}
                >
                  <motion.div
                    className="rounded-full"
                    style={{ width: 36, height: 36, background: currentPhase.color + '40' }}
                    animate={{ scale: circleScale }}
                    transition={{
                      duration:
                        currentPhase.phase === 'in'
                          ? 4
                          : currentPhase.phase === 'out'
                          ? 5
                          : 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', damping: 14 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #5BA891, #8858A4)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14L11 19L22 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#2A2218',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                }}
              >
                Beautifully done
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mini weave preview - shows threads untangling */}
      <div className="mx-4 flex-shrink-0 rounded-2xl overflow-hidden relative" style={{ height: 130 }}>
        <WeaveCanvas stress={completed ? 18 : displayStress} />
        <div
          className="absolute bottom-2 left-3 right-3 flex items-center justify-between"
        >
          <span style={{ color: 'rgba(42,34,24,0.5)', fontSize: '0.65rem', fontWeight: 500 }}>
            Your threads
          </span>
          <span style={{ color: completed ? '#5BA891' : '#B84040', fontSize: '0.65rem', fontWeight: 600 }}>
            {completed ? 'Flowing' : 'Untangling…'}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {!completed && (
        <div className="mx-4 mt-3 flex-shrink-0">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #5BA891, #8858A4)`,
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      )}

      {/* Complete button */}
      <div className="mx-4 mt-4 flex-shrink-0 pb-8">
        {completed ? (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/balanced')}
            className="w-full py-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #5BA891 0%, #8858A4 100%)',
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(91,168,145,0.3)',
            }}
          >
            See your weave →
          </motion.button>
        ) : (
          <p
            className="text-center"
            style={{ color: '#C8BDB0', fontSize: '0.75rem' }}
          >
            Let your breath guide the threads…
          </p>
        )}
      </div>
    </div>
  );
}