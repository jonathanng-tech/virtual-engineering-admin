import { drawerStore, productStore } from '@/store';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { emitter, THREE_EVENTS } from '@/utils/events';
import * as React from 'react';
import theme from '@/themes';
import { Bounce, toast } from 'react-toastify';
import { StyleEntity } from '@/types/model';

interface ColorItemProps {
  item: StyleEntity;
  onCloseDrawer: () => void;
}
export default function ColorItem({
  item,
  onCloseDrawer,
}: ColorItemProps): React.ReactElement {
  const { activeTypeStyle } = drawerStore();
  const {
    listCart,
    isLoading,
    cabinetColor,
    benchtopColor,
    setLoading,
    setCabinetColor,
    setBenchtopColor,
  } = productStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  function setStyle() {
    if (listCart.length === 0) {
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
      return;
    }
    setLoading(true);
    if (item?.type === 'CABINET') {
      setCabinetColor(item);
    } else {
      setBenchtopColor(item);
    }
    emitter.emit(
      THREE_EVENTS.changeMaterial,
      item?.type?.toLowerCase(),
      `${import.meta.env.VITE_S3_URL}/${item.path}`
    );
    onCloseDrawer();
  }

  const selectedStyle =
    activeTypeStyle === 'CABINET' ? cabinetColor : benchtopColor;

  return (
    <Box
      sx={{
        width: 'max-content',
        cursor: 'pointer',
        display: 'flex',
        gap: '8px',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px',
        height: 'max-content',
        ':focus': {
          border: 'none',
          outline: 'none',
          background: 'transparent !important',
          boxShadow: 'none !important',
        },
        ':focus-visible': {
          border: 'none',
          outline: 'none',
          background: 'transparent !important',
          boxShadow: 'none !important',
        },
      }}
      onClick={() => {
        setStyle();
      }}
    >
      <Box
        sx={{
          height: '110px',
          display: 'flex',
          width: '110px',
          boxSizing: 'border-box',
          border: selectedStyle == item ? '1px solid black' : '1px solid white',
        }}
      >
        <img
          onClick={() => {}}
          src={`${import.meta.env.VITE_S3_URL}/${item.path}`}
          width={105}
          height={105}
          alt=""
          style={{ margin: 'auto' }}
        />
      </Box>
      <Typography
        sx={{
          width: '105px',
          textWrap: 'wrap',
          fontSize: '14px',
          fontWeight: '500',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          lineClamp: 2,
        }}
      >
        {item.name}
      </Typography>
      {selectedStyle == item && isLoading && (
        <Box
          sx={{
            position: 'absolute',
            marginTop: '45px',
          }}
        >
          <CircularProgress size={20} sx={{ color: '#EBB91A' }} />
        </Box>
      )}
    </Box>
  );
}
