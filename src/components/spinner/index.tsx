import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface SpinnerProps {
  height?: number | string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large'; // Mapping Ant SpinSize to sizes
  color?: string; // Custom color prop
  render?: any;
  children?: any;
}

const sizeMapping: Record<string, number> = {
  small: 20,
  medium: 40, // Default size
  large: 60,
};

export const Spinner = React.memo<SpinnerProps>(
  ({
    height,
    loading = true,
    size = 'medium',
    color = '#EBB91A',
    render,
    children,
  }) => {
    if (loading) {
      return (
        <Box
          sx={{
            width: '100%',
            height: height || '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            size={sizeMapping[size]}
            sx={{ color }} // Custom color applied here
          />
        </Box>
      );
    }

    return render || children;
  }
);
