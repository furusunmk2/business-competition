import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Config = () => {
  const [user, setUser] = useState({ nickname: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current session user data
    axios.get('http://localhost:3001/check-session')
      .then((response) => {
        const { user } = response.data;
        // You may need to make another request here to get email and nickname
        axios.get(`http://localhost:3001/api/user-info/${user.id}`)
          .then(res => {
            const { nickname, email } = res.data;
            setUser({ nickname, email });
          })
          .catch(error => {
            console.error('Failed to fetch user info:', error);
          });
      })
      .catch((error) => {
        console.error('Failed to fetch session:', error);
      });
  }, []);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        アカウント設定
      </Typography>
      <Typography variant="body1" gutterBottom>
        メールアドレスやパスワード、ニックネームの確認・変更や、アカウントの削除ができます。
      </Typography>

      {/* Email Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">メールアドレス</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{user.email}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/app/change-email')}>
            メールアドレスを変更
          </Button>
        </Grid>
      </Grid>

      {/* Password Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">パスワード変更</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/change-password')}>
          パスワードを変更
        </Button>
        </Grid>
      </Grid>

      {/* Nickname Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">ニックネーム</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{user.nickname}</Typography>
          <Button variant="outlined" color="primary" onClick={() => navigate('/app/change-nickname')}>
            ニックネームを編集
          </Button>
        </Grid>
      </Grid>

      {/* Account Deletion Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">アカウント削除</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/app/delete-account')}>
            アカウント削除はこちら
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Config;
