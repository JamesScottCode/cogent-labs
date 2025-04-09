import React from 'react';
import { ScreenSizeProvider } from './screenSizeContext';
import { ThemeProvider } from 'styled-components';
import { HeaderProvider } from './headerContext';
import { theme } from '../consts/theme';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ScreenSizeProvider>
    <ThemeProvider theme={theme}>
      <HeaderProvider>{children}</HeaderProvider>
    </ThemeProvider>
  </ScreenSizeProvider>
);

export default AppProviders;
