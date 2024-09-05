import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizStats = () => {
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

  return (
    <div>
      <h1>Quiz Stats</h1>
      <p>Total Questions: {stats.totalQuestions}</p>
      <p>Total Answers: {stats.totalAnswers}</p>
      <p>Correct Answers: {stats.correctAnswers}</p>
      <p>Accuracy Rate: {stats.accuracyRate}%</p>
    </div>
  );
};

export default QuizStats;
