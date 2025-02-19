import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export const FullPageSpinner = () => {
  const loader = useSelector((state) => state.loader.show);
  const theme = useTheme();

  return loader ? (
    <Box
      width="100vw"
      height="100vh"
      position="absolute"
      top={0}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backgroundColor: theme.background.default }}
    >
      <CircularProgress size="5rem" />
    </Box>
  ) : (
    <></>
  );
};
