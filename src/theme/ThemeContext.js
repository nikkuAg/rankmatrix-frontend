'use client';
import { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from '../constants/themes';
import { useEffect } from 'react';
import { GlobalStyles } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

/**
 * A component that wraps your app with a MUI theme provider and a context provider
 * to manage the theme mode.
 *
 * The theme mode is stored in local storage and defaults to 'light' if no value is
 * stored. If the user's system is set to dark mode, the theme will default to 'dark'
 * unless a different value is stored in local storage.
 *
 * The context provides the current theme mode and a function to toggle the theme
 * mode between 'light' and 'dark'.
 *
 * This component should be used at the root of your app, and should wrap all other
 * components that need access to the theme mode.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setMode(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
      }
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            ...themes[mode].primary,
            main: themes[mode].primary['100'],
          },
          secondary: {
            ...themes[mode].secondary,
            main: themes[mode].secondary['100'],
          },
          tertiary: {
            ...themes[mode].tertiary,
            main: themes[mode].tertiary['100'],
          },
          text: {
            primary: themes[mode].textPrimary,
            secondary: themes[mode].textSecondary,
          },
          success: { ...themes[mode].success },
          error: { ...themes[mode].error },
          warning: { ...themes[mode].warning },
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
        a: {
          color: `${theme.palette.primary[70]} !important`,
        },
        p: {
          margin: 0,
        },
      }}
    />
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
