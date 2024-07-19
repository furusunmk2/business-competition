// quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText } from '@mui/material';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [choices, setChoices] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [answered, setAnswered] = useState(false);

  const userId = 1; // 仮のユーザーID

  useEffect(() => {
    const fetchQuiz = async (quizId) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quiz/${quizId}`);
        setQuiz(response.data.quiz);
        setChoices(response.data.choices);
        setShowExplanation(false);
        setSelectedChoice(null);
        setIsCorrect(null);
        setAnswered(false);
      } catch (error) {
        console.error('Error fetching quiz data', error);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes data', error);
      }
    };

    fetchQuiz(currentQuizId);
    fetchQuizzes();
  }, [currentQuizId]);

  const handleNextQuiz = () => {
    setCurrentQuizId((prevQuizId) => prevQuizId + 1);
  };

  const handlePreviousQuiz = () => {
    setCurrentQuizId((prevQuizId) => prevQuizId - 1);
  };

  const handleAnswer = async () => {
    if (selectedChoice === null) {
      alert('選択肢を選んでください');
      return;
    }

    const choice = choices.find((c) => c.id === selectedChoice);
    const correct = choice.is_answer;
    setIsCorrect(correct);
    setShowExplanation(true);
    setAnswered(true);

    try {
      await axios.post('http://localhost:3001/api/answer', {
        userId,
        quizId: currentQuizId,
        choiceId: selectedChoice,
        isCorrect: correct
      });
    } catch (error) {
      console.error('Error saving answer', error);
    }
  };

  const handleQuizSelect = (quizId) => {
    setCurrentQuizId(quizId);
  };

  return (
    <div>
      <List>
        {quizzes.map((q) => (
          <ListItem button key={q.id} onClick={() => handleQuizSelect(q.id)}>
            <ListItemText primary={q.title} />
          </ListItem>
        ))}
      </List>

      {quiz && (
        <div>
          <Typography variant="h4">{quiz.title}</Typography>
          <Typography variant="h6">{quiz.question}</Typography>
          <RadioGroup value={selectedChoice} onChange={(e) => setSelectedChoice(Number(e.target.value))}>
            {choices.map((choice) => (
              <FormControlLabel
                key={choice.id}
                value={choice.id}
                control={<Radio />}
                label={choice.choice}
                disabled={answered}
              />
            ))}
          </RadioGroup>
          
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAnswer}
            disabled={answered}
          >
            答える
          </Button>
          {showExplanation && (
            <div>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                {isCorrect ? '正解です！' : '不正解です'}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                {quiz.explanation}
              </Typography>
            </div>
          )}
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreviousQuiz}
              disabled={currentQuizId <= 1}
            >
              前の問題
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuiz}
              disabled={currentQuizId >= quizzes.length}
            >
              次の問題
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
