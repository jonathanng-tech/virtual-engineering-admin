import { CSSObject, Theme, styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

export const drawerStyles = {
  zIndex: 99999999,
  padding: '0 16px',
  border: 'none',
  background: 'transparent',
  backgroundColor: 'rgb(255 255 255 / 50%)',
  backdropFilter: 'blur(10px)',
  '& .MuiDrawer-paper': {
    boxShadow: 'none',
    background: 'transparent',
  },
  '& .MuiPaper-root': {
    width: '100%',
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
  },
};

export const inputStyles = {
  padding: '6px 8px',
  borderRadius: '4px',
  border: '1px solid black',
  width: '305px',
};

export const iconButtonStyles = {
  '&:focus': { outline: 'none' },
  '&:active': { outline: 'none' },
};

export const accordionStyles = {
  minHeight: 48,
  justifyContent: 'initial',
  px: 2.5,
  boxShadow: 'none',
  padding: '0px !important',
  marginBottom: 0,
  '&.MuiPaper-root': { boxShadow: 'none !important' },
  '&::before': {
    display: 'none !important',
  },
};

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));
export const accordionSummaryStyles = {
  fontSize: '12px',
  color: '#212529',
  fontWeight: 600,
  height: '84px',
  paddingLeft: '16px !important',
  '&:hover': {
    background: '#f7f7f7',
  },
  '.MuiAccordionSummary-expandIconWrapper': {
    marginRight: '16px',
  },
  borderBottom: '1px solid #ccc',
};

export const typographyStyles = {
  textAlign: 'center',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

export const iconImageStyle = (isOpen: boolean) => ({
  margin: isOpen ? '0 8px' : 'auto',
  // padding: '8px',
});

export const childBoxStyles = {
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    background: '#f7f7f7',
  },
};

export const itemTextStyle = {
  fontWeight: '400',
  whiteSpace: 'wrap',
  fontSize: '14px',
  lineHeight: '1.3',
  paddingTop: '10px',
  paddingBottom: '5px',
};
export const itemDescStyle = {
  color: '#707070',
  fontSize: '14px',
  marginTop: '8px',
};
export const itemPriceStyle = {
  fontWeight: '700',
  fontSize: '12px',
  marginTop: 'auto',
};

const drawerWidth = '75%';

const openedMixin = (theme: Theme): CSSObject => ({
  maxWidth: '680px',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  // overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  maxWidth: '680px',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('mobile')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: 99,
  position: 'relative',
  '.MuiPaper-root': {
    position: 'initial',
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export const styleButtonMobile = {
  marginTop: '16px ',
  marginBottom: '4px ',
  border: '1px solid #211d1e',
  width: '100%',
  fontSize: '12px',
  fontWeight: '600',
  color: '#000000',
  position: 'relative',
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

export const styleButtonMobileHalf = {
  width: 'calc(50% - 8px)',
  border: '1px solid #211d1e',
  color: '#211d1e',
  '&:focus': {
    background: 'none',
    border: '1px solid #211d1e',
    outline: 'none',
  },
  '&:hover': {
    background: 'none',
    border: '1px solid #211d1e',
  },
  fontSize: '12px',
  fontWeight: '600',
  padding: '12px 0',
};

export const styleModalProduct = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  width: '100%',
  height: 'max-content',
  // minHeight: '600px',
  maxWidth: '1024px',
  margin: 'auto',
  bgcolor: 'background.paper',
  '.desc-modal': {
    padding: '13px 26px',
    background: 'black',
    color: 'white',
  },
  '#modal-modal-description': {
    fontSize: '18px',
    padding: '13px 26px',
    color: 'black',
  },
  ':focus': {
    border: 'none',
    outline: 'none',
  },
  ':focus-visible': {
    border: 'none',
    outline: 'none',
  },
  ':active': {
    border: 'none',
    outline: 'none',
  },
};

export const styleSeriesModal = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto',
  boxShadow: 24,
  p: 4,
};
