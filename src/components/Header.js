import React from 'react';
import { AppBar, Toolbar, Typography , IconButton} from '@mui/material';
import { styled } from '@mui/system';
import { AccountCircle } from '@mui/icons-material';

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
  backgroundColor: '#f0f0d0',
  color: 'black',
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

const Header = ({ loggedIn, handleLogout,username}) => {
  return (
    <HeaderContainer>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <IconButton edge="start" onClick={handleLogout}  aria-label="account" style={{ color:'#000000' }}>
            <AccountCircle />
          </IconButton>

          <Title variant="h6">Disaster Master</Title>
        </StyledToolbar>
      </StyledAppBar>
    </HeaderContainer>
  );
};

export default Header;











