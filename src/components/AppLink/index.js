'use client';

import React from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export const AppLink = ({ href, children, ...rest }) => {
  return (
    <MuiLink component={Link} href={href} prefetch={false} underline="always" {...rest}>
      {children}
    </MuiLink>
  );
};
