import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { StoreEntity } from '@/types/model';
import { Box, Grid2, Typography, useMediaQuery } from '@mui/material';
import IconLocation from '/icons/ic_location.png';
import theme from '@/themes';

interface BrandCardProps {
  store: StoreEntity;
  isActive: boolean;
  handleTapCard: () => void;
}

const BrandCard: React.FC<BrandCardProps> = ({
  store,
  isActive,
  handleTapCard,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Grid2
      size={{ mobile: 12, tablet: 3, desktop: 3 }}
      onClick={handleTapCard}
      key={store.name}
      sx={{
        borderRadius: '10px',
        padding: isMobile ? '12px' : '20px 25px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        backgroundColor: isActive ? '#F5943D' : 'black',
        ':hover': {
          backgroundColor: '#F5943D',
          color: 'black',
          '>p': {
            color: 'black !important',
          },
          '>div>p': {
            color: 'black !important',
          },
          '>div>p>img': {
            filter: 'drop-shadow(0px 300px 0 #000000) !important',
            transform: 'translateY(-300px)',
          },
        },
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontSize: '23px',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginBottom: isMobile ? '20px' : '30px',
          color: isActive ? 'black' : 'white',
          display: 'flex',
          gap: '10px',
        }}
      >
        {store.name}
        <Box
          sx={{
            width: '34px',
            minWidth: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'black',
            display: 'flex',
            marginLeft: 'auto',
          }}
        >
          <ArrowForwardRoundedIcon
            sx={{
              color: isActive ? '#F5943D' : 'white',
              margin: 'auto',
            }}
          />
        </Box>
      </Typography>

      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingRight: '24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '13px',
            color: isActive ? 'black' : 'white',
            display: 'flex',
            alignItems: 'start',
            marginRight: '8px',
          }}
        >
          <img
            src={IconLocation}
            alt="Location Icon"
            width={15}
            height={15}
            style={{
              marginRight: '5px',
              filter: 'drop-shadow(0px 300px 0 #000)',
            }}
          />
          {store.address}
        </Typography>
      </Box>
    </Grid2>
  );
};

export default BrandCard;
