import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const drawerWidth = 240;

const StyledDrawer = styled('div')(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: theme.palette.background.default,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledList = styled(List)({
  padding: '20px',
  '& .MuiListItem-root': {
    marginBottom: '10px',
    '& button': {
      backgroundColor: '#D2B48C', // ベージュ
      color: 'white',
      padding: '15px 20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      '&:hover': {
        backgroundColor: '#A0522D', // セピア
        transform: 'translateX(10px)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
});

const Menu = () => {
  return (
    <StyledDrawer>
      <StyledList>
        <ListItem style={{color:"#e6ffeb"}}>
          <ListItemText primary="学習" />
        </ListItem>
        <ListItem button component={Link} to="/learning">
          <ListItemText primary="学習" />
        </ListItem>
        <ListItem button component={Link} to="/quiz">
          <ListItemText primary="クイズ" />
        </ListItem>
        <ListItem button component={Link} to="/simulation">
          <ListItemText primary="シミュレーション" />
        </ListItem>
        <ListItem button component={Link} to="/ai">
          <ListItemText primary="AI画像分析" />
        </ListItem>
        <ListItem button component={Link} to="/config">
          <ListItemText primary="設定" />
        </ListItem>
      </StyledList>
    </StyledDrawer>
  );
};

export default Menu;
