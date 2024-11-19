import { Typography } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function NotFound(): React.ReactElement {
  return (
    <div
      style={{
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SearchIcon sx={{ width: '60px', height: '60px', color: '#A3A3A3' }} />
      <Typography
        sx={{ fontSize: '16px', fontWeight: '600', color: '#211d1e' }}
      >
        No result found
      </Typography>
      <Typography
        sx={{ fontSize: '16px', fontWeight: '500', color: '#7A7A7A' }}
      >
        Sorry, there are no results for matching this keyword
      </Typography>
    </div>
  );
}
