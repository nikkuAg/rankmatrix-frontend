import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Link, Stack, Typography } from '@mui/material';
import { SITE_CONTENT } from '@/constants/siteContent';
import { useSiteContent } from '@/store/selectors/siteContent';

export const ContentListCard = ({ title, contentType, height }) => {
  const contentList = useSiteContent();
  return (
    <Stack gap={1.5} px={'1rem'} py={'1.5rem'} height={height}>
      <Typography fontWeight={'500'} fontSize={'1.2rem'}>
        {title}
      </Typography>
      <Box flexGrow={1} overflow={'auto'}>
        {contentType === SITE_CONTENT.UPDATES && (
          <Stack gap={1}>
            {contentList[SITE_CONTENT.UPDATES].map((content, index) => (
              <Stack key={index} gap={1} flexDirection={'row'} alignItems={'center'}>
                <CircleIcon sx={{ fontSize: '0.5rem' }} />
                <Typography
                  fontSize={'1rem'}
                  flexGrow={1}
                  margin={'0 !important'}
                  flexWrap={'wrap'}
                  component={'div'}
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              </Stack>
            ))}
          </Stack>
        )}
        {contentType === SITE_CONTENT.LINKS && (
          <Stack gap={1}>
            {contentList[SITE_CONTENT.LINKS].map((content, index) => (
              <Stack
                key={index}
                gap={1}
                flexDirection={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
              >
                <CircleIcon sx={{ fontSize: '0.5rem' }} />
                <Typography fontWeight={'500'}>{content.title}</Typography>
                <Link href={content.url} target="_blank" rel="noreferrer">
                  {content.url}
                </Link>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
};
