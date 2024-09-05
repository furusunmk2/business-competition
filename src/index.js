// index.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import TopPage from './TopPage';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function IndexComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLists, setUserLists] = useState({});

  const handleLogin = async () => {
    console.log("handleLogin called");
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      console.log('Login response:', response.data);
      if (response.status === 200) {
        setLoggedIn(true);
        if (!userLists[username]) {
          setUserLists({ ...userLists, [username]: {} });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<TopPage loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword} />} />
            <Route path="/app/*" element={<App loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />} />
            <Route path="/register" element={<Register setUsername={setUsername} setPassword={setPassword} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IndexComponent />);

reportWebVitals();
