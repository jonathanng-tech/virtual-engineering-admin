import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { productStore } from '@/store';
import { itemPriceStyle, itemTextStyle } from './styles';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { formatInputCurrency } from '@/utils/currency';
import theme from '@/themes';
import { ProductEntity } from '@/types/model';
import { productTitle } from './styles/product';
import { buildThumbnailPath } from '@/utils/helper';

interface ListItemProps {
  item: ProductEntity;
  sx?: object;
  onCloseDrawer?: () => void;
}

export default function ListItem({
  item,
  sx,
  onCloseDrawer,
}: ListItemProps): React.ReactElement {
  const { isLoading, setLoading, activeProduct, setActiveProduct } =
    productStore();

  const [isRight, setIsRight] = React.useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  // const { setOpenDrawerMobile } = drawerStore();

  const handleClickAddLeft = (item: ProductEntity) => {
    setIsRight(false);
    setActiveProduct(item);
    setLoading(true);
    emitter.emit(THREE_EVENTS.addLeft, item);
    isMobile && onCloseDrawer && onCloseDrawer();
  };

  const handleClickAddRight = (item: ProductEntity) => {
    setIsRight(true);
    setActiveProduct(item);
    setLoading(true);
    emitter.emit(THREE_EVENTS.addRight, item);
    isMobile && onCloseDrawer && onCloseDrawer();
  };

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: '8px',
        padding: '15px 12px',
        margin: '10px 0',
      }}
    >
      <Box sx={itemContentBoxStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Thumbnail
            src={buildThumbnailPath(item.path!, item.thumbnail!) ?? ''}
          />
          <Typography sx={itemPriceStyle}>
            {formatInputCurrency(item?.price?.toString() ?? '', '$', false)}
          </Typography>
        </Box>
        <Box sx={itemInfoBoxStyle}>
          <Typography sx={productTitle}>{item.name}</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              columnGap: '5px',
              flexWrap: 'wrap',
              marginTop: 'auto',
            }}
          >
            <Button
              sx={actionButtonStyle}
              onClick={() => {
                handleClickAddLeft(item);
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  textTransform: 'capitalize',
                }}
              >
                {isLoading && activeProduct == item && isRight == false && (
                  <Box
                    sx={{
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      position: 'absolute',
                      zIndex: 999,
                      width: '95%',
                      height: '95%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress
                      size="16px"
                      sx={{
                        margin: 'auto',
                        circle: {
                          stroke: 'black !important',
                        },
                      }}
                    />
                  </Box>
                )}
                Add left
              </Typography>
            </Button>
            <Button
              sx={actionButtonStyle}
              onClick={() => {
                handleClickAddRight(item);
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  textTransform: 'capitalize',
                }}
              >
                {isLoading && activeProduct == item && isRight && (
                  <Box
                    sx={{
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      position: 'absolute',
                      zIndex: 999,
                      width: '95%',
                      height: '95%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress
                      size="16px"
                      sx={{
                        margin: 'auto',
                        circle: {
                          stroke: 'black !important',
                        },
                      }}
                    />
                  </Box>
                )}
                Add Right
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Thumbnail({ src }: { src: string }) {
  return (
    <Box sx={thumbnailBoxStyle}>
      <img
        src={src}
        alt=""
        width={60}
        // height={69}
      />
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

const thumbnailBoxStyle = {};

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
