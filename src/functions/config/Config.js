import React, { useEffect, useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom>
        アカウント設定
      </Typography>
      <Typography variant="body1">
        Nickname: {user.nickname}
      </Typography>
      <Typography variant="body1">
        Email: {user.email}
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/app/change-nickname')}
        style={{ margin: '10px 0' }}
      >
        Change Nickname
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/app/change-email')}
        style={{ margin: '10px 0' }}
      >
        Change Email
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/app/change-password')}
        style={{ margin: '10px 0' }}
      >
        Change Password
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate('/app/delete-account')}
        style={{ margin: '10px 0' }}
      >
        Delete Account
      </Button>
    </Container>
  );
};

export default Config;
