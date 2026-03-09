import { Outlet } from 'react-router';
import { LoomProvider } from '../context/LoomContext';

function PhoneFrame() {
  return (
    <div
      style={{
        position: 'relative',
        width: 393,
        height: 852,
        flexShrink: 0,
      }}
    >
      {/* Phone body */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #2A2828 0%, #111010 40%, #0A0909 100%)',
          borderRadius: 54,
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.12),
            0 50px 120px rgba(0,0,0,0.7),
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(255,255,255,0.04)
          `,
        }}
      />

      {/* Side titanium sheen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 54,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.04) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Silent switch */}
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 152,
          width: 3,
          height: 30,
          background: 'linear-gradient(180deg, #3A3838, #222020)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }}
      />
      {/* Volume up */}
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 204,
          width: 3,
          height: 54,
          background: 'linear-gradient(180deg, #3A3838, #222020)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }}
      />
      {/* Volume down */}
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 274,
          width: 3,
          height: 54,
          background: 'linear-gradient(180deg, #3A3838, #222020)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }}
      />
      {/* Power button */}
      <div
        style={{
          position: 'absolute',
          right: -3,
          top: 218,
          width: 3,
          height: 80,
          background: 'linear-gradient(180deg, #3A3838, #222020)',
          borderRadius: '0 2px 2px 0',
          boxShadow: '1px 0 3px rgba(0,0,0,0.5)',
        }}
      />

      {/* Screen */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
          borderRadius: 46,
          overflow: 'hidden',
          background: '#F5F0E8',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            background: '#0A0909',
            borderRadius: 20,
            width: 120,
            height: 36,
            boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        />

        {/* App content */}
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <Outlet />
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            width: 134,
            height: 5,
            background: 'rgba(30,24,20,0.28)',
            borderRadius: 100,
          }}
        />
      </div>

      {/* USB-C port (decorative) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 32,
          height: 4,
          background: '#1A1818',
          borderRadius: '0 0 3px 3px',
          boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.6)',
        }}
      />

      {/* Top speaker (decorative) */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 5,
          height: 5,
          background: '#1A1818',
          borderRadius: '50%',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export function Root() {
  return (
    <LoomProvider>
      <div
        style={{
          minHeight: '100dvh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(90,60,40,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 80%, rgba(40,30,60,0.12) 0%, transparent 60%),
            #161210
          `,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: '24px 16px',
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        {/* Ambient glow behind phone */}
        <div
          style={{
            position: 'fixed',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(136,88,164,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <PhoneFrame />
        </div>
      </div>
    </LoomProvider>
  );
}
