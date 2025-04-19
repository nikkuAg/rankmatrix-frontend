'use client';

import React, { useEffect, useState } from 'react';
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
import { sendGTMEvent } from '@next/third-parties/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/store/slices/loader';
import { useIsMobile } from '../../../utils/screenSizeHook';

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
  {
    title: 'Seat Matrix',
    image: '/seat.svg',
    imageDark: '/seat_dark.svg',
    link: '/seat-matrix',
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
  const isMobile550 = useIsMobile(550);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  return (
    <Card
      sx={{
        width: isMobile550 ? '100%' : '16rem',
        height: '13rem',
        boxShadow: `0px 0px 55px 6px ${theme.palette.shadow.main}`,
        p: 1,
        borderRadius: 2,
        backgroundColor: theme.background.default,
      }}
    >
      <CardActionArea
        sx={{ width: '100%', height: '100%' }}
        onClick={() => {
          router.push(link);
          sendGTMEvent({ event: `buttonClicked${title}`, value: 'xyz' });
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
          }}
        >
          {isLoading && <Skeleton variant="rounded" width={'100%'} height={'100%'} />}
          <Image
            src={image}
            alt={title}
            width={10}
            height={10}
            onLoad={() => setIsLoading(false)}
            style={{ width: 'auto', height: '100%' }}
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
