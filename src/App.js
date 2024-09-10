import React, { useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [badgeEarned, setBadgeEarned] = useState(false);

  useEffect(() => {
    // Cargar preguntas desde el archivo JSON
    fetch('/questions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error al cargar las preguntas:', error));
  }, []);

  const getRandomQuestionIndex = () => {
    return Math.floor(Math.random() * questions.length);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(getRandomQuestionIndex());
  };

  const handleOkey = () => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + 1;
      if (newPoints === 10) {
        setBadgeEarned(true);
      }
      return newPoints;
    });

    setCurrentQuestionIndex(getRandomQuestionIndex());
  };

  return (
    <div className="App">

      {questions.length > 0 ? (
        <>
          <div className="App__header">
            <ProgressBar progress={(points / 10) * 100} />
          </div>
          <div className="App__body">
            <h2 >{questions[currentQuestionIndex]?.question}</h2>
            <button className="ok-button" onClick={handleNext}>Next</button>
            <button className="ok-button" onClick={handleOkey}>Okey</button>
          </div>
        </>
      ) : (
        <p>Cargando preguntas...</p>
      )}
      {badgeEarned && (
        <>
        <h1>🎉 ¡Felicidades! Has ganado una insignia especial. 🎉</h1>
        <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGoxbGwxamRwYnBldmt6MjdremlkYXpzOWE5cHJmMzkzbzFjMXhtYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/f3peFoUG8C2ONoexko/giphy.gif" // URL del GIF
            alt="Felicidades GIF"
            style={{ width: '300px', marginTop: '10px' }}
          />
        </>
      )}
    </div>
  );
};

export default App;