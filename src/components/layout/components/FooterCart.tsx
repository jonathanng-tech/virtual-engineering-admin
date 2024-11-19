import * as React from 'react';
import { useEffect } from 'react';
import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  CircularProgress,
} from '@mui/material';
import { productStore, useBrandStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { Model, ProductEntity } from '@/types/model';
import { THREE_EVENTS, emitter } from '@/utils/events';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { delay } from 'lodash';

export default function FooterCart(): React.ReactElement {
  const { brand, store } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = !useMediaQuery(theme.breakpoints.down('desktop'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { listCart, reloadListCart, isLoading } = productStore();
  const { setShowCheckout } = useCheckoutStore();
  const { activeStore } = useBrandStore();
  const calculateTotalPrice = (listCart: ProductEntity[]) => {
    return listCart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString() ?? '0');
      return total + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
  };

  const totalPrice = calculateTotalPrice(listCart);

  useEffect(() => {
    emitter.on(THREE_EVENTS.onModelDidRemove, (payload: any) => {
      const { models } = payload;
      const products = models.map((item: Model) => item.product);
      reloadListCart(products);
    });
  }, []);

  const handleCheckout = () => {
    if (listCart.length == 0) {
      toast.warn('Please setup your kitchen.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } else {
      emitter.emit(THREE_EVENTS.screenShot, {});
      delay(() => {
        setShowCheckout(true);
      }, 10);
    }
  };
  return (
    <div
      style={{
        ...styleContainerFooterBox(isTablet),
        marginTop: 'auto',
        padding: '10px',
        // backgroundColor: 'white',
        backgroundColor: isMobile ? 'white' : 'rgb(255 255 255 / 50%)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        // borderTopLeftRadius: '20px',
        // borderBottomLeftRadius: '20px',
        borderRadius: '6px',
        width: isMobile ? '100%' : 'max-content',
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          ...styleFooterBox,
          height: 'max-content',
          width: {
            desktop: 'max-content',
            tablet: 'max-content',
            mobile: '100%',
          },
          background: isMobile ? 'white !important' : 'transparent',
          zIndex: 999,
          position: 'relative',
        }}
      >
        {activeStore != null &&
          activeStore.tenant.settings.showPrice == true && (
            <Box sx={priceBoxStyles(isTablet, isMobile)}>
              <Typography sx={totalPriceLabelStyles}>Total price</Typography>
              <Typography sx={totalPriceValueStyles(isMobile)}>
                {formatInputCurrency(totalPrice.toString(), '$', false)}
              </Typography>
            </Box>
          )}
        <Button
          disabled={isLoading}
          onClick={() => {
            handleCheckout();
          }}
          sx={getQuoteButtonStyles(isTablet, isMobile, listCart)}
        >
          Get quote
        </Button>
      </Box>
    </div>
  );
}

const FooterContent = ({
  isMobile,
  w,
  h,
  d,
}: {
  w: number;
  h: number;
  d: number;
  isMobile: boolean;
}) => (
  <>
    <Typography
      sx={{
        ...footerTextLabelStyles,
        fontSize: isMobile ? '12px' : '14px',
        marginBottom: isMobile ? '4px' : '8px',
      }}
    >
      Total Dimension:
      <span style={{ fontWeight: '500' }}>
        W{w}mm x D{d}mm x H{h}mm
      </span>
    </Typography>
    <Typography
      sx={{
        ...footerTextLabelStyles,
        fontSize: isMobile ? '12px' : '14px',
        marginBottom: isMobile ? '4px' : '8px',
      }}
    >
      Style:
      <span style={{ fontWeight: '500' }}>
        Polytec Black (cabinets) Polytec Cinder (benchtops)
      </span>
    </Typography>
  </>
);

// Styles
const styleContainerFooterBox = (isTablet: boolean) => {
  return {
    // background: 'white',
    bottom: '0px',
    // width: !isTablet ? '100%' : 'calc(100% - 65px)',
  };
};

const styleFooterBox = {
  background: '#f5f5f5',
  bottom: '0px',
  display: 'flex',
  alignItems: 'center',
};

const footerTextLabelStyles = {
  color: '#666666',
  fontWeight: '700',
};

const totalPriceLabelStyles = {
  marginLeft: 'auto',
  color: '#000',
  fontSize: '11px',
  fontWeight: '600',
  marginBottom: '4px',
};

const totalPriceValueStyles = (isMobile: boolean) => ({
  marginLeft: 'auto',
  color: '#211d1e',
  fontSize: isMobile ? '22px' : '24px',
  fontWeight: '600',
});

const priceBoxStyles = (isTablet: boolean, isMobile: boolean) => ({
  marginLeft: isTablet ? 'auto' : isMobile ? '16px' : '32px',
  marginRight: isTablet ? '0px' : 'auto',
});

const getQuoteButtonStyles = (
  isTablet: boolean,
  isMobile: boolean,
  listCart: ProductEntity[]
) => ({
  height: 'max-content',
  marginLeft: '16px',
  marginRight: '16px',
  border: '1px solid #848484',
  fontSize: '14px',
  fontWeight: '600',
  width: !isTablet ? '70%' : 'max-content',
  padding: isMobile ? '12px 0px' : '15px 20px',
  borderRadius: '6px',
  color: 'white',
  background: listCart.length != 0 ? 'black' : '#848484',
  textTransform: 'uppercase',
  '&:hover': {
    background: '#848484',
    border: '1px solid #848484',
  },
  '&:focus': {
    background: '#848484',
    border: '1px solid #848484',
    outline: 'none',
  },
  minWidth: '123px',
  minHeight: '56.5px',
});
