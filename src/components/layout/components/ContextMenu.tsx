import { ProductEntity } from '@/types/model';
import { formatInputCurrency } from '@/utils/currency';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { drawerStore, productStore, useBrandStore } from '@/store';
import theme from '@/themes';
import { styleButtonMobile } from './styles';
import { productPrice, productTitle } from './styles/product';
import { buildThumbnailPath } from '@/utils/helper';
import { CATEGORY } from '@/configs/constant';

interface ContextMenuProps {
  removeModelFn?: () => void;
  kitchenModelRef: any;
}

const ActionButton = ({
  label,
  onClick,
  sx,
  isMobile,
  disabled,
}: {
  isMobile: boolean;
  label: string;
  sx?: object;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    sx={{ ...(isMobile ? styleButtonMobile : buttonStyle), ...sx }}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </Button>
);

export default function ContextMenu({
  removeModelFn,
  kitchenModelRef,
}: ContextMenuProps): React.ReactElement {
  const { removeListCart, filterProductsByCategory, filterProductsByKeyword } =
    productStore();
  const product: ProductEntity = kitchenModelRef.current.model.product;
  const hasTop = !!kitchenModelRef.current.model.relatedModel;
  const isOpened: boolean = kitchenModelRef.current.animationOpened;
  const [isAnimation, setIsAnimation] = React.useState<boolean>(isOpened);
  const hasAnimation = false;
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { openHandleDrawer, setOpenDrawerMobile } = drawerStore();
  const { activeSeries } = useBrandStore();

  const onClickAddRangeHood = () => {
    filterProductsByCategory('range-hood', activeSeries?.id);
    filterProductsByKeyword('');
    isMobile ? setOpenDrawerMobile('PRODUCT') : openHandleDrawer();
    emitter.emit(THREE_EVENTS.animationAddRangeHood);
  };

  return (
    <Box
      sx={{
        ...styleContextMenu,
        bottom: isMobile ? '15px' : '100px',
        minWidth: isMobile ? '90%' : '390px',
        maxWidth: '450px',
        zIndex: isMobile ? 9999 : '',
        width: isMobile ? '95%' : 'max-content',
        marginLeft: 'auto',
        marginRight: isMobile ? 'auto' : '10px',
        backgroundColor: isMobile ? 'white' : 'rgb(255 255 255 / 50%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {product?.price != 0 ? (
        <Typography
          sx={{
            ...productPrice,
            color: 'white',
            background: '#848484',
            padding: '3px 6px',
            marginRight: 'auto',
            position: 'absolute',
            top: '5px',
            left: '-3px',
            borderRadius: '3px',
          }}
        >
          {formatInputCurrency(product?.price.toString() ?? '', '$', false)}
        </Typography>
      ) : (
        ''
      )}
      <Box
        sx={{
          ...priceLabelStyle,
          background: 'black',
          left: 'initial',
          top: '-8px',
          right: '-8px',
          borderRadius: '50px',
          padding: '2px',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => emitter.emit(THREE_EVENTS.hideContextMenu)}
      >
        <CloseRoundedIcon sx={{ color: 'white' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box
          sx={{
            background: '#F5F5F5',
            height: '100%',
          }}
        >
          <img
            src={buildThumbnailPath(product.path!, product.thumbnail!)}
            alt={product.name}
            width={100}
            height={100}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ ...productTitle }}>{product.name}</Typography>
          <Typography
            sx={{ ...productTitle, fontSize: '14px', margin: '5px 0' }}
          >
            D:{' '}
            <span style={{ fontWeight: '500' }}>
              {product.defaultSize?.w ?? ''}W x {product.defaultSize?.d ?? ''}D
              x {product.defaultSize?.h ?? ''}H
            </span>
          </Typography>
        </Box>
      </Box>
      <>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          {removeModelFn && (
            <ActionButton
              isMobile={isMobile}
              label="Remove"
              sx={{
                marginTop: '12px',
                width: '100px',
                minWidth: '100px',
                color: 'white',
                background: '#d90d0d',
                border: 'none',
                ':hover': {
                  background: '#d90d0d',
                  border: 'none',
                },
                '&:focus': {
                  background: 'none',
                  border: '1px solid #d90d0d',
                  outline: 'none',
                },
                '&:hover': {
                  background: 'none',
                  border: '1px solid #d90d0d',
                  outline: 'none',
                },
              }}
              onClick={() => {
                removeModelFn();
              }}
            />
          )}
          {product.categoryId == CATEGORY.BBQ && (
            <ActionButton
              isMobile={isMobile}
              sx={{
                marginTop: '12px',
                marginLeft: removeModelFn ? '0px' : '108px',
                width: '140px',
                color: '#3692CF',
                border: '1px solid #3692CF',
                '&:focus': {
                  background: 'none',
                  border: '1px solid #3692CF',
                  outline: 'none',
                },
                '&:hover': {
                  background: 'none',
                  border: '1px solid #3692CF',
                  outline: 'none',
                },
              }}
              label={'Add Range Hood'}
              onClick={onClickAddRangeHood}
              disabled={hasTop}
            />
          )}
          {/* {!hasAnimation && (
            <ActionButton
              isMobile={isMobile}
              sx={{
                marginTop: '12px',
                color: '#3692CF',
                border: '1px solid #3692CF',
                '&:focus': {
                  background: 'none',
                  border: '1px solid #3692CF',
                  outline: 'none',
                },
                '&:hover': {
                  background: 'none',
                  border: '1px solid #3692CF',
                  outline: 'none',
                },
              }}
              label={isAnimation ? 'Close Hood/Drawers' : 'Open Hood/Drawers'}
              onClick={() => {
                setIsAnimation(!isAnimation);
                kitchenModelRef.current.playAnimations();
              }}
            />
          )} */}
        </Box>
      </>
    </Box>
  );
}

const buttonStyle = {
  border: '1px solid #211d1e',
  color: '#000000',
  fontSize: '12px',
  fontWeight: '400',
  padding: '1px 8px',
  '&:focus': {
    background: 'none',
    border: '1px solid #211d1e',
    outline: 'none',
  },
  '&:hover': {
    background: 'none',
    border: '1px solid #211d1e',
    outline: 'none',
  },
};

const priceLabelStyle = {
  position: 'absolute',
  left: 0,
  top: '8px',
  background: '#EDECEA',
  width: 'max-content',
};

const styleContextMenu = {
  boxSizing: 'border-box',
  position: 'fixed',
  padding: '24px 12px 10px 12px',
  borderRadius: '5px',
  zIndex: 9,
  width: 'max-content',
  left: 0,
  right: 0,
};
