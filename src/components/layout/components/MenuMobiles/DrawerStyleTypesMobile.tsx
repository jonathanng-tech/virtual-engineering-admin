import { Drawer, Typography } from '@mui/material';
import * as React from 'react';

interface DrawerStyleTypesMobileProps {
  listSortItems: string[];
  open: boolean;
  handleClick: () => void;
  activeItem: string;
  changeType: (type: string) => void;
  onClose?: () => void;
}

const DrawerStyleTypesMobile: React.FC<DrawerStyleTypesMobileProps> =
  React.memo(
    ({ open, handleClick, activeItem, changeType, listSortItems, onClose }) => {
      return (
        <Drawer
          open={open}
          onClose={handleClick}
          anchor="bottom"
          sx={{
            zIndex: 9999999999,
            '.MuiPaper-root': {
              padding: '24px 16px 8px 16px',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              height: '40vh',
            },
          }}
        >
          {listSortItems.map((item) => {
            return (
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  padding: '11px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '4px',
                  gap: '8px',
                  background: activeItem === item ? '#F5F5F5' : 'transparent',
                  margin: '4px 0',
                }}
                onClick={() => {
                  changeType(item);
                  onClose && onClose();
                }}
              >
                {activeItem === item ? (
                  <img src="/icons/icon-check.png" alt="check" width={24} />
                ) : (
                  <div style={{ width: '24px' }} />
                )}
                {item}
              </Typography>
            );
          })}
        </Drawer>
      );
    }
  );

export default DrawerStyleTypesMobile;
