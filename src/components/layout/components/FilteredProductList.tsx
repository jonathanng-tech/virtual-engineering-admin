import * as React from 'react';
import { Box } from '@mui/material';
import { drawerStore, productStore } from '@/store';
import GridItem from './GridItem';
import ListItem from './ListItem';

const FilteredProductList: React.FC<{ worldRef: React.RefObject<any> }> = ({
  worldRef,
}) => {
  const { viewType } = drawerStore();
  const { listFilteredProducts } = productStore();

  return (
    <Box>
      {listFilteredProducts.map((item, index) =>
        viewType === 'grid' ? (
          <GridItem
            key={`${item.name}-${index}`}
            item={item}
            onCloseDrawer={() => {}}
          />
        ) : (
          <ListItem key={`${item.name}-${index}`} item={item} />
        )
      )}
    </Box>
  );
};

export default FilteredProductList;
