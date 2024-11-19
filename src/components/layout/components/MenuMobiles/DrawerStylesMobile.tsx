import { drawerStore } from '@/store';
import { Drawer, Typography, IconButton, Button, Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ColorPalette from '../ColorPalette';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { buttonSort } from './style';
// import ButtonApplyStyleItem from './ButtonApplyStyleItem';

interface DrawerStylesMobileProps {
  open: boolean;
  handleToggle: (status: string) => void;
  openSort: () => void;
}

const DrawerStylesMobile: React.FC<DrawerStylesMobileProps> = ({
  open,
  handleToggle,
  openSort,
}) => {
  const { activeTypeStyle } = drawerStore();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleToggle}
      sx={{
        zIndex: 999999999,
        '.MuiPaper-root': {
          height: '40vh',
          padding: '8px 16px',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        },
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
        <IconButton onClick={() => handleToggle('')}>
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '600', marginLeft: '8px' }}
        >
          SELECT STYLE
        </Typography>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={openSort} sx={buttonSort} disableRipple={true}>
          {activeTypeStyle} <ArrowDropDownIcon />
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: '8px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: 'auto',
        }}
      >
        <ColorPalette
          sx={{ width: '100%', padding: 0, alignItems: 'start' }}
          onCloseDrawer={() => handleToggle('')}
        />
      </Box>
      {/* <Typography>{selectedStyle?.name ?? ''}</Typography> */}
      {/* <ButtonApplyStyleItem onCloseDrawer={() => handleToggle('')} /> */}
    </Drawer>
  );
};

export default DrawerStylesMobile;
