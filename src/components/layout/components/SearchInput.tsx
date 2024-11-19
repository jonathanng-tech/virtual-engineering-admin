import * as React from 'react';
import { Input, InputAdornment } from '@mui/material';
import { useBrandStore, productStore } from '@/store';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchInput: React.FC<{
  placeholder?: string;
  showIconPrefix?: boolean;
  sx?: object;
  handleMobile?: () => void;
}> = ({ sx, handleMobile, showIconPrefix = true, placeholder = 'Search' }) => {
  const { search, filterProductsByKeyword } = productStore();
  const { activeSeries } = useBrandStore();
  // const [searchInput, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterProductsByKeyword(event.target.value, activeSeries?.id);
  };

  return (
    <Input
      disableUnderline
      placeholder={placeholder}
      startAdornment={
        showIconPrefix ? (
          <InputAdornment position="start">
            {<SearchRoundedIcon />}
          </InputAdornment>
        ) : (
          ''
        )
      }
      endAdornment={
        <InputAdornment position="end">
          {search && (
            <CloseRoundedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                filterProductsByKeyword('');
              }}
            />
          )}
        </InputAdornment>
      }
      sx={{
        border: '1px solid #D2D2D2',
        width: '100%',
        fontSize: '14px',
        borderRadius: '4px',
        ...sx,
      }}
      value={search}
      onChange={handleSearchChange}
      // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
      //   if (event.key === 'Enter') {
      //     onSearch(event.currentTarget.value);
      //     setSearch(event.currentTarget.value);
      //     handleMobile != undefined && handleMobile();
      //   }
      //   if (event.currentTarget.value == '') {
      //     onCategoryName(activeTypeProduct);
      //   }
      // }}
    />
  );
};

export default SearchInput;
