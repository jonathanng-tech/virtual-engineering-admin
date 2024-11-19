import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';

import { drawerStore, productStore, useBrandStore } from '@/store';
import { itemDescStyle, itemPriceStyle, itemTextStyle } from './../styles';

import { emitter, THREE_EVENTS } from '@/utils/events';
import { formatInputCurrency } from '@/utils/currency';
import theme from '@/themes';
import { ProductEntity } from '@/types/model';
import { buildThumbnailPath } from '@/utils/helper';

interface ListItemMobileProps {
  item: ProductEntity;
  sx?: object;
}

export default function ListItemMobile({
  item,
  sx,
}: ListItemMobileProps): React.ReactElement {
  const { activeProduct, setActiveProduct } = productStore();

  const [isRight, setIsRight] = React.useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { openModalProduct, setShowHideModal } = drawerStore();
  const { activeStore } = useBrandStore();
  return (
    <Box
      sx={{
        background: 'white',
        margin: '10px 0',
        width: '100%',
        height: 'max-content',
        border:
          activeProduct == item ? '1px solid black' : '1px solid transparent',
        overflow: 'hidden',
      }}
      onClick={() => {
        setActiveProduct(item);
        setShowHideModal(true);
      }}
    >
      <Box sx={itemContentBoxStyle}>
        <Box
          sx={{
            padding: '15px 12px',
            display: 'flex',
            flexDirection: 'column',
            background: '#F5F5F5',
          }}
        >
          <img
            src={buildThumbnailPath(item.path!, item.thumbnail!)}
            alt=""
            width={80}
          />
        </Box>
        <Box sx={itemInfoBoxStyle}>
          <Typography
            sx={{
              fontWeight: '500',
              whiteSpace: 'wrap',
              fontSize: '14px',
              lineHeight: '1.3',
            }}
          >
            {item.name}
          </Typography>
          {activeStore != null &&
            activeStore.tenant.settings.showPrice == true && (
              <Typography
                sx={{
                  // marginTop: 'auto',
                  fontWeight: '700',
                  whiteSpace: 'wrap',
                  fontSize: '14px',
                  lineHeight: '1.3',
                }}
              >
                {item?.price != 0
                  ? formatInputCurrency(
                      item?.price.toString() ?? '',
                      '$',
                      false
                    )
                  : ''}
              </Typography>
            )}
        </Box>
      </Box>
    </Box>
  );
}

const itemContentBoxStyle = {
  width: '100%',
  margin: '8px',
  display: 'flex',
  cursor: 'pointer',
  '&.MuiBox-root': {
    margin: '0px !important',
  },
  gap: '20px',
};

const itemInfoBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const actionButtonStyle = {
  marginTop: '5px',
  border: '1px solid #999999',
  color: '#211d1e',
  fontSize: '12px',
  fontWeight: '400',
  padding: '3px 5px',
  '&:hover': {
    background: 'none',
    border: '1px solid #211d1e',
  },
  '&:focus': {
    background: 'none',
    border: '1px solid #211d1e',
    outline: 'none',
  },
};
