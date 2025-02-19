"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useIsScreenAllowed } from "../../utils/screenSizeHook";
import { FullPageSpinner } from "../FullPageSpinner";
import { Navbar } from "../Navbar";
import { SnackBar } from "../Snackbar";

export const RankMatrixLayout = ({ children }) => {
  const theme = useTheme();
  const isAllowed = useIsScreenAllowed();
  return (
    <Box
      sx={{
        backgroundColor: theme.background.main,
        width: "100vw",
        height: "100vh",
      }}
    >
      {isAllowed ? (
        <Stack height={"100%"} width={"100%"}>
          <Navbar />
          <Box flexGrow={1} p={2}>
            {children}
          </Box>
          <SnackBar />
          {/* <FullPageSpinner /> */}
        </Stack>
      ) : (
        <Typography
          color={theme.palette.warning.main}
          p="auto"
          display="flex"
          alignItems="center"
          height="100%"
          textAlign="center"
        >
          Device Screen Size not supported. Try with some larger device
        </Typography>
      )}
    </Box>
  );
};
