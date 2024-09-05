import { useEffect, useState } from 'react';
import axios from 'axios';

// カスタムフックを作成してエクスポート
export const useQuizStats = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalAnswers: 0,
    correctAnswers: 0,
    accuracyRate: 0
  });

  useEffect(() => {
    axios.get('http://localhost:3001/quiz-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz stats:', error);
      });
  }, []);

  return stats; // 取得した統計データを返す
};
