"use client";

import React from "react";

import { LightMode } from "@mui/icons-material";
import { DarkMode } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { useThemeContext } from "../../theme/ThemeContext";

export const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar position="static" sx={{ py: 2, background: theme.background.main }} elevation={0}>
      <Container maxWidth="xl">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={2}>
            <Avatar
              alt="Logo"
              src={`${mode === "dark" ? "/logoDark.svg" : "/logo.svg"}`}
              variant="square"
            />
            <Typography
              variant="h4"
              sx={{
                mr: 2,
                fontWeight: "500",
                display: "flex",
                color: theme.palette.text.main,
              }}
            >
              RankMatrix
            </Typography>
          </Stack>
          <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.main }}>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Stack>
      </Container>
    </AppBar>
  );
};
