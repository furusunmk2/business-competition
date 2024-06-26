// TopPage.js


// TopPage.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled, keyframes } from '@mui/system';
import { Typography, Link } from '@mui/material';
import Header from './components/Header';
import Login from './Login';
import Register from './Register';
import './TopPage.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6ffeb", // ミントグリーン
    },
    secondary: {
      main: '#F5F5DC', // セピア
    },
    background: {
      default: '#F5F5DC', // ベージュ系
    },
  },
  typography: {
    fontFamily: '"PixelMplus", "Press Start 2P", cursive',
  },
});

const AppContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundImage: 'url(/backgroundimage.PNG), url(/backgroundimage.JPG)', // 2つの背景画像を指定
  backgroundSize: '50%, cover', // 1つ目の画像を画面の半分のサイズに、2つ目の画像を全体にカバー
  backgroundPosition: 'bottom left, center', // 1つ目の画像を左下に、2つの画像を中央に配置
  backgroundRepeat: 'no-repeat, no-repeat', // 画像の繰り返しを防止
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const fadeInAndScale = keyframes`
  from {
    opacity: 0;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(3); // 3倍に拡大
  }
`;

const Title = styled('h1')({
  fontSize: '4rem',
  color: '#FFFFFF', // 白色
  animation: `${fadeInAndScale} 18s ease-in-out`,
  animationFillMode: 'forwards', // アニメーション終了後に最終状態を保持
  cursor: 'pointer', // ポインタを表示
});

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 透過背景
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    padding: '20px',
    border: '2px solid rgba(255, 255, 255, 0.8)', // 半透明のボーダー
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 半透明の背景色
    color: 'white',
    borderRadius: '10px',
    fontFamily: '"PixelMplus", "Press Start 2P", cursive',
  },
};

function TopPage({ loggedIn, handleLogout, handleLogin, setLoggedIn, setUsername, setPassword }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleTitleClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsRegister(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <Title onClick={handleTitleClick}>Disaster Master</Title>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          ariaHideApp={false}
        >
          {loggedIn ? (
            <Typography component="h1" variant="h5">ログイン済み</Typography>
          ) : (
            isRegister ? (
              <Register setUsername={setUsername} setPassword={setPassword} />
            ) : (
              <Login handleLogin={handleLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword} />
            )
          )}
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '1rem', color: 'white' }}>
            {isRegister ? (
              <span>
                既にアカウントをお持ちですか? <Link href="#" onClick={() => setIsRegister(false)} style={{ color: 'white', textDecoration: 'underline' }}>ログイン</Link>
              </span>
            ) : (
              <span>
                アカウントを持っていませんか? <Link href="#" onClick={() => setIsRegister(true)} style={{ color: 'white', textDecoration: 'underline' }}>登録</Link>
              </span>
            )}
          </Typography>
        </Modal>
      </AppContainer>
    </ThemeProvider>
  );
}

export default TopPage;
