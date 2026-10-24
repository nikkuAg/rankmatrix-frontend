'use client';

import React, { memo } from 'react';
import { TableBody, TableCell, TableRow, useTheme } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { NoDataComponent } from '@/components/NoData';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { sameCatalogueRows } from '@/utils/sameCatalogueRows.mjs';

// A refresh with identical public data should not rebuild every styled cell.
// Theme context still updates these cells when the user changes theme.
export const CollegeRows = memo(function CollegeRows({ colleges, expandedNirf, nirfYears }) {
  const theme = useTheme();
  return (
    <TableBody>
      {colleges?.length > 0 ? (
        colleges?.map((college, i) => (
          <TableRow
            key={college.code}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
              ...(i === colleges.length - 1 && {
                '& td': {
                  borderBottom: '0px !important',
                },
              }),
            }}
          >
            <TableCell>{college.code}</TableCell>
            <TableCell>
              {college.slug ? (
                <AppLink href={`/colleges/${college.slug}`}>{college.name}</AppLink>
              ) : (
                college.name
              )}
            </TableCell>
            <TableCell>{instituteType(college)}</TableCell>
            <TableCell>{college.state}</TableCell>
            {!expandedNirf && (
              <TableCell
                sx={{
                  borderRight: '0px !important',
                  transition: 'all 0.3s ease',
                  ...(expandedNirf && {
                    colSpan: nirfYears.length,
                  }),
                }}
              >
                {college.nirfRanks.find((rank) => rank.year === nirfYears[0])?.rank || '-'}
              </TableCell>
            )}
            {expandedNirf &&
              nirfYears.map((year, i) => (
                <TableCell
                  key={year}
                  sx={
                    i === nirfYears.length - 1 && {
                      borderRight: '0px !important',
                    }
                  }
                >
                  {college.nirfRanks.find((rank) => rank.year === year)?.rank || '-'}
                </TableCell>
              ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <NoDataComponent colSpan={8} />
        </TableRow>
      )}
    </TableBody>
  );
}, sameCatalogueRows);
