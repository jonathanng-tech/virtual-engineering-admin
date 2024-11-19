import * as React from 'react';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { drawerStore, productStore } from '@/store';
import { productTitle } from '../styles/product';
import ButtonAddItem from './ButtonAddItem';
interface DrawerProductDescProps {
  open: boolean;
  handleClick: () => void;
}

const DrawerProductDesc: React.FC<DrawerProductDescProps> = React.memo(
  ({ open, handleClick }) => {
    const { activeProduct } = productStore();
    const { setShowHideModal } = drawerStore();
    return (
      <Drawer
        open={open}
        onClose={() => setShowHideModal(false)}
        anchor="bottom"
        sx={{
          zIndex: 9999999999,
          '.MuiPaper-root': {
            padding: '8px 16px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            height: '40vh',
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setShowHideModal(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              marginLeft: '8px',
              textTransform: 'uppercase',
            }}
          >
            Description
          </Typography>{' '}
        </div>
        <Box
          sx={{
            height: 'calc(70vh - 50px)',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Typography style={{ ...productTitle, fontSize: '16px' }}>
            {activeProduct?.name ?? ''}
          </Typography>
          <Typography
            sx={{ ...productTitle, marginTop: '8px', fontWeight: '400' }}
          >
            {activeProduct?.description ?? ''}
          </Typography>
        </Box>
        <ButtonAddItem onCloseDrawer={handleClick} />
      </Drawer>
    );
  }
);

export default DrawerProductDesc;
