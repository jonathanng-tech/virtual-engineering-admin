import { Box, Typography } from '@mui/material';
import * as React from 'react';

import { drawerStore, productStore, useBrandStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { ProductEntity } from '@/types/model';
import { productPrice, productTitle } from '../styles/product';
import { buildThumbnailPath } from '@/utils/helper';

interface GridItemMobileProps {
  item: ProductEntity;
}

export default function GridItemMobile({
  item,
}: GridItemMobileProps): React.ReactElement {
  const { activeProduct, setActiveProduct } = productStore();
  const { openModalProduct, setShowHideModal } = drawerStore();
  const { activeStore } = useBrandStore();
  return (
    <Box
      className="__gridItem_mobile"
      sx={{
        position: 'relative',
        height: 'max-content',
        cursor: 'pointer',
        width: 'calc(50% - 8px)',
        padding: '0',
        marginBottom: '16px',
        '&.MuiPaper-root': { boxShadow: 'none !important' },
      }}
      onClick={() => {
        setActiveProduct(item);
        setShowHideModal(true);
      }}
    >
      <Box
        sx={{
          width: '100%',
          margin: '8px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          '.MuiBox-root': {
            margin: '0px !important',
          },
          '&.MuiBox-root': {
            margin: '0px !important',
          },
          border:
            activeProduct == item ? '1px solid black' : '1px solid transparent',
        }}
      >
        <div
          style={{
            background: '#F5F5F5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
          }}
        >
          <img
            src={buildThumbnailPath(item.path!, item.thumbnail!)}
            alt=""
            width={120}
            height={120}
          />
        </div>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginTop: '8px',
          textAlign: 'center',
        }}
      >
        <Typography sx={productTitle}>{item.name}</Typography>
        {activeStore != null &&
          activeStore.tenant.settings.showPrice == true && (
            <Typography
              sx={{
                marginTop: '4px',
                ...productPrice,
              }}
            >
              {item?.price != 0
                ? formatInputCurrency(item?.price.toString() ?? '', '$', false)
                : ''}
            </Typography>
          )}
      </div>
    </Box>
  );
}
