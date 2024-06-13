import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AI from './AI';
import Config from './Config';
import Simulation from './Simulation';
import Learning from './Learning';
import Quiz from './Quiz';


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>災害クエスト</h1>
          <p>未来の勇者たちへ</p>
        </header>
        <main>
          <h2>メニュー</h2>
          <Link to="/learning">
            <button>学習</button>
          </Link>
          <Link to="/quiz">
            <button>クイズ</button>
          </Link>
          <Link to="/simulation">
            <button>シミュレーション</button>
          </Link>
          <Link to="/ai">
            <button>AI画像分析</button>
          </Link>
          <Link to="/config">
            <button>設定</button>
          </Link>
          <p>ここにコンテンツを追加してください。</p>
        </main>
        <footer>
          <p>ミギカタアガリ ビジネスプロジェクト</p>
        </footer>
        <Routes>
          <Route path="/learning" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;