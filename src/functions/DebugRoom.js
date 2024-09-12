import React from 'react';
import LearningStats from './learning/learningStats';
import QuizStats from './quiz/QuizStats';

function DebugRoom() {
  return (
    <div>
      <QuizStats />
      <LearningStats />
    </div>
  );
}

export default DebugRoom;