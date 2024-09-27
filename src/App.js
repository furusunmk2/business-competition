import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './functions/home/Home';
import AI from './functions/AI/AI';
import Simulation from './functions/Simulation';
import Learning from './functions/learning/Learning';
import Quiz from './functions/quiz/Quiz';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Config from './functions/config/Config';
import ChangeNickname from './functions/config/ChangeNickname';
import ChangeEmail from './functions/config/ChangeEmail';
import ChangePassword from './functions/config/ChangePassword';
import DeleteAccount from './functions/config/DeleteAccount';
import DebugRoom from './functions/DebugRoom';



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

  if (loading) { //セッション読み込み中の場合
    return <div>Loading...</div>;
  }

  if (!loggedIn) { //ログイン状態でない場合
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
            <Route path='/change-nickname' element={<ChangeNickname />} />
            <Route path='/change-email' element={<ChangeEmail />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/delete-account' element={<DeleteAccount />} />
            <Route path='/debug-room' element={<DebugRoom />} />
          </Routes>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;