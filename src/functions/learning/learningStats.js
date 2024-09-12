import React from 'react';
import useLearningStats from './useLearningStats';

const LearningStats = () => {
  const { totalMaterials, learnedMaterials, achievementRate } = useLearningStats();

  return (
    <div>
      <h2>Learning Stats</h2>
      <p>Total Materials: {totalMaterials}</p>
      <p>Learned Materials: {learnedMaterials}</p>
      <p>Achievement Rate: {achievementRate}%</p>
    </div>
  );
};

export default LearningStats;
