import React, { useState } from 'react';
import { Grid2, Box } from '@mui/material';
import { productStore, useBrandStore, useCategoriesStore } from '@/store';
import { CategoryEntity } from '@/types/model';

interface CategoriesProps {}

export default function Categories({}: CategoriesProps): JSX.Element {
  const { activeSeries } = useBrandStore();
  const { dataCategories } = useCategoriesStore();
  const { categoryId, filterProductsByCategory } = productStore();
  const { filterProductsByKeyword } = productStore();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleOnChange = (item: CategoryEntity) => {
    filterProductsByCategory(item.id, activeSeries?.id);
  };

  return (
    <Box
      className="__tabCateContainer"
      sx={{
        display: 'flex',
        gap: '9px',
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      {dataCategories?.map((item, index) => {
        const isHovered = hoveredItemId === item.id;
        const isActive = item.id === categoryId;

        return (
          <Grid2
            onClick={() => {
              handleOnChange(item);
              filterProductsByKeyword('');
            }}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            key={`child-${index}`}
            sx={{
              width: '100px',
              borderRadius: '4px',
              border: '1px solid rgb(193, 191, 191)',
              fontWeight: '500',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#4A4747',
                color: 'white',
              },
              padding: '16px 0px',
              backgroundColor: isActive ? '#4A4747' : 'white',
              color: isActive ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflow: 'hidden',
              flexDirection: 'column',
              fontSize: '14px',
            }}
          >
            <img
              src={
                item.thumbnail != null
                  ? isHovered || isActive
                    ? `/${(item.thumbnail ?? '').replace('.svg', '-white.svg')}`
                    : `/${item.thumbnail}`
                  : `/icons/category/${item.id}.svg`
              }
              alt={item.name}
              width={40}
              height={40}
            />
            {item.name}
          </Grid2>
        );
      })}
    </Box>
  );
}
