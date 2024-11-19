import * as React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: object;
  sxBox?: object;
}

const CustomTabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  sx,
  sxBox,
}) => (
  <div role="tabpanel" hidden={value !== index} style={sx}>
    {value === index && <Box sx={sxBox}>{children}</Box>}
  </div>
);

export default CustomTabPanel;
