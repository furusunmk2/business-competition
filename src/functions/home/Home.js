import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuizStats from '../quiz/QuizStats';
import { useQuizStats } from '../quiz/useQuizStats'; // カスタムフックをインポート
import LearningStats from '../learning/learningStats';
import useLearningStats from '../learning/useLearningStats';

function Home() {
  const quizStats = useQuizStats(); // カスタムフックを使用
  const quizAccuracyRate = quizStats.accuracyRate
  const { totalMaterials, learnedMaterials, achievementRate } = useLearningStats();

  const styles = {
    homeContainer: {
      textAlign: 'left', // 中央揃えから左揃えに変更
      padding: '20px',
      fontSize: '20px',
    },
    quizAccuracyRateBarContainer: {
      width: '100%',
      backgroundColor: '#e0e0df',
      borderRadius: '10px',
      margin: '20px 0',
    },
    quizAccuracyRateBar: {
      backgroundColor: '#76c7c0',
      height: '20px',
      borderRadius: '10px',
      width: `${quizAccuracyRate}%`,
    },
    achievementRateBarContainer: {
      width: '100%',
      backgroundColor: '#e0e0df',
      borderRadius: '10px',
      margin: '20px 0',
    },
    achievementRateBar: {
      backgroundColor: '#76c7c0',
      height: '20px',
      borderRadius: '10px',
      width: `${achievementRate}%`,
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px', // ボタン間のスペース
    },
    styledButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '40px', // フォントサイズを少し小さく
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      textDecoration: 'none',
      display: 'inline-block',
    },
    buttonHover: {
      backgroundColor: '#45a049',
      transform: 'scale(1.05)', // ボタンをホバー時に少し大きく
    },
    activeButton: {
      backgroundColor: '#3e8e41',
    },
    externalLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '20px',
    },
    externalLink: {
      backgroundColor: '#2196F3',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'background-color 0.3s, transform 0.2s',
      fontSize: '40px',
    },
    externalLinkHover: {
      backgroundColor: '#1e88e5',
      transform: 'scale(1.05)', // リンクをホバー時に少し大きく
    },
  };

  return (
    <div style={styles.homeContainer}>
      <h1>目指せ！！Disaster Master！！</h1>

      {/* 学習進捗状況のステータスバー */}
      <h2>学習進捗状況</h2>
      <div style={styles.achievementRateBarContainer}>
        <div style={styles.achievementRateBar} />
      </div>
      <p>学習達成率: {achievementRate}%</p>
      <div style={styles.quizAccuracyRateBarContainer}>
        <div style={styles.quizAccuracyRateBar} />
      </div>
      <p>クイズ正答率: {quizAccuracyRate}%</p>

      {/* 各ページへのリンクボタン */}
      <div style={styles.buttonContainer}>
        <Link to="/app/ai" style={styles.styledButton}>
          AI画像分析
        </Link>
        <Link to="/app/learning" style={styles.styledButton}>
          学習
        </Link>
        <Link to="/app/quiz" style={styles.styledButton}>
          クイズ
        </Link>
        <Link to="/app/simulation" style={styles.styledButton}>
          シミュレーション
        </Link>
        <Link to="/app/config" style={styles.styledButton}>
          設定
        </Link>
      </div>
      <QuizStats /><LearningStats />
      {/* 外部リンク */}
      <div style={styles.externalLinks}>
        <a href="https://www.bousai.go.jp/" style={styles.externalLink} target="_blank" rel="noopener noreferrer">
          内閣府の防災情報
        </a>
        <a href="https://www.jma.go.jp/jma/menu/menuflash.html" style={styles.externalLink} target="_blank" rel="noopener noreferrer">
          気象庁の災害情報
        </a>
      </div>
    </div>
  );
}

export default Home;
