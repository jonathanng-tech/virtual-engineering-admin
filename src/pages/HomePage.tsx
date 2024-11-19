import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { MainLayout } from '@/components/layout';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <MainLayout>
      <div>
        <center>
          <h3>WELCOM TO VIRTUAL ENGINEERING LANDING PAGE!</h3>
        </center>
        <center>
          <a href="/grill-king">GO TO GRILL KING!</a>
        </center>
      </div>
    </MainLayout>
  );
};

export default HomePage;
