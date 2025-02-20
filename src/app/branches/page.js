import React from "react";
import { Typography } from "@mui/material";
import { FeatureLayout } from "@/components/RankMatrixLayout/FeatureLayout";

export const metadata = {
  title: "Participating Branches | RankMatrix",
  description:
    "List of branches participating in JoSAA counselling for admission in engineering colleges",
};

const Branch = () => {
  return (
    <FeatureLayout title={"Participating Branches"}>
      <Typography>Testing</Typography>
    </FeatureLayout>
  );
};

export default Branch;
