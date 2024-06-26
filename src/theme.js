// theme.js
// theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e6ffeb',
    },
    secondary: {
      main: '#F5F5DC',
    },
    background: {
      default: '#F5F5DC',
    },
    drawer: {
      main: '#333',
    },
  },
  typography: {
    fontFamily: '"PixelMplus", "Press Start 2P", cursive',
  },
});

export default theme;
