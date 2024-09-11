import React, { useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [badgeEarned, setBadgeEarned] = useState(false);

  useEffect(() => {
    // Cargar preguntas desde el archivo JSON
    fetch('https://holasoymalva.github.io/meet-me/questions.json')
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
    // Obtener índices de preguntas que no han sido usadas aún
    const availableQuestions = questions.filter((_, index) => !usedQuestions.includes(index));
    if (availableQuestions.length === 0) {
      return null; // Si no quedan preguntas disponibles, devolver null
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = questions.indexOf(availableQuestions[randomIndex]);
    return questionIndex;
  };

  const handleNext = () => {
    const nextQuestionIndex = getRandomQuestionIndex();
    if (nextQuestionIndex !== null) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setUsedQuestions([...usedQuestions, nextQuestionIndex]); // Añadir la pregunta al array de usadas
    } else {
      alert('Ya no hay más preguntas disponibles.');
    }
  };

  const handleOkey = () => {
    // Sumar puntos
    setPoints((prevPoints) => {
      const newPoints = prevPoints + 1;
      if (newPoints === 10) {
        setBadgeEarned(true);
      }
      return newPoints;
    });

    // Cambiar a una nueva pregunta aleatoria
    const nextQuestionIndex = getRandomQuestionIndex();
    if (nextQuestionIndex !== null) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setUsedQuestions([...usedQuestions, nextQuestionIndex]); // Añadir la pregunta al array de usadas
    } else {
      alert('Ya no hay más preguntas disponibles.');
    }
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