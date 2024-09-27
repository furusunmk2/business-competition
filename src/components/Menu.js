import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // ホバー状態を追跡するためのステート

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

  const menuItems = [
    { path: '/app/home', label: 'ホーム', hiragana: 'ほーむ' },
    { path: '/app/learning', label: '学習', hiragana: 'がくしゅう' },
    { path: '/app/quiz', label: '問題', hiragana: 'もんだい' },
    { path: '/app/simulation', label: 'シミュレーション', hiragana: 'しみゅれーしょん' },
    { path: '/app/ai', label: '分析', hiragana: 'ぶんせき' },
    { path: '/app/config', label: '設定', hiragana: 'せってい' },
  ];

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        style={{
          marginTop: '50px',
          position: 'fixed'
        }} 
      >
        <MenuIcon color='primary'/>
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ marginTop: '50px' }} >
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={() => setHoveredItem(index)} // ホバー開始
              onMouseLeave={() => setHoveredItem(null)}   // ホバー終了
              className='japanese-text'
            >
              <ListItemText
                primary={hoveredItem === index ? item.hiragana : item.label} // ホバー状態で表示を切り替え
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;
