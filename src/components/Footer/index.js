"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.main} width={"100%"} color={theme.palette.text.light} p={1}>
      RankMatrix
    </Box>
  );
};
