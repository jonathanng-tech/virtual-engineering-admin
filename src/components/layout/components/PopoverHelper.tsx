import * as React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialProps,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import IconFullScreen from '/icons/icon-fullscreen.png';
import IconZoomIn from '/icons/icon-zoom-in.png';
import IconZoomOut from '/icons/icon-zoom-out.png';
import IconRuler from '/icons/icon_ruler.png';
import IconArrowNext from '/icons/icon-arrow-next.png';
import IconRefresh from '/icons/icon-refresh.png';
import IconFrontView from '/icons/icon-style-cabinet.png';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { productStore } from '@/store';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import LivingRoundedIcon from '@mui/icons-material/LivingRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import { use3DEnvironmentStore } from '@/store/use3DEnviromentStore';
import { useDimensionStore } from '@/store/useDimensionStore';
import { fullscreenStore } from '@/store/fullscreenStore';

const ZOOM_STEP = 2;

export default function PopoverHelper(): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { listCart, clearListCart } = productStore();
  const [direction, setDirection] =
    React.useState<SpeedDialProps['direction']>('right');
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { environmentState, setEnvironmentState } = use3DEnvironmentStore();
  const { showDimension, setShowDimension } = useDimensionStore();
  const { showFullScreen, setShowFullScreen } = fullscreenStore();
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleShowChangeLight = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        ...styleHeaderBox,
        zoom: isMobile ? 0.8 : 1,
        top: isMobile ? '190px' : '60px',
        display: listCart.length == 0 ? 'none' : 'block',
        'button.active': {
          background: '#4A4747',
          img: {
            filter: 'drop-shadow(0px 100px 0 #ffffff)',
            transform: 'translateY(-100px)',
          },
        },
        button: {
          width: 40,
          minWidth: 40,
          height: 40,
          overflow: 'hidden',
          background: 'white',
          ':hover': {
            background: '#4A4747',
            img: {
              filter: 'drop-shadow(0px 100px 0 #ffffff)',
              transform: 'translateY(-100px)',
            },
          },
          ':focus': {
            border: 'none',
            outline: 'none',
          },
          boxShadow: 'none',
        },
        '#SpeedDialplaygroundexample-actions button': {
          margin: '0 8px !important',
        },
        '#SpeedDialplaygroundexample-actions': {
          paddingLeft: '40px !important',
        },
        background: 'white',
        borderRadius: '50px',
        padding: '5px',
      }}
    >
      <StyledSpeedDial
        sx={{
          width: isExpanded ? 'max-content' : '40px',
          transition: 'width 0.15s ease-in-out',
          '#openPopover': {
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease-in-out',
          },
        }}
        ariaLabel="SpeedDial playground example"
        icon={
          <Box
            onClick={handleClick}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              id="openPopover"
              src={IconArrowNext}
              alt={'Arrow Next'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </Box>
        }
        open={isExpanded}
        direction={direction}
      >
        {/* <SpeedDialAction
          icon={
            <>
              <Button onClick={handleShowChangeLight} disableRipple={true}>
                <LightModeIcon sx={{ color: '#707070' }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  selected={environmentState === 'city'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('city')}
                  >
                    <LivingRoundedIcon sx={{ color: '#707070' }} /> Natural
                  </Box>
                </MenuItem>
                <MenuItem
                  selected={environmentState === 'sunset'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('sunset')}
                  >
                    <WbTwilightRoundedIcon sx={{ color: '#707070' }} /> Sunset
                  </Box>
                </MenuItem>
                <MenuItem
                  selected={environmentState === 'night'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('night')}
                  >
                    <DarkModeRoundedIcon sx={{ color: '#707070' }} /> Night
                  </Box>
                </MenuItem>
              </Menu>
            </>
          }
        /> */}
        <SpeedDialAction
          onClick={() => setShowDimension(!showDimension)}
          sx={{
            background: 'red',
            backgroundColor: 'red',
          }}
          className={showDimension ? 'active' : ''}
          icon={
            <img
              src={IconRuler}
              alt={'Show dimension'}
              width={isMobile ? 20 : 20}
              height={isMobile ? 20 : 20}
              style={{
                margin: 'auto',
                filter: showDimension ? 'drop-shadow(0px 100px 0 #ffffff)' : '',
                transform: showDimension ? 'translateY(-100px)' : '',
              }}
            />
          }
        />
        <SpeedDialAction
          onClick={() => emitter.emit(THREE_EVENTS.zoom, -ZOOM_STEP)}
          icon={
            <img
              src={IconZoomIn}
              alt={'Zoom In'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          }
        />
        <SpeedDialAction
          onClick={() => emitter.emit(THREE_EVENTS.zoom, ZOOM_STEP)}
          icon={
            <img
              src={IconZoomOut}
              alt={'Zoom Out'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          }
        />
        <SpeedDialAction
          onClick={() => emitter.emit(THREE_EVENTS.frontView)}
          icon={
            <img
              src={IconFrontView}
              alt={'Front view'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          }
        />
        <SpeedDialAction
          onClick={() => {
            clearListCart();
            emitter.emit(THREE_EVENTS.removeAllModel);
          }}
          icon={
            <img
              src={IconRefresh}
              alt={'Refresh'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          }
        />
        <SpeedDialAction
          onClick={() => emitter.emit(THREE_EVENTS.fullScreen)}
          className={showFullScreen ? 'active' : ''}
          icon={
            <img
              src={IconFullScreen}
              alt={'Full Screen'}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          }
        />
      </StyledSpeedDial>
    </Box>
  );
}

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  // Styles remain the same for positioning
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const styleHeaderBox = {
  zIndex: 999,
  background: 'transparent',
  display: 'flex',
  gap: '16px',
  position: 'fixed',
  right: '16px',
};
