import {
  Box,
  Button,
  Divider,
  Link,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState, MouseEvent } from 'react';
import Logo from '/stores/logo.png';
import LogoPowered from '/stores/powered-by-ve.png';
import IconLocation from '/icons/ic_location.png';
import IconEmail from '/icons/ic_email.png';
import IconPhone from '/icons/ic_telephone.png';
import IconLeave from '/icons/ic_leave.png';
import IconLocationBlack from '/icons/ic_location_black.png';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useParams } from 'react-router-dom';
import AlertDialog from './DialogConfirm';
import { useBrandStore } from '@/store';

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
    >
      <AlertDialog handleClose={handleCloseDialog} open={openDialog} />
      <Link href="#" sx={styles.link}>
        <img
          src={activeStore?.tenant.thumbnail ?? Logo}
          alt="Logo"
          style={{ height: 35 }}
        />
        {/* {activeStore?.tenant.thumbnail && (
          <img
            src={LogoPowered}
            alt="Logo"
            style={{ height: 22, marginLeft: 14 }}
          />
        )} */}
      </Link>

      {brand != null && store != null && (
        <>
          <Button
            sx={styles.locationButton}
            disableRipple
            id="location-button"
            aria-controls={open ? 'location-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={IconLocation} alt="Location" width={isMobile ? 12 : 16} />
            <Typography
              sx={{
                ...styles.locationText,
                fontSize: isMobile ? '10px' : '14px',
                textAlign: 'start',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {activeStore?.name}
            </Typography>
            {/* <ExpandMoreRoundedIcon sx={styles.expandIcon} /> */}
          </Button>
          {/* <Menu
            id="location-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={styles.menu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose}>
              <Typography
                sx={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                  whiteSpace: 'wrap',
                }}
              >
                {`${activeStore?.tenantName} - ${activeStore?.name}`}
              </Typography>
            </MenuItem>
            <Divider />{' '}
            <MenuItem onClick={handleClose}>
              <img
                src={IconLocationBlack}
                alt="Location"
                width={isMobile ? 12 : 16}
                style={{ marginRight: '10px' }}
              />
              <Typography
                sx={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '400',
                  whiteSpace: 'wrap',
                }}
              >
                {activeStore?.address}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <img
                src={IconPhone}
                alt="Location"
                width={isMobile ? 12 : 16}
                style={{ marginRight: '10px' }}
              />
              <Typography
                sx={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '400',
                  whiteSpace: 'wrap',
                }}
              >
                {activeStore?.phone}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <img
                src={IconEmail}
                alt="Location"
                width={isMobile ? 12 : 16}
                style={{ marginRight: '10px' }}
              />
              <Typography
                sx={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '400',
                  whiteSpace: 'wrap',
                }}
              >
                {activeStore?.email}
              </Typography>
            </MenuItem>
            <Divider />{' '}
            <MenuItem
              onClick={handleClose}
              sx={{ height: 'max-content', padding: '0px !important' }}
            >
              <Button
                sx={{
                  color: 'black',
                  background: '#E2E2E2 !important',
                  backgroundColor: '#E2E2E2 !important',
                  textTransform: 'capitalize',
                  fontSize: '14px',
                  fontWeight: '600',
                  height: 'max-content',
                  padding: '3px 30px',
                  marginBottom: '10px',
                  marginLeft: 'auto',
                  gap: '5px',
                  marginRight: 'auto',
                }}
                onClick={() => handleClickOpenDialog()}
              >
                <img
                  src={IconLeave}
                  alt="Location"
                  width={isMobile ? 12 : 16}
                />
                Switch store
              </Button>
            </MenuItem>
          </Menu> */}
        </>
      )}
    </Box>
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
