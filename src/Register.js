// Register.js



import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import './Register.css';

const Register = ({ setUsername: setGlobalUsername, setPassword: setGlobalPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log(response.data);
      if (response.status === 200) {
        alert('Registration successful');
        setGlobalUsername(username);
        setGlobalPassword(password);
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed: Network or server error');
      }
    }
  };

  return (
    <div className="dq-modal-content">
      <Typography component="h1" variant="h5" className="dq-title">
        冒険者になる
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="dq-button"
        >
          登録する
        </Button>
      </form>
    </div>
  );
};

export default Register;

