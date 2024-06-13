import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d48c2b', // グレージュ
    },
    secondary: {
      main: '#b5651d', // ブラウン
    },
    background: {
      default: '#f8f5f0', // ベージュ
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
