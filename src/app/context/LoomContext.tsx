import { createContext, useContext, useState, ReactNode } from 'react';

export interface ThreadState {
  environment: number;
  body: number;
  mind: number;
}

interface LoomContextType {
  stress: number;
  threads: ThreadState;
  setStress: (v: number) => void;
  setThreads: (t: ThreadState) => void;
  resolveStress: () => void;
  resetStress: () => void;
}

const LoomContext = createContext<LoomContextType | null>(null);

export function LoomProvider({ children }: { children: ReactNode }) {
  const [stress, setStress] = useState(68);
  const [threads, setThreads] = useState<ThreadState>({
    environment: 48,
    body: 80,
    mind: 64,
  });

  const resolveStress = () => {
    setStress(18);
    setThreads({ environment: 15, body: 22, mind: 18 });
  };

  const resetStress = () => {
    setStress(68);
    setThreads({ environment: 48, body: 80, mind: 64 });
  };

  return (
    <LoomContext.Provider value={{ stress, threads, setStress, setThreads, resolveStress, resetStress }}>
      {children}
    </LoomContext.Provider>
  );
}

export function useLoom() {
  const ctx = useContext(LoomContext);
  if (!ctx) throw new Error('useLoom must be used within LoomProvider');
  return ctx;
}
