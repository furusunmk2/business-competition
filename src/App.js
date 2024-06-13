import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import AI from './AI';
import Config from './Config';
import Simulation from './Simulation';
import Learning from './Learning';
import Quiz from './Quiz';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c5d28', // グレージュ
    },
    secondary: {
      main: '#b5651d', // ブラウン
    },
    background: {
      default: '#f8f5f0', // ベージュ
    },
  },
  typography: {
    fontFamily: '"Potta One"',
  },
});

const drawerWidth = 240;

const AppContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8f5f0', // ベージュ
});

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#f8f5f0', // ベージュ
  marginLeft: drawerWidth,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(8), // メイン画面の上マージンを調整
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#f0e6d6', // ベージュ
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#d2b48c', // グレージュ
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '48px', // Toolbarの高さを調整
});

const StyledList = styled(List)({
  padding: '20px',
  '& .MuiListItem-root': {
    marginBottom: '10px',
    '& button': {
      backgroundColor: '#b5651d', // ブラウン
      color: 'white',
      padding: '15px 20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      '&:hover': {
        backgroundColor: '#8b4513', // ダークブラウン
        transform: 'translateX(10px)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <StyledAppBar position="fixed">
            <StyledToolbar>
              <Typography variant="h6" noWrap>
                災害クエスト
              </Typography>
            </StyledToolbar>
          </StyledAppBar>
          <StyledDrawer variant="permanent">
            <StyledToolbar /> {/* ここでツールバーの高さを合わせる */}
            <StyledList>
              <ListItem component={Link} to="/learning">
                <ListItemText primary="学習" />
              </ListItem>
              <ListItem component={Link} to="/quiz">
                <ListItemText primary="クイズ" />
              </ListItem>
              <ListItem component={Link} to="/simulation">
                <ListItemText primary="シミュレーション" />
              </ListItem>
              <ListItem component={Link} to="/ai">
                <ListItemText primary="AI画像分析" />
              </ListItem>
              <ListItem component={Link} to="/config">
                <ListItemText primary="設定" />
              </ListItem>
            </StyledList>
          </StyledDrawer>
          <MainContent>
            <Container>
              <Routes>
                <Route path="/learning" element={<Learning />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/simulation" element={<Simulation />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/config" element={<Config />} />
              </Routes>
            </Container>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
