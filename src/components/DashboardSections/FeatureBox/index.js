"use client";

import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Participating Colleges",
    image: "/college.svg",
    link: "/colleges",
  },
  {
    title: "Participating Branches",
    image: "/college.svg",
    link: "#",
  },
  {
    title: "Seat Matrix",
    image: "/seat.svg",
    link: "#",
  },
  {
    title: "Opening & Closing Ranks",
    image: "/rank.svg",
    link: "#",
  },
  {
    title: "Predict Your College",
    image: "/predict.svg",
    link: "#",
  },
  {
    title: "Prediction Matrix",
    image: "/matrix.svg",
    link: "#",
  },
  {
    title: "Test Your JoSAA Choices",
    image: "/choices.svg",
    link: "#",
  },
  {
    title: "Important Documents",
    image: "/doc.svg",
    link: "#",
  },
];

const FeatureCard = ({ title, image, link }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card
      sx={{
        width: "100%",
        height: "13rem",
        boxShadow: `0px 0px 55px 6px ${theme.palette.shadow.main}`,
      }}
    >
      <CardActionArea sx={{ width: "100%", height: "100%" }} onClick={() => router.push(link)}>
        <CardMedia
          sx={{
            width: "100%",
            height: "75%",
            backgroundColor: theme.background.light,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isLoading && <Skeleton variant="rounded" width={"100%"} height={"100%"} />}
          <Image
            src={image}
            alt={title}
            width={10}
            height={10}
            onLoad={() => setIsLoading(false)}
            style={{ width: "auto", height: "100%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography textAlign={"center"}>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const FeatureBox = () => {
  return (
    <Grid2
      width={"100%"}
      height={"100%"}
      px={1}
      gridTemplateColumns={"1fr 1fr 1fr"}
      rowGap={2}
      columnGap={2}
      display={"grid"}
    >
      {features.map((feature, index) => (
        <FeatureCard title={feature.title} image={feature.image} link={feature.link} key={index} />
      ))}
    </Grid2>
  );
};
