// Logout.js
import React from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {

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
        <IconButton color="icon" onClick={handleLogout}>
            <LogoutIcon />
        </IconButton>
    );
};

export default Logout;