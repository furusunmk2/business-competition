import React from 'react';
import { AppBar, Toolbar, Typography , IconButton} from '@mui/material';
import { styled } from '@mui/system';
import { AccountCircle} from '@mui/icons-material';
import './Header.css';
import Logout from '../Logout';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1 || 1300,
  backgroundColor: theme.palette.primary.main,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '72px', // Toolbarの高さを調整
});

const HeaderContainer = styled('header')({

  color: 'white',
  padding: '10px 0',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
});

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center', // 追加
});

const Header = () => {
  return (
    <HeaderContainer>
      
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <IconButton edge="start" aria-label="account" color='icon'>
            <AccountCircle />
          </IconButton>

          <Title variant="h6" color={'#A0937D'} fontFamily={'"Press Start 2P", cursive'}>Disaster Master</Title>
          <Logout />
        </StyledToolbar>
      </StyledAppBar>
    </HeaderContainer>
  );
};

export default Header;











