// TopPage.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { ThemeProvider } from '@mui/material/styles';
import { styled, keyframes } from '@mui/system';
import { Typography, Link } from '@mui/material';
import Login from './Login';
import Register from './Register';
import './TopPage.css';
import theme from './theme';


const AppContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundImage: 'url(/toppage.png)', // 2つの背景画像を指定
  backgroundSize: 'cover', // 1つ目の画像を画面の半分のサイズに、2つ目の画像を全体にカバー
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
    transform: scale(2); // 2倍に拡大
  }
`;

const Title = styled('h1')({
  fontSize: '2rem',

  animation: `${fadeInAndScale} 1s ease-in-out`,
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
    backgroundColor: 'rgba(246, 230, 203, 0.9)', // 半透明の背景色
    color: 'white',
    borderRadius: '10px',
    // fontFamily: '"PixelMplus", "Press Start 2P", cursive',
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
        <Title onClick={handleTitleClick}style={{color:"white"}} >Disaster Master</Title>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          ariaHideApp={false}
        >
          {loggedIn ? (
            <Typography component="h1" variant="h5">ログイン<ruby>済<rt>ず</rt></ruby>み</Typography>
          ) : (
            isRegister ? (
              <Register setUsername={setUsername} setPassword={setPassword} />
            ) : (
              <Login handleLogin={handleLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword} />
            )
          )}
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '1rem' }}>
            {isRegister ? (
              <span style={{ color: 'gray' }}>
                <ruby>既<rt>すで</rt>にアカウントをお</ruby><ruby>持<rt>も</rt>ちですか？</ruby><Link href="#" onClick={() => setIsRegister(false)} style={{ color: 'gray',  textDecoration: 'underline' }}>ログイン</Link>
              </span>
            ) : (
              <span style={{ color: 'gray' }}>
                <ruby>アカウントを</ruby><ruby>持<rt>も</rt>っていませんか？</ruby>
                <Link href="#" onClick={() => setIsRegister(true)} style={{color: 'gray',  textDecoration: 'underline' }}><ruby>登録<rt>とうろく</rt></ruby></Link>
              </span>
            )}
          </Typography>
        </Modal>
      </AppContainer>
    </ThemeProvider>
  );
}

export default TopPage;
