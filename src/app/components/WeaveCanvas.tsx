import { useEffect, useRef } from 'react';

interface ThreadDef {
  id: string;
  color: string;
  highlightColor: string;
  type: 'environment' | 'body' | 'mind';
  yBase: number;
  phase: number;
  freq: number;
  amp: number;
  thickness: number;
}

const THREADS: ThreadDef[] = [
  // Environment (teals/greens)
  { id: 'e1', color: '#5BA891', highlightColor: '#8ECFBC', type: 'environment', yBase: 0.22, phase: 0.0, freq: 0.018, amp: 14, thickness: 1.9 },
  { id: 'e2', color: '#7DC4AD', highlightColor: '#A5D9CA', type: 'environment', yBase: 0.31, phase: 1.6, freq: 0.014, amp: 18, thickness: 1.5 },
  { id: 'e3', color: '#469080', highlightColor: '#72B5A8', type: 'environment', yBase: 0.40, phase: 3.2, freq: 0.022, amp: 12, thickness: 2.1 },
  { id: 'e4', color: '#9AD4C1', highlightColor: '#C0E8DC', type: 'environment', yBase: 0.49, phase: 4.8, freq: 0.016, amp: 16, thickness: 1.3 },
  { id: 'e5', color: '#65B89F', highlightColor: '#92CFBE', type: 'environment', yBase: 0.57, phase: 0.9, freq: 0.020, amp: 13, thickness: 1.7 },

  // Body (reds/oranges)
  { id: 'b1', color: '#B84040', highlightColor: '#D47A7A', type: 'body', yBase: 0.29, phase: 2.3, freq: 0.020, amp: 15, thickness: 1.9 },
  { id: 'b2', color: '#CF6048', highlightColor: '#E8967E', type: 'body', yBase: 0.39, phase: 0.8, freq: 0.016, amp: 20, thickness: 1.5 },
  { id: 'b3', color: '#A82828', highlightColor: '#D06060', type: 'body', yBase: 0.48, phase: 5.2, freq: 0.024, amp: 11, thickness: 2.1 },
  { id: 'b4', color: '#E08868', highlightColor: '#EFBBA4', type: 'body', yBase: 0.58, phase: 3.5, freq: 0.017, amp: 17, thickness: 1.3 },
  { id: 'b5', color: '#C85848', highlightColor: '#DC9080', type: 'body', yBase: 0.67, phase: 1.9, freq: 0.021, amp: 14, thickness: 1.7 },

  // Mind (purples/mauves)
  { id: 'm1', color: '#8858A4', highlightColor: '#B490CC', type: 'mind', yBase: 0.25, phase: 5.9, freq: 0.019, amp: 13, thickness: 1.9 },
  { id: 'm2', color: '#A878C2', highlightColor: '#CAACDC', type: 'mind', yBase: 0.35, phase: 4.3, freq: 0.015, amp: 19, thickness: 1.5 },
  { id: 'm3', color: '#6840B0', highlightColor: '#9E7ACC', type: 'mind', yBase: 0.44, phase: 2.7, freq: 0.023, amp: 12, thickness: 2.1 },
  { id: 'm4', color: '#C498D8', highlightColor: '#DCC4EC', type: 'mind', yBase: 0.53, phase: 1.1, freq: 0.018, amp: 18, thickness: 1.3 },
  { id: 'm5', color: '#9868B8', highlightColor: '#C09CD0', type: 'mind', yBase: 0.63, phase: 3.7, freq: 0.021, amp: 14, thickness: 1.7 },
];

function drawThread(
  ctx: CanvasRenderingContext2D,
  thread: ThreadDef,
  time: number,
  stress: number,
  w: number,
  h: number
) {
  const N = 60;
  const pts: { x: number; y: number }[] = [];

  const stressedYBase = thread.yBase + (0.5 - thread.yBase) * stress * 0.7;
  const stressedAmp = thread.amp * (1 + stress * 2.2);
  const stressedFreq = thread.freq * (1 + stress * 1.2);

  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = t * w;

    const wave = Math.sin(x * stressedFreq + time * 0.38 + thread.phase) * stressedAmp;
    const wave2 = Math.cos(x * stressedFreq * 0.55 + time * 0.22 + thread.phase + 1.2) * stressedAmp * 0.25;

    const chaos =
      stress *
      (Math.sin(x * 0.07 + time * 2.1 + thread.phase * 2.3) * 32 +
        Math.cos(x * 0.12 + time * 1.6 + thread.phase * 0.7) * 20);

    const vib = stress * Math.sin(x * 0.30 + time * 5.5 + thread.phase) * 7;

    const y = stressedYBase * h + wave + wave2 + chaos + vib;
    pts.push({ x, y });
  }

  const drawCurve = (offsetY: number) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y + offsetY);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2 + offsetY;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y + offsetY, mx, my);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y + offsetY);
  };

  // Shadow
  ctx.save();
  drawCurve(1.2);
  ctx.strokeStyle = 'rgba(0,0,0,0.07)';
  ctx.lineWidth = thread.thickness + 1.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();

  // Main thread
  ctx.save();
  drawCurve(0);
  ctx.strokeStyle = thread.color + 'CC';
  ctx.lineWidth = thread.thickness;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();

  // Highlight
  ctx.save();
  drawCurve(-0.6);
  ctx.strokeStyle = thread.highlightColor + '55';
  ctx.lineWidth = thread.thickness * 0.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();
}

interface WeaveCanvasProps {
  stress: number;
  className?: string;
}

export function WeaveCanvas({ stress, className = '' }: WeaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stressRef = useRef(stress);
  const animRef = useRef<number>(0);

  useEffect(() => {
    stressRef.current = stress;
  }, [stress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };
    setup();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const startTime = performance.now();
    let currentStress = stressRef.current;

    const render = (ts: number) => {
      const time = (ts - startTime) / 1000;
      currentStress += (stressRef.current - currentStress) * 0.025;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#F5F3E3';
      ctx.fillRect(0, 0, w, h);

      // Low stress: golden center glow
      if (currentStress < 40) {
        const alpha = ((40 - currentStress) / 40) * 0.28;
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.5);
        glow.addColorStop(0, `rgba(212, 172, 80, ${alpha})`);
        glow.addColorStop(1, 'rgba(245, 243, 227, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      // High stress: warm red edge vignette
      if (currentStress > 50) {
        const alpha = ((currentStress - 50) / 50) * 0.12;
        const edge = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.15, w * 0.5, h * 0.5, w * 0.75);
        edge.addColorStop(0, 'rgba(245, 243, 227, 0)');
        edge.addColorStop(1, `rgba(180, 50, 30, ${alpha})`);
        ctx.fillStyle = edge;
        ctx.fillRect(0, 0, w, h);
      }

      THREADS.forEach((thread) => drawThread(ctx, thread, time, currentStress / 100, w, h));

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
