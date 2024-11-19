import { useBrandStore } from '@/store';
import {
  Box,
  Button,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import IconLocation from '/icons/ic_location.png';

export default function Header(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { brand, store } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { activeStore } = useBrandStore();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const getLogoSize = () => {
  //   if (isDesktop) return { height: 35 };
  //   if (isTablet) return { height: 35 };
  //   return { height: 35 };
  // };

  return (
    <Box
      className="__header __header_mobile"
      sx={{
        ...styles.headerBox,
        position: brand != null && store != null ? 'relative' : 'relative',
        zIndex: 99999999,
      }}
    ></Box>
  );
}

const styles = {
  link: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto',
  },
  headerBox: {
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px !important',
    boxSizing: 'border-box',
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 10000,
  },
  locationButton: {
    display: 'flex',
    gap: '3px',
    alignItems: 'center',
    cursor: 'pointer',
    ':focus': {
      border: 'none',
      outline: 'none',
    },
  },
  locationText: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  },
  expandIcon: {
    color: 'white',
    fontSize: '14px',
  },
  menu: {
    position: 'absolute',
    zIndex: 99999999,
    marginTop: '20px',
    '.MuiPaper-root': {
      width: '250px',
      borderRadius: '8px',
    },
    ul: {
      padding: 0,
    },
    li: {
      padding: '8px 12px',
      height: 'max-content',
      minHeight: 'unset',
      ':hover': {
        background: 'transparent',
      },
    },
  },
};
