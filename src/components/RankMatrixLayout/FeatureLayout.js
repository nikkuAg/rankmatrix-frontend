"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

export const FeatureLayout = ({ children, title }) => {
  const theme = useTheme();
  return (
    <Stack>
      <Box
        width={"100%"}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.text.light}
        px={2}
        py={5}
      >
        <Typography variant={"h4"} fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Box flexGrow={1} width={"100%"}>
        {children}
      </Box>
    </Stack>
  );
};
