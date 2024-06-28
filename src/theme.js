// theme.js
// theme.js

import { createTheme } from '@mui/material/styles';
// アプリページの色
const theme = createTheme({
  palette: {
    primary: {
      main: "#EF9C66",
    },
    secondary: {
      main: '#FCDC94',
    },
    menu: {
      main: '#C8CFA0',
    },
    icon:{
      main: "#ffffff"
    },
    main: {
      main: '#78ABA8',
    },
  },
  typography: {
    fontFamily: '"PixelMplus", "Press Start 2P", cursive',
  },
});

export default theme;
