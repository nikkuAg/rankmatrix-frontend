'use client';
import { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from './themes';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
        },
        text: {
          black: themes[mode].textBlack,
          white: themes[mode].textWhite,
        },
        toast: {
          success: themes[mode].success,
          error: themes[mode].error,
          warning: themes[mode].warning,
        },
        typography: {
          fontFamily: themes[mode].font,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
