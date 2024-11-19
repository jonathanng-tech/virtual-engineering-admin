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
          <h3>WELCOME TO VIRTUAL ENGINEERING ADMIN!</h3>
        </center>
      </div>
    </MainLayout>
  );
};

export default HomePage;
