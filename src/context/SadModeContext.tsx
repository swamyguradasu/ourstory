import React, { createContext, useContext, useState, useEffect } from 'react';

interface SadModeContextType {
  isSadMode: boolean;
  toggleSadMode: () => void;
  setSadMode: (enabled: boolean) => void;
}

const STORAGE_KEY = 'our_story_sad_mode';

const SadModeContext = createContext<SadModeContextType | undefined>(undefined);

export const SadModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSadMode, setIsSadMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'true'; // Default is false (OFF)
    } catch {
      return false;
    }
  });

  const toggleSadMode = () => {
    setIsSadMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore localStorage errors
      }
      return next;
    });
  };

  const setSadMode = (enabled: boolean) => {
    setIsSadMode(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
  };

  return (
    <SadModeContext.Provider value={{ isSadMode, toggleSadMode, setSadMode }}>
      {children}
    </SadModeContext.Provider>
  );
};

export const useSadMode = (): SadModeContextType => {
  const context = useContext(SadModeContext);
  if (!context) {
    throw new Error('useSadMode must be used within a SadModeProvider');
  }
  return context;
};
