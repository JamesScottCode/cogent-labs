import React from 'react';
import { ScreenSizeProvider } from './screenSizeContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../consts/theme';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ScreenSizeProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </ScreenSizeProvider>
);

export default AppProviders;
