import React, { createContext, useContext, useState } from 'react';

interface HeaderContextProps {
  title: string;
  updateTitle: (newTitle: string) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
};

interface HeaderProviderProps {
  children: React.ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>('Restaurant Finder');

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <HeaderContext.Provider value={{ title, updateTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};
