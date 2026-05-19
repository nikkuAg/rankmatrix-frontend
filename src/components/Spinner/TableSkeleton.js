'use client';

import React from 'react';
import { Box, Skeleton, Stack, useTheme } from '@mui/material';
import { TableLayout } from '../TableLayout';

/**
 * Layout-preserving skeleton for tabular data while a query is in flight.
 *
 * Renders the same wrapper (`TableLayout`) the loaded table will, plus a
 * header row and N body rows of skeleton blocks. Picked over `<Spinner />`
 * because a layout-shaped placeholder is what AdSense / Google quality
 * reviewers and SEO crawlers see as "real content arriving", and it
 * avoids the jarring spinner → table swap.
 */
export const TableSkeleton = ({ rows = 10, columns = 5, headerHeight = 36, rowHeight = 28 }) => {
  const theme = useTheme();
  const colWidths = Array.from({ length: columns }, () => `${100 / columns}%`);

  const cellSx = {
    flex: 1,
    px: 1.5,
    py: 1,
    borderRight: `1px solid ${theme.palette.gray?.light ?? 'rgba(0,0,0,0.08)'}`,
    '&:last-of-type': { borderRight: 'none' },
  };

  return (
    <TableLayout>
      <Stack width="100%">
        <Stack
          direction="row"
          sx={{
            backgroundColor: theme.background.dark,
            borderBottom: `1px solid ${theme.palette.gray?.light ?? 'rgba(0,0,0,0.08)'}`,
          }}
        >
          {colWidths.map((w, i) => (
            <Box key={i} sx={cellSx} style={{ width: w }}>
              <Skeleton variant="text" width="70%" height={headerHeight} />
            </Box>
          ))}
        </Stack>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Stack
            key={rowIdx}
            direction="row"
            sx={{
              borderBottom: `1px solid ${theme.palette.gray?.light ?? 'rgba(0,0,0,0.05)'}`,
              '&:last-of-type': { borderBottom: 'none' },
            }}
          >
            {colWidths.map((w, colIdx) => (
              <Box key={colIdx} sx={cellSx} style={{ width: w }}>
                <Skeleton
                  variant="text"
                  width={`${50 + ((rowIdx * 7 + colIdx * 11) % 40)}%`}
                  height={rowHeight}
                />
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </TableLayout>
  );
};
