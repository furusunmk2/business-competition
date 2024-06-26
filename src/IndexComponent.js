// IndexComponent.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';
import App from './App';
import TopPage from './TopPage';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

function IndexComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLists, setUserLists] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin called");
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Login response:', response.data);
      if (response.status === 200) {
        setLoggedIn(true);
        console.log("Logged in successfully"); // デバッグログ追加
        if (!userLists[username]) {
          setUserLists({ ...userLists, [username]: {} });
        }
        navigate('/app'); // ログイン後に /app にリダイレクト
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
      <Router>
        <Routes>
          <Route path="/" element={<TopPage loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />} />
          <Route path="/app/*" element={<App loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />} />
          <Route path="/register" element={<Register setUsername={setUsername} setPassword={setPassword} />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IndexComponent />);

reportWebVitals();
