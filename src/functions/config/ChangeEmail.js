import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const ChangeEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = () => {
    axios.post('http://localhost:3001/api/change-email', { email })
      .then(response => {
        setMessage('Email updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating email');
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Change Email
      </Typography>
      <TextField
        label="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleEmailChange}
      >
        Update Email
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
};

export default ChangeEmail;
