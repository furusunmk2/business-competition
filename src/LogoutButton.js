// Logout.js
import React from 'react';
import axios from 'axios';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout');
            // ログアウト成功後にトップページへリダイレクト
            window.location.href = '/';
        } catch (error) {
            console.error('ログアウトに失敗しました', error);
        }
    };

    return (
        <Tooltip title='ログアウト'>
            <IconButton onClick={handleLogout}>
                <LogoutIcon />
            </IconButton>
        </Tooltip>
    );
};

export default LogoutButton;