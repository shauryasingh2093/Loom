import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

const SENSING_STEPS = [
  { label: 'Sensing environment…', color: '#5BA891', detail: 'light · noise · crowd density' },
  { label: 'Reading body signals…', color: '#B84040', detail: 'muscle tension · heart rate · breath' },
  { label: 'Mapping mind state…', color: '#8858A4', detail: 'focus · rumination · mental drift' },
  { label: 'Weaving your threads…', color: '#D4AC50', detail: 'forming your weave…' },
];

const THREAD_TYPES = [
  { label: 'Environment', color: '#5BA891', ring: 80, delay: 0 },
  { label: 'Body', color: '#B84040', ring: 56, delay: 0.3 },
  { label: 'Mind', color: '#8858A4', ring: 32, delay: 0.6 },
];

export function ScanPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const intervals: ReturnType<typeof setTimeout>[] = [];

    SENSING_STEPS.forEach((_, i) => {
      intervals.push(
        setTimeout(() => setStepIndex(i), i * 620)
      );
    });

    intervals.push(
      setTimeout(() => setDone(true), 2600)
    );

    intervals.push(
      setTimeout(() => navigate('/dashboard'), 3200)
    );

    return () => intervals.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between overflow-hidden"
      style={{ background: '#F5F3E3' }}
    >
      {/* Dynamic Island safe area */}
      <div style={{ height: 56 }} />

      {/* Center sensing visualization */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        {/* Pulsing rings */}
        <div className="relative" style={{ width: 220, height: 220 }}>
          {THREAD_TYPES.map((t, i) => (
            <div key={t.label} className="absolute inset-0 flex items-center justify-center">
              {/* Static ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: t.ring * 2,
                  height: t.ring * 2,
                  border: `1.5px solid ${t.color}40`,
                }}
              />
              {/* Animated pulse rings */}
              {[0, 0.8, 1.6].map((d, di) => (
                <motion.div
                  key={di}
                  className="absolute rounded-full"
                  style={{
                    width: t.ring * 2,
                    height: t.ring * 2,
                    border: `2px solid ${t.color}`,
                  }}
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 1 + 0.5 / (i + 1) }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: t.delay + d,
                    ease: 'easeOut',
                  }}
                />
              ))}
              {/* Label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: t.delay + 0.4, duration: 0.5 }}
                className="absolute text-xs"
                style={{
                  color: t.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translateY(${-t.ring - 12}px)`,
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </motion.span>
            </div>
          ))}

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="rounded-full"
              style={{ background: 'linear-gradient(135deg, #8858A4 0%, #5BA891 100%)' }}
              animate={{ width: done ? 48 : [8, 12, 8], height: done ? 48 : [8, 12, 8] }}
              transition={done ? { duration: 0.4 } : { duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Sensing step label */}
        <div className="mt-12 h-14 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-1"
            >
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  color: SENSING_STEPS[stepIndex].color,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {SENSING_STEPS[stepIndex].label}
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: '#AFA090',
                  fontSize: '0.75rem',
                }}
              >
                {SENSING_STEPS[stepIndex].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 pb-10">
        {SENSING_STEPS.map((s, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === stepIndex ? 20 : 6,
              background: i <= stepIndex ? s.color : '#D4C8BC',
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}