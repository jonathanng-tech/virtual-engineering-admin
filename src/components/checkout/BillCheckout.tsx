import { Typography, Box, Button, useMediaQuery } from '@mui/material';
import { productStore, useBrandStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { ProductEntity } from '@/types/model';
import theme from '@/themes';
import { useDimensionStore } from '@/store/useDimensionStore';

interface BillCheckoutProps {
  // pdfContentPageTwoRef: React.RefObject<HTMLDivElement>;
  onClickReceiveEstimate: () => void;
}
export default function BillCheckout({
  // pdfContentPageTwoRef,
  onClickReceiveEstimate,
}: BillCheckoutProps): JSX.Element {
  const { activeStore } = useBrandStore();
  const { listCart } = productStore();
  const { totalDimension } = useDimensionStore();
  const isTablet = useMediaQuery(theme.breakpoints.down('desktop'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const totalPrice = calculateTotalPrice(listCart);

  return (
    <Box>
      <Box
        // ref={pdfContentPageTwoRef}
        sx={{
          marginTop: isMobile ? 'auto' : '0',
          height: isMobile ? 'max-content' : '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: {
            mobile: '16px 16px 32px 16px',
            desktop: '20% 5%',
            tablet: '16px 16px 0px 16px',
          },
          boxSizing: 'border-box',
        }}
      >
        {activeStore != null &&
          activeStore.tenant.settings.showPrice == true && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                justifyContent: isMobile ? 'space-between' : 'initial',
                alignItems: isMobile ? 'end' : 'initial',
                padding: isMobile ? '16px 0px 32px 0px' : '0px',
              }}
            >
              <Typography
                sx={{
                  color: '#666666',
                  fontSize: isMobile ? '20px' : '26px',
                  fontWeight: '500',
                }}
              >
                Total price
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  fontSize: isMobile ? '24px' : '30px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {formatInputCurrency(totalPrice.toString(), '$', false)}
              </Typography>
            </Box>
          )}
        {totalPrice > (activeStore!.tenant.settings.minDiscountQuota ?? 0) && (
          <Typography
            sx={{
              color: 'red',
              fontSize: '14px',
              lineHeight: '1.3',
            }}
          >
            After you have received the quote in the email, call us right away
            for a further 10% discount.
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            marginTop: isMobile ? '30px' : '0',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: isMobile ? 'space-between' : 'initial',
            alignItems: isMobile ? 'start' : 'initial',
            marginBottom: isMobile ? '21%' : 0,
            padding: isMobile ? '0px' : '0px',
            // margin-bottom: 21%;
            // padding: 10px;
          }}
        >
          <Typography
            sx={{
              color: '#666666',
              fontSize: isMobile ? '20px' : '26px',
              fontWeight: '500',
              marginTop: isMobile ? '0' : '30px',
            }}
          >
            Total dimension
          </Typography>
          <Box>
            <Typography
              sx={{
                color: 'black',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                marginTop: '5px',
              }}
            >
              Width: <span>{totalDimension.x}mm</span>
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
              }}
            >
              Depth: <span>{totalDimension.z}mm</span>
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
              }}
            >
              Height: <span>{totalDimension.y}mm</span>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: isMobile ? 'auto' : '0',
          height: isMobile ? 'max-content' : '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: { mobile: '0px', desktop: '20% 5%', tablet: '5% 0px' },
          boxSizing: 'border-box',
        }}
      >
        <Button
          onClick={onClickReceiveEstimate}
          sx={{
            order: isMobile ? 0 : 2,
            background: 'black',
            color: 'white',
            padding: '10px 0',
            fontSize: '16px',
            position: 'fixed',
            bottom: isTablet ? '0px' : isMobile ? '0px' : '30px',
            fontWeight: '600',
            width: isTablet ? '100%' : isMobile ? '100%' : '320px',
            textAlign: 'center',
            borderRadius: 0,
          }}
        >
          Receive Estimate
        </Button>
      </Box>
    </Box>
  );
}

export const calculateTotalPrice = (listCart: ProductEntity[]) => {
  return listCart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.toString() ?? '0');
    return total + (isNaN(itemPrice) ? 0 : itemPrice);
  }, 0);
};
