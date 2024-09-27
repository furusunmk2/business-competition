import { useState, useEffect } from 'react';
import axios from 'axios';

const useLearningStats = () => {
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [learnedMaterials, setLearnedMaterials] = useState(0);
  const [achievementRate, setAchievementRate] = useState(0);

  useEffect(() => {
    // Fetch total number of materials
    axios.get('http://localhost:3001/api/total-materials')
      .then(response => {
        setTotalMaterials(response.data.total);
      })
      .catch(error => console.error('Error fetching total materials:', error));

    // Fetch number of learned materials for the user
    axios.get('http://localhost:3001/api/learned-materials')
      .then(response => {
        setLearnedMaterials(response.data.learned);
      })
      .catch(error => console.error('Error fetching learned materials:', error));
  }, []);

  useEffect(() => {
    // Calculate achievement rate once we have both total and learned materials
    if (totalMaterials > 0) {
      setAchievementRate(((learnedMaterials / totalMaterials) * 100).toFixed(0));
    }
  }, [totalMaterials, learnedMaterials]);

  return {
    totalMaterials,
    learnedMaterials,
    achievementRate
  };
};

export default useLearningStats;
