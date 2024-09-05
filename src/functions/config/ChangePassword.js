import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = () => {
    axios.post('http://localhost:3001/api/change-password', { currentPassword, newPassword })
      .then(response => {
        setMessage('Password updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating password: ' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePasswordChange}
      >
        Update Password
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
};

export default ChangePassword;
