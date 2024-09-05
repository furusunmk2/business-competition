import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

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
    })
    .catch(error => console.error('Error marking material as learned:', error));
  };

  const currentMaterial = materials[currentMaterialIndex];

  return (
    <div>
      {currentMaterial ? (
        <>
          <h1>{currentMaterial.title}</h1>
          <p>{currentMaterial.content}</p>
          <div>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentMaterialIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentMaterialIndex >= materials.length - 1}
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLearned}
            >
              Learned
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Learning;
