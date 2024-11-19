import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { ThemeProvider } from '@mui/material';
import theme from '@/themes';

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
);
