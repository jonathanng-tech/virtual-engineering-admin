import { productStore, useBrandStore, useCategoriesStore } from '@/store';
import { Drawer, Typography, Box, Grid2 } from '@mui/material';
import * as React from 'react';

interface DrawerCategoriesMobileProps {
  title?: string;
  open: boolean;
  handleClick: () => void;
  onClose?: () => void;
}

const DrawerCategoriesMobile: React.FC<DrawerCategoriesMobileProps> =
  React.memo(({ title, open, handleClick, onClose }) => {
    const { activeSeries } = useBrandStore();
    const { dataCategories } = useCategoriesStore();
    const { categoryId, filterProductsByCategory } = productStore();

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
        <Grid2 container spacing={1}>
          {dataCategories?.map((item, index) => {
            return (
              <Grid2
                size={{ mobile: 4 }}
                sx={{
                  overflow: 'hidden',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  padding: '11px 8px',
                  alignItems: 'center',
                  gap: '8px',
                  background:
                    categoryId === item.id ? '#F5F5F5' : 'transparent',
                  margin: '4px 0',
                  backgroundColor: item?.id == categoryId ? '#4A4747' : 'white',
                  color: item?.id == categoryId ? 'white' : 'black',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #e1e1e1',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  filterProductsByCategory(item.id, activeSeries?.id);
                  onClose != undefined && onClose();
                }}
              >
                <img
                  src={
                    item.thumbnail != null
                      ? item?.id == categoryId
                        ? `/${(item.thumbnail ?? '').replace('.svg', '-white.svg')}`
                        : `/${item.thumbnail}`
                      : `/icons/category/${item.thumbnail} `
                  }
                  alt={item.name}
                  width={40}
                  height={40}
                />
                {item.name}
              </Grid2>
            );
          })}
        </Grid2>
      </Drawer>
    );
  });

export default DrawerCategoriesMobile;
