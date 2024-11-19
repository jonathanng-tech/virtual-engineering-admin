import * as React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { productStore } from '@/store';
import { LIST_SORT_TYPE } from '@/configs/constant';

const SortAndViewOptions: React.FC = () => {
  const { orderType, changeOrderType } = productStore();

  return (
    <Box sx={{ display: 'flex', margin: ' 0 0', alignItems: 'center' }}>
      <Typography sx={{ fontSize: '15px', marginLeft: 'auto' }}>
        Sort by
      </Typography>
      <Select
        value={orderType}
        onChange={(event) => changeOrderType(event.target.value)}
        sx={{
          marginLeft: '5px',
          border: 'none !important',
          '.MuiSelect-select': { padding: '0px 32px 0 0 !important' },
          '.MuiSelect-nativeInput': { border: 'none !important' },
          '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
          fontSize: '15px',
        }}
      >
        {LIST_SORT_TYPE.map((sort) => {
          return (
            <MenuItem key={sort.value} value={sort.value}>
              {sort.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default SortAndViewOptions;
