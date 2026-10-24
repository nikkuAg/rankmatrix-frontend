'use client';

import React, { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { sameCatalogueRows } from '@/utils/sameCatalogueRows.mjs';
import styles from './CollegeRows.module.css';

// A refresh with identical public data should not rebuild every styled cell.
// Theme context still updates these cells when the user changes theme.
export const CollegeRows = memo(function CollegeRows({ colleges, expandedNirf, nirfYears }) {
  const theme = useTheme();
  return (
    <tbody
      className={styles.body}
      style={{
        '--rm-cell-text': theme.palette.text.primary,
        '--rm-row-hover': theme.palette.primary.light,
        '--rm-empty-text': theme.palette.text.main,
      }}
    >
      {colleges?.length > 0 ? (
        colleges?.map((college) => (
          <tr key={college.code} className={styles.row}>
            <td>{college.code}</td>
            <td>
              {college.slug ? (
                <Link href={`/colleges/${college.slug}`} prefetch={false}>
                  {college.name}
                </Link>
              ) : (
                college.name
              )}
            </td>
            <td>{instituteType(college)}</td>
            <td>{college.state}</td>
            {!expandedNirf && (
              <td className={styles.collapsedRank}>
                {college.nirfRanks.find((rank) => rank.year === nirfYears[0])?.rank || '-'}
              </td>
            )}
            {expandedNirf &&
              nirfYears.map((year) => (
                <td key={year}>
                  {college.nirfRanks.find((rank) => rank.year === year)?.rank || '-'}
                </td>
              ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            className={styles.empty}
            colSpan={4 + (expandedNirf ? Math.max(nirfYears.length, 1) : 1)}
          >
            <div>
              <span>No results match the selected filters.</span>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}, sameCatalogueRows);
