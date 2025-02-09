'use client';
import { Box, Grid2, Typography, useTheme } from '@mui/material';
import { useIsMobile } from '../utils/screenSizeHook';
import { Updates } from '../components/DashboardSections/Updates';

const Home = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  return (
    <Grid2
      container
      columns={{ xs: 2, sm: 5, lg: 9 }}
      rowSpacing={1}
      columnSpacing={1}
    >
      <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
        <Box>Heu</Box>
        <Updates />
      </Grid2>
      {!isMobile && (
        <Grid2 size={{ sm: 2, lg: 5 }}>
          <Box>Heu</Box>
        </Grid2>
      )}
      <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
        <Box>Heu</Box>
      </Grid2>
      {isMobile && (
        <Grid2 size={2}>
          <Box>Heuuu</Box>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Home;
