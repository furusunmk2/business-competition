import React from 'react';
import { useQuizStats } from './useQuizStats'; // カスタムフックをインポート

const QuizStats = () => {
  const stats = useQuizStats(); // カスタムフックを使ってデータを取得

  return (
    <div>
      <h2>Quiz Stats</h2>
      <p>Total Questions: {stats.totalQuestions}</p>
      <p>Total Answers: {stats.totalAnswers}</p>
      <p>Correct Answers: {stats.correctAnswers}</p>
      <p>Accuracy Rate: {stats.accuracyRate}%</p>
    </div>
  );
};

export default QuizStats;

