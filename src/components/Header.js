import React from 'react';
import { AppBar, Toolbar, Typography , IconButton, Link, Tooltip} from '@mui/material';
import { AccountCircle} from '@mui/icons-material';
import './Header.css';
import LogoutButton from '../LogoutButton';
import { useNavigate } from 'react-router-dom';



function Header() {
  const handleClick = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton>
          <AccountCircle />
        </IconButton>
        <Tooltip title='ホームに戻る'>
          <Link href='#' onClick={() => handleClick('/app/home')}>
            <Typography variant="h6" color={'#50584B'} fontFamily={'"Press Start 2P", cursive'}>
            Disaster Master
            </Typography>
          </Link>
        </Tooltip>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}




export default Header;











