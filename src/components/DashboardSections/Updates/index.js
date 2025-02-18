"use client";

import React from "react";

import { SITE_CONTENT } from "@/constants/siteContent";
import { Box, useTheme } from "@mui/material";

import { ContentListCard } from "../ContentListCard";

export const Updates = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height={"80%"}
      sx={{
        backgroundColor: theme.background.dark,
        borderRadius: "12px",
        boxShadow: `0px 0px 15px -6px ${theme.palette.shadow.main}`,
        color: theme.palette.text.main,
      }}
    >
      <ContentListCard height={"50%"} title={"Updates"} contentType={SITE_CONTENT.UPDATES} />
      <ContentListCard height={"50%"} title={"Important Links"} contentType={SITE_CONTENT.LINKS} />
    </Box>
  );
};
