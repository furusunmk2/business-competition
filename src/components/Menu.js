// Menu.js

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;

    }
    setIsOpen(open);
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (

    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        margi
        onClick={toggleDrawer(true)}
        style={{ marginTop: '50px' }} 

      >
        <MenuIcon color='primary'/>
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ marginTop: '50px' }} >
        <ListItem button onClick={() => handleNavigation('/app/home')}>
          <ListItemText primary="ホーム" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/app/learning')}>
          <ListItemText primary="学習" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/app/quiz')}>
          <ListItemText primary="クイズ" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/app/simulation')}>
          <ListItemText primary="シミュレーション" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/app/ai')}>
          <ListItemText primary="AI画像分析" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/app/config')}>
          <ListItemText primary="設定" />
        </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;