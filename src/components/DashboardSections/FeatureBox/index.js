'use client';

import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';

const features = [
  {
    title: 'Predict Your College',
    image: '/matrix.svg',
    imageDark: '/matrix_dark.svg',
    link: '/predict',
  },
  {
    title: 'Opening & Closing Ranks',
    image: '/rank.svg',
    imageDark: '/rank_dark.svg',
    link: '/ranks',
  },
  {
    title: 'Seat Matrix',
    image: '/seat.svg',
    imageDark: '/seat_dark.svg',
    link: '/seat-matrix',
  },
  {
    title: 'Participating Colleges',
    image: '/college.svg',
    imageDark: '/college_dark.svg',
    link: '/colleges',
  },
  {
    title: 'Participating Branches',
    image: '/branch.svg',
    imageDark: '/branch_dark.svg',
    link: '/branches',
  },
  // {
  //   title: 'Prediction Matrix',
  //   image: '/matrix.svg',
  //   imageDark: '/matrix.svg',
  //   link: '/matrix',
  // },
  // {
  //   title: 'Test Your JoSAA Choices',
  //   image: '/choices.svg',
  //   imageDark: '/choices.svg',
  //   link: '/test-choices',
  // },
  // {
  //   title: 'Important Documents',
  //   image: '/doc.svg',
  //   imageDark: '/doc.svg',
  //   link: '/documents',
  // },
];

const FeatureCard = ({ title, image, link }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '16rem' },
        height: '13rem',
        boxShadow: `0px 0px 55px 6px ${theme.palette.shadow.main}`,
        p: 1,
        borderRadius: 2,
        backgroundColor: theme.background.default,
      }}
    >
      <CardActionArea
        component={Link}
        href={link}
        prefetch={false}
        data-analytics-handled="tool_opened"
        sx={{ width: '100%', height: '100%' }}
        onClick={() => {
          sendAnalyticsEvent({
            action: 'tool_opened',
            category: 'navigation',
            label: title,
            value: 1,
          });
        }}
      >
        <CardMedia
          sx={{
            width: '100%',
            height: '75%',
            backgroundColor: theme.background.light,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {isLoading && (
            <Skeleton
              variant="rounded"
              sx={{ position: 'absolute', inset: 0 }}
              width={'100%'}
              height={'100%'}
            />
          )}
          <Image
            src={image}
            alt={title}
            width={180}
            height={144}
            onLoad={() => setIsLoading(false)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </CardMedia>
        <CardContent>
          <Typography textAlign={'center'}>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const FeatureBox = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      height={'100%'}
      px={0.5}
      gap={1}
      flexWrap={'wrap'}
      justifyContent={'space-evenly'}
    >
      {features.map((feature, index) => (
        <FeatureCard
          title={feature.title}
          image={theme.palette.mode === 'dark' ? feature.imageDark : feature.image}
          link={feature.link}
          key={index}
        />
      ))}
    </Stack>
  );
};
