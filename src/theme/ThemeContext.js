'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themes } from '@/constants/themes';
import { sendAnalyticsEvent } from '../utils/analyticEvent';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  // SSR renders 'light' to match the server-rendered HTML; the first
  // client-only effect reconciles from localStorage / prefers-color-scheme.
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reconciling from localStorage / prefers-color-scheme after hydration is
    // what setState-in-effect is actually for — we can't read these APIs
    // during SSR without a hydration mismatch.
    /* eslint-disable react-hooks/set-state-in-effect */
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      setMode(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
    sendAnalyticsEvent({
      action: 'theme_changed',
      category: 'dashboard',
      label: 'Theme changed',
      value: newMode,
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: themes[mode].primary,
          gray: themes[mode].gray,
          text: themes[mode].text,
          success: { main: themes[mode].alert.success },
          error: { main: themes[mode].alert.error },
          warning: { main: themes[mode].alert.warning },
          low: themes[mode].alert.low,
          shadow: themes[mode].shadow,
        },
        typography: {
          fontFamily: themes[mode].font,
        },
        background: themes[mode].background,
      }),
    [mode],
  );

  const globalStyles = (
    <GlobalStyles
      styles={{
        body: { backgroundColor: theme.background.main },
        a: { color: `${theme.palette.text.link} !important` },
        p: { margin: 0 },
        th: {
          borderBottom: `1px solid ${theme.palette.gray.light} !important`,
          borderRight: `1px solid ${theme.palette.gray.light} !important`,
        },
        td: {
          borderBottom: `1px solid ${theme.palette.gray.light} !important`,
          borderRight: `1px solid ${theme.palette.gray.light} !important`,
        },
        tr: {
          '&:hover': {
            '& td': { borderRight: `1px solid ${theme.palette.gray.dark} !important` },
          },
        },
      }}
    />
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, mounted }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
