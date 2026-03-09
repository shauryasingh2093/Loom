import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export type NavTab = 'loom' | 'threads' | 'guide' | 'weave';

interface Tab {
  id: NavTab;
  label: string;
  path: string;
  color: string;
  icon: (active: boolean) => ReactNode;
}

const TABS: Tab[] = [
  {
    id: 'loom',
    label: 'Loom',
    path: '/dashboard',
    color: '#8858A4',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke={active ? '#8858A4' : '#C0B4A8'} strokeWidth="1.5"
          fill={active ? 'rgba(136,88,164,0.1)' : 'none'} />
        <path d="M11 3.5C11 3.5 8.2 6.5 8.2 11C8.2 13.2 9.4 15 11 15C12.6 15 13.8 13.2 13.8 11C13.8 6.5 11 3.5 11 3.5Z"
          fill={active ? '#8858A4' : '#C0B4A8'} opacity="0.75" />
        <path d="M3.5 11C3.5 11 6.5 9.5 11 9.5C15.5 9.5 18.5 11 18.5 11"
          stroke={active ? '#5BA891' : '#C0B4A8'} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'threads',
    label: 'Threads',
    path: '/threads',
    color: '#5BA891',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2.5 6.5C5 4.8 8 7 10.5 5.5C13 4 15.5 2.8 19.5 4.5"
          stroke={active ? '#5BA891' : '#C0B4A8'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.5 11C5.5 9.2 8.5 12.5 11.5 10.5C14.5 8.5 17 11.5 19.5 10"
          stroke={active ? '#8858A4' : '#C0B4A8'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.5 15.5C5 14 7.5 16.5 10.5 15.2C13.5 14 16 16 19.5 15"
          stroke={active ? '#B84040' : '#C0B4A8'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'guide',
    label: 'Guide',
    path: '/guide',
    color: '#C8883A',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke={active ? '#C8883A' : '#C0B4A8'} strokeWidth="1.5"
          fill={active ? 'rgba(200,136,58,0.08)' : 'none'} />
        <path d="M11 6.5C11 6.5 8.8 9 8.8 11C8.8 12.2 9.8 13.2 11 13.2C12.2 13.2 13.2 12.2 13.2 11C13.2 9 11 6.5 11 6.5Z"
          fill={active ? '#C8883A' : '#C0B4A8'} opacity="0.6" />
        <circle cx="11" cy="15.5" r="1" fill={active ? '#C8883A' : '#C0B4A8'} />
      </svg>
    ),
  },
  {
    id: 'weave',
    label: 'Weave',
    path: '/weave',
    color: '#B84040',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2.5 9C5 7.5 7.5 10.5 10 9C12.5 7.5 15 10 17.5 8.5C18.8 7.8 20 8.5 19.5 9"
          stroke={active ? '#B84040' : '#C0B4A8'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.5 13C5 11.5 7.5 14.5 10 13C12.5 11.5 15 14 17.5 12.5C18.8 11.8 20 12.5 19.5 13"
          stroke={active ? '#C8883A' : '#C0B4A8'} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M2.5 17C4.5 15.8 7 18 10 17C13 16 15.5 17.5 19.5 17"
          stroke={active ? '#5BA891' : '#C0B4A8'} strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
];

export function BottomNav({ active }: { active: NavTab }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingBottom: 26,
        paddingLeft: 4,
        paddingRight: 4,
        borderTop: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(245,243,227,0.97)',
        flexShrink: 0,
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 14px',
              borderRadius: 14,
              position: 'relative',
              minWidth: 56,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 14,
                  background: `${tab.color}13`,
                  boxShadow: `0 0 14px ${tab.color}28`,
                }}
                transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              />
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {tab.icon(isActive)}
            </div>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? tab.color : '#B0A494',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '0.01em',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
