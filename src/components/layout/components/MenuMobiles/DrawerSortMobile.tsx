import { Drawer, Typography } from '@mui/material';
import * as React from 'react';

interface sortItem {
  name: string;
  value: string;
}

interface DrawerSortMobileProps {
  title?: string;
  listSortItems: sortItem[];
  open: boolean;
  handleClick: () => void;
  activeItem: string;
  changeOrderType: (type: string, value: boolean) => void;
  onClose?: () => void;
}

const DrawerSortMobile: React.FC<DrawerSortMobileProps> = React.memo(
  ({
    title,
    open,
    handleClick,
    activeItem,
    changeOrderType,
    listSortItems,
    onClose,
  }) => {
    const renderOption = (label: string, type: string) => (
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
          background: activeItem === type ? '#F5F5F5' : 'transparent',
          margin: '4px 0',
        }}
        onClick={() => {
          changeOrderType(type, true);
          onClose != undefined && onClose();
        }}
      >
        {activeItem === type ? (
          <img src="/icons/icon-check.png" alt="check" width={24} />
        ) : (
          <div style={{ width: '24px' }} />
        )}
        {label}
      </Typography>
    );

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
            height: '350px',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {title && title}
        </Typography>
        {listSortItems.map(({ name, value }) => {
          return renderOption(name, value);
        })}
      </Drawer>
    );
  }
);

export default DrawerSortMobile;
