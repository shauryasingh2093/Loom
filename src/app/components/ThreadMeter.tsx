interface ThreadMeterProps {
  type: 'environment' | 'body' | 'mind';
  level: number;
}

const TYPE_CONFIG = {
  environment: {
    color: '#5BA891',
    bg: 'rgba(91,168,145,0.12)',
    trackColor: 'rgba(91,168,145,0.2)',
    label: 'Environment',
    descriptor: (l: number) =>
      l < 25 ? 'Calm' : l < 50 ? 'Active' : l < 75 ? 'Stimulated' : 'Overwhelming',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C7 1 2 5 2 8.5C2 11.0376 4.23858 13 7 13C9.76142 13 12 11.0376 12 8.5C12 5 7 1 7 1Z" stroke="#5BA891" strokeWidth="1.4" fill="rgba(91,168,145,0.15)"/>
        <path d="M7 6V11" stroke="#5BA891" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  body: {
    color: '#B84040',
    bg: 'rgba(184,64,64,0.1)',
    trackColor: 'rgba(184,64,64,0.15)',
    label: 'Body',
    descriptor: (l: number) =>
      l < 25 ? 'Relaxed' : l < 50 ? 'Engaged' : l < 75 ? 'Tense' : 'Tight',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2.5C5.34315 2.5 4 3.84315 4 5.5C4 6.5 4.5 7.4 5.4 7.9L5 11.5H9L8.6 7.9C9.5 7.4 10 6.5 10 5.5C10 3.84315 8.65685 2.5 7 2.5Z" stroke="#B84040" strokeWidth="1.4" fill="rgba(184,64,64,0.12)" strokeLinejoin="round"/>
      </svg>
    ),
  },
  mind: {
    color: '#8858A4',
    bg: 'rgba(136,88,164,0.1)',
    trackColor: 'rgba(136,88,164,0.15)',
    label: 'Mind',
    descriptor: (l: number) =>
      l < 25 ? 'Clear' : l < 50 ? 'Busy' : l < 75 ? 'Racing' : 'Overloaded',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2" fill="rgba(136,88,164,0.2)" stroke="#8858A4" strokeWidth="1.3"/>
        <path d="M7 1V2.5M7 11.5V13M1 7H2.5M11.5 7H13M2.93 2.93L4 4M10 10L11.07 11.07M11.07 2.93L10 4M4 10L2.93 11.07" stroke="#8858A4" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export function ThreadMeter({ type, level }: ThreadMeterProps) {
  const cfg = TYPE_CONFIG[type];
  const pct = Math.max(0, Math.min(100, level));

  return (
    <div className="flex items-center gap-3 px-1">
      {/* Icon bubble */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: cfg.bg }}
      >
        {cfg.icon}
      </div>

      {/* Label + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-xs tracking-wide"
            style={{ color: '#5A5044', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
          >
            {cfg.label}
          </span>
          <span
            className="text-xs"
            style={{ color: cfg.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
          >
            {cfg.descriptor(level)}
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: cfg.trackColor }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
