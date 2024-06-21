import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.main,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '72px', // Toolbarの高さを調整
});

const HeaderContainer = styled('header')({
  backgroundColor: '#F0F0D0', 
  color: 'black',
  padding: '10px 0',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
});


const Header = () => {
  return (
    <HeaderContainer>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <Typography variant="h6" noWrap>
          Disaster Master
          </Typography>
        </StyledToolbar>
      </StyledAppBar>
    </HeaderContainer>
  );
};

export default Header;
