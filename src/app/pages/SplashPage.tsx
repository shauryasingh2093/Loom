import loomLogo from 'figma:asset/0b44ac3de2fa893d41c5bb94c8af295c20f2f39a.png';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export function SplashPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F5F0E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Island safe area spacer */}
      <div style={{ height: 56 }} />

      {/* Upper spacer — pushes tagline to ~38% from top */}
      <div style={{ flex: '1.4' }} />

      {/* Tagline above logo */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.82rem',
          color: '#9A8E80',
          letterSpacing: '0.015em',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        See the threads that shape you
      </motion.p>

      {/* Loom yarn logo */}
      <motion.img
        src={loomLogo}
        alt="Loom"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '100%',
          maxWidth: 373,
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Description below logo */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.8rem',
          color: '#5A5040',
          lineHeight: 1.75,
          textAlign: 'center',
          marginTop: 28,
          paddingLeft: 36,
          paddingRight: 36,
        }}
      >
        A speculative tool for sensing
        <br />
        the invisible threads of mind,
        <br />
        body, and environment.
      </motion.p>

      {/* Lower spacer — pushes button to ~82% */}
      <div style={{ flex: '1' }} />

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
        style={{
          width: '100%',
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 52,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/scan')}
          style={{
            width: '100%',
            paddingTop: 17,
            paddingBottom: 17,
            borderRadius: 100,
            background: '#6B605A',
            color: '#FFFFFF',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.82rem',
            letterSpacing: '0.16em',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            boxShadow: '0 4px 20px rgba(60,40,30,0.22)',
          }}
        >
          BEGIN WEAVING
        </motion.button>
      </motion.div>
    </div>
  );
}