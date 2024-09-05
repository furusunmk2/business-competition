import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAccountDelete = () => {
    axios.post('http://localhost:3001/api/delete-account', { currentPassword })
      .then(response => {
        setMessage('Account deleted successfully!');
        // Redirect to the login page after deletion
        navigate('/');
      })
      .catch(error => {
        setMessage('Error deleting account: ' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Delete Account
      </Typography>
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleAccountDelete}
      >
        Delete Account
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
};

export default DeleteAccount;
