// App.js

// App.js

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AI from './functions/AI';
import Config from './functions/Config';
import Simulation from './functions/Simulation';
import Learning from './functions/Learning';
import Quiz from './functions/Quiz';
import Header from './components/Header';
import Menu from './components/Menu';

function App({ loggedIn, handleLogout, handleLogin, username, setUsername, password, setPassword, setLoggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <div className="main-container">
        <Menu className="menu" />
        <main className="main-content">

          <Routes>
            <Route path="/learning" element={<Learning />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
