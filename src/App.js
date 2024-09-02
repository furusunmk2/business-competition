import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './functions/Home';
import AI from './functions/AI';
import Config from './functions/Config';
import Simulation from './functions/Simulation';
import Learning from './functions/Learning';
import Quiz from './functions/Quiz';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/check-session', {
      method: 'GET',
      credentials: 'include' // セッション情報を含める
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setLoggedIn(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <div className="main-container">
        <Menu className="menu" />
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
