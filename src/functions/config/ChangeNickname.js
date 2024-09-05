import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const ChangeNickname = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  const handleNicknameChange = () => {
    axios.post('http://localhost:3001/api/change-nickname', { nickname })
      .then(response => {
        setMessage('Nickname updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating nickname');
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Change Nickname
      </Typography>
      <TextField
        label="New Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNicknameChange}
      >
        Update Nickname
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
};

export default ChangeNickname;
