import * as React from 'react';
import { drawerStore, useBrandStore, useStyleStore } from '@/store';
import { Box, useMediaQuery } from '@mui/material';
import ColorItem from './CorlorItem';
import theme from '@/themes';
import { Spinner } from '@/components/spinner';

const ColorPalette: React.FC<{
  sx?: object;
  onCloseDrawer?: () => void;
}> = ({ sx, onCloseDrawer }) => {
  const { activeTypeStyle } = drawerStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { isLoading, dataStyle } = useStyleStore();
  const { activeSeries } = useBrandStore();

  // Filter by active series
  const filteredDataStyles = activeSeries?.id
    ? dataStyle?.filter((p) => p.serieIds?.includes(activeSeries.id))
    : dataStyle;

  return (
    <Spinner loading={isLoading} size={isMobile ? 'small' : 'medium'}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: '',
          ...sx,
        }}
      >
        {(filteredDataStyles || [])
          .filter((s) => s.type === activeTypeStyle)
          .map((item, index) => (
            <ColorItem
              key={index}
              item={item}
              onCloseDrawer={() => {
                onCloseDrawer && onCloseDrawer();
              }}
            />
          ))}
      </Box>
    </Spinner>
  );
};

export default ColorPalette;
