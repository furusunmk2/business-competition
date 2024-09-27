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
    <Box sx={{ padding: '0 19rem' }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        アカウント<ruby>設定<rt>せってい</rt></ruby>
      </Typography>
      <Typography variant="body1" gutterBottom>
        メールアドレスやパスワード、ニックネームの<ruby>確認<rt>かくにん</rt></ruby>・<ruby>変更<rt>へんこう</rt></ruby>や、アカウントの<ruby>削除<rt>さくじょ</rt></ruby>ができます。
      </Typography>

      {/* Email Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">メールアドレス</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{user.email}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/app/change-email')}>
            メールアドレスを<ruby>変更<rt>へんこう</rt></ruby>
          </Button>
        </Grid>
      </Grid>

      {/* Password Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">パスワード<ruby>変更<rt>へんこう</rt></ruby></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/change-password')}>
          パスワードを<ruby>変更<rt>へんこう</rt></ruby>
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
            ニックネームを<ruby>編集<rt>へんしゅう</rt></ruby>
          </Button>
        </Grid>
      </Grid>

      {/* Account Deletion Section */}
      <Grid container sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">アカウント<ruby>削除<rt>さくじょ</rt></ruby></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/app/delete-account')}>
            アカウント<ruby>削除<rt>さくじょ</rt></ruby>はこちら
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Config;
