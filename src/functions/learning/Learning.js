import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Grid } from '@mui/material';

const Learning = () => {
  const [materials, setMaterials] = useState([]);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch learning materials from the backend
    axios.get('http://localhost:3001/api/learning-materials')
      .then(response => setMaterials(response.data))
      .catch(error => console.error('Error fetching learning materials:', error));

    // Check session and get user info
    axios.get('http://localhost:3001/check-session')
      .then(response => setUser(response.data.user))
      .catch(error => console.error('Error checking session:', error));
  }, []);

  const handleNext = () => {
    setCurrentMaterialIndex((prevIndex) => 
      prevIndex < materials.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentMaterialIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleLearned = () => {
    const currentMaterial = materials[currentMaterialIndex];

    if (!currentMaterial || !currentMaterial.id) {
      console.error('Material ID is missing');
      return;
    }

    axios.post('http://localhost:3001/api/mark-learned', {
      materialId: currentMaterial.id  // Send the correct material ID
    })
    .then(() => {
      console.log('Material marked as learned');
      alert('学習しました！');
    })
    .catch(error => console.error('Error marking material as learned:', error));
  };

  const currentMaterial = materials[currentMaterialIndex];

  return (
    <Box sx={{ padding: '2rem' }}>
      {currentMaterial ? (
        <>
          <Typography variant="h5">{currentMaterial.title}</Typography>
          <Typography variant="body1">{currentMaterial.content}</Typography>
          <div>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentMaterialIndex === 0}
            >
              前のページ
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentMaterialIndex >= materials.length - 1}
            >
              次のページ
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLearned}
            >
              学習した！
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default Learning;
