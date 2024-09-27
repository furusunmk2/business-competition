import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Link, Tooltip } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import './Header.css';  // CSSを必ず読み込む
import LogoutButton from '../LogoutButton';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title="設定">  {/* マウスオーバー時に表示されるツールチップ */}
          <IconButton onClick={() => navigate('/app/config')}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Tooltip title='ホームに戻る'>
          <Link href='#' onClick={() => navigate('/app/home')}>
            <Typography variant="h6" color={'#50584B'} fontFamily={'"Press Start 2P", cursive'}>
              <span className="ruby-container">
                Disaster Master
                <span className="ruby">　　ディザスター　　　　　　　マスター</span>
              </span>
            </Typography>  
          </Link>
        </Tooltip>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
