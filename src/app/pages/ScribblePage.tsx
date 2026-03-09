import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLoom } from '../context/LoomContext';

/* ─── Thread colour palette ─────────────────────────────────── */
const THREAD_COLORS = [
  { id: 'mind',        color: '#8858A4', label: 'Mind',        glyph: '✦' },
  { id: 'body',        color: '#B84040', label: 'Body',        glyph: '◎' },
  { id: 'environment', color: '#5BA891', label: 'Earth',       glyph: '≈' },
  { id: 'ink',         color: '#3A3028', label: 'Ink',         glyph: '●' },
  { id: 'gold',        color: '#C8883A', label: 'Gold',        glyph: '◇' },
];

const BRUSH_SIZES = [3, 6, 11, 18];

interface Point { x: number; y: number }
interface Stroke { points: Point[]; color: string; size: number; opacity: number }

/* ─── Smooth catmull-rom spline ─────────────────────────────── */
function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = stroke.opacity;
  ctx.shadowColor = stroke.color;
  ctx.shadowBlur = stroke.size * 0.4;

  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

  if (stroke.points.length === 2) {
    ctx.lineTo(stroke.points[1].x, stroke.points[1].y);
  } else {
    for (let i = 1; i < stroke.points.length - 1; i++) {
      const mx = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
      const my = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, mx, my);
    }
    const last = stroke.points[stroke.points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  ctx.stroke();
  ctx.restore();
}

export function ScribblePage() {
  const navigate = useNavigate();
  const { stress, resolveStress } = useLoom();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [activeColor, setActiveColor] = useState(THREAD_COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
  const [opacity, setOpacity] = useState(0.85);
  const [showPrompt, setShowPrompt] = useState(true);
  const [saved, setSaved] = useState(false);

  const drawing = useRef(false);

  /* ── Resize canvas ──────────────��──────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    redraw(canvas, strokes, null);
  }, []);

  /* ── Redraw all strokes ─────────────────────────────────── */
  const redraw = useCallback(
    (canvas: HTMLCanvasElement, allStrokes: Stroke[], live: Stroke | null) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      allStrokes.forEach(s => drawStroke(ctx, s));
      if (live) drawStroke(ctx, live);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    redraw(canvas, strokes, currentStroke);
  }, [strokes, currentStroke, redraw]);

  /* ── Pointer helpers ────────────────────────────────────── */
  const getXY = (e: React.PointerEvent): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (showPrompt) setShowPrompt(false);
    drawing.current = true;
    canvasRef.current?.setPointerCapture(e.pointerId);
    const pt = getXY(e);
    setCurrentStroke({ points: [pt], color: activeColor.color, size: brushSize, opacity });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || !currentStroke) return;
    const pt = getXY(e);
    setCurrentStroke(prev => prev ? { ...prev, points: [...prev.points, pt] } : prev);
  };

  const onPointerUp = () => {
    if (!drawing.current || !currentStroke) return;
    drawing.current = false;
    if (currentStroke.points.length > 1) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
  };

  const handleUndo = () => setStrokes(prev => prev.slice(0, -1));
  const handleClear = () => { setStrokes([]); setShowPrompt(true); };

  const handleSave = () => {
    setSaved(true);
    resolveStress();
    setTimeout(() => navigate('/balanced'), 1100);
  };

  /* ── Stress-based bg tint ───────────────────────────────── */
  const bgTint = stress > 70
    ? 'rgba(184,64,64,0.04)'
    : stress > 40
    ? 'rgba(200,136,58,0.04)'
    : 'rgba(91,168,145,0.04)';

  /* ── Prompts ────────────────────────────────────────────── */
  const prompts = [
    'What does your tension look like right now?',
    'Draw the shape of your breath.',
    'Scribble the weight you\'re carrying.',
    'What colour is your mind today?',
    'Trace the edges of how you feel.',
  ];
  const prompt = prompts[Math.floor(stress / 20) % prompts.length];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `#F5F3E3`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* Dynamic Island safe area — DI ends at y=50, give 14px breathing room */}
      <div style={{ height: 64, flexShrink: 0 }} />

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 4,
          paddingBottom: 10,
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <button
          onClick={() => navigate('/companion')}
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
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#5A5044" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Lora', serif", color: '#2A2218', fontSize: '1.05rem', fontWeight: 500 }}>
            Untangle
          </h2>
          <p style={{ color: '#AFA090', fontSize: '0.64rem', marginTop: 1 }}>
            draw what words can't hold
          </p>
        </div>

        {/* Undo */}
        <button
          onClick={handleUndo}
          disabled={strokes.length === 0}
          style={{
            background: strokes.length > 0 ? 'rgba(136,88,164,0.1)' : 'rgba(0,0,0,0.04)',
            border: 'none',
            borderRadius: 10,
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: strokes.length > 0 ? 'pointer' : 'default',
            opacity: strokes.length > 0 ? 1 : 0.4,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 6H9C11.2 6 13 7.8 13 10C13 12.2 11.2 14 9 14H5" stroke="#8858A4" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M5.5 3.5L3 6L5.5 8.5" stroke="#8858A4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>

      {/* ── Canvas area ────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          margin: '0 14px',
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(160deg, #FDFCF6 0%, ${bgTint.replace('0.04', '0.09')} 100%)`,
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          touchAction: 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />

        {/* Prompt overlay */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  opacity: 0.12,
                  color: activeColor.color,
                }}
              >
                {activeColor.glyph}
              </div>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                  color: 'rgba(90,80,68,0.4)',
                  textAlign: 'center',
                  paddingLeft: 32,
                  paddingRight: 32,
                  lineHeight: 1.6,
                }}
              >
                {prompt}
              </p>
              <p style={{ fontSize: '0.62rem', color: 'rgba(90,80,68,0.28)' }}>
                touch to begin
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute',
                bottom: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(136,88,164,0.92)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '7px 18px',
                borderRadius: 100,
                whiteSpace: 'nowrap',
              }}
            >
              ✦ Threads releasing…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Controls ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          flexShrink: 0,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 0,
        }}
      >
        {/* Colour row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
          {THREAD_COLORS.map(tc => (
            <motion.button
              key={tc.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => setActiveColor(tc)}
              title={tc.label}
              style={{
                width: activeColor.id === tc.id ? 34 : 28,
                height: activeColor.id === tc.id ? 34 : 28,
                borderRadius: '50%',
                background: tc.color,
                border: activeColor.id === tc.id ? `3px solid #FDFCF6` : '2px solid transparent',
                boxShadow: activeColor.id === tc.id ? `0 0 0 2px ${tc.color}, 0 4px 12px ${tc.color}44` : '0 2px 6px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* Brush size + opacity row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Brush sizes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {BRUSH_SIZES.map(size => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: brushSize === size ? `${activeColor.color}18` : 'transparent',
                  border: brushSize === size ? `1.5px solid ${activeColor.color}` : '1.5px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: Math.max(3, size * 0.7),
                    height: Math.max(3, size * 0.7),
                    borderRadius: '50%',
                    background: activeColor.color,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Opacity slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flex: 1 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke={activeColor.color} strokeWidth="1.3" fill={`${activeColor.color}30`}/>
            </svg>
            <input
              type="range"
              min={0.2}
              max={1}
              step={0.05}
              value={opacity}
              onChange={e => setOpacity(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: activeColor.color, height: 3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Footer actions ────────────────────��────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={{
          display: 'flex',
          gap: 10,
          padding: '10px 16px 28px',
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleClear}
          disabled={strokes.length === 0}
          style={{
            flex: 1,
            padding: '13px 0',
            borderRadius: 14,
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            color: '#8A7E70',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: strokes.length > 0 ? 'pointer' : 'default',
            opacity: strokes.length > 0 ? 1 : 0.4,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Clear
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={strokes.length === 0}
          style={{
            flex: 2,
            padding: '13px 0',
            borderRadius: 14,
            background: strokes.length === 0
              ? 'rgba(0,0,0,0.08)'
              : `linear-gradient(135deg, #8858A4 0%, #B84040 100%)`,
            border: 'none',
            color: strokes.length === 0 ? '#AFA090' : '#fff',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: strokes.length > 0 ? 'pointer' : 'default',
            boxShadow: strokes.length > 0 ? '0 6px 20px rgba(136,88,164,0.35)' : 'none',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            opacity: strokes.length === 0 ? 0.5 : 1,
          }}
        >
          Release Threads
        </motion.button>
      </motion.div>
    </div>
  );
}