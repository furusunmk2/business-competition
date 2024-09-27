// theme.js

import { createTheme } from '@mui/material/styles';
// アプリページの色
const theme = createTheme({
  palette: {
    primary: {
      main: "#B6C7AA",
    },
    secondary: {
      main: '#FCDC94',
    },
    menu: {
      main: '#C8CFA0',
    },
    icon:{
      main: "#A0937D"
    },
    main: {
      main: '#78ABA8',
    },
  },
  typography: {
    fontFamily: 'DotGothic16, sans-serif', // 日本語フォントを指定
  },
});

export default theme;
