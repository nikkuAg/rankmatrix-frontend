'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { sameCatalogueRows } from '@/utils/sameCatalogueRows.mjs';
import styles from './CollegeRows.module.css';

export const CollegeRows = memo(function CollegeRows({ colleges, expandedNirf, nirfYears }) {
  return (
    <tbody className={styles.body}>
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
