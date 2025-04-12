import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from 'react';

export type ScreenSize =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'desktop2k'
  | 'desktop4k';

interface ScreenSizeContextProps {
  screenSize: ScreenSize;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(
  undefined,
);

interface ScreenSizeProviderProps {
  children: ReactNode;
}

const getInitialScreenSize = (): ScreenSize => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 600) return 'mobile';
    if (width < 1025) return 'tablet'; // 1025 instead of 1024 for ipad pro
    if (width < 2560) return 'desktop';
    if (width < 3840) return 'desktop2k';
    return 'desktop4k';
  }
  return 'desktop';
};

export const ScreenSizeProvider: FC<ScreenSizeProviderProps> = ({
  children,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(
    getInitialScreenSize(),
  );

  useEffect(() => {
    const determineScreenSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize('mobile');
      } else if (width < 1025) {
        setScreenSize('tablet');
      } else if (width < 2560) {
        setScreenSize('desktop');
      } else if (width < 3840) {
        setScreenSize('desktop2k');
      } else {
        setScreenSize('desktop4k');
      }
    };

    window.addEventListener('resize', determineScreenSize);
    return () => window.removeEventListener('resize', determineScreenSize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

// Custom hook to access the context
export const useScreenSize = (): ScreenSizeContextProps => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};
