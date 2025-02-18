"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { themes } from "../constants/themes";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setMode(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setMode("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newMode);
      }
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: themes[mode].primary,
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
        a: {
          color: `${theme.palette.text.link} !important`,
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
