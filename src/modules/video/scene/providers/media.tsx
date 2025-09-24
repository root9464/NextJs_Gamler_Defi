'use client';
import { useMedia } from '@/shared/hooks/useMedia';
import { createContext, FC, ReactNode, useContext } from 'react';

type MediaContextType = ReturnType<typeof useMedia>;

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const media = useMedia({ videoConstraints: true, audioConstraints: true });
  return <MediaContext.Provider value={media}>{children}</MediaContext.Provider>;
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};
