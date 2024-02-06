import React, { useState, useEffect } from 'react';

function HangmanGameApp() {
  const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  const [word, setWord] = useState('');
  const [guessedWord, setGuessedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex]);
    setGuessedWord('_'.repeat(words[randomIndex].length));
  }, []);

  const handleGuess = () => {
    if (word.includes(guess)) {
      const newGuessedWord = word
        .split('')
        .map((letter, index) => (letter === guess ? guess : guessedWord[index]))
        .join('');
      setGuessedWord(newGuessedWord);
    } else {
      setRemainingAttempts(remainingAttempts - 1);
    }

    if (guessedWord === word || remainingAttempts === 0) {
      setGameOver(true);
    }
    setGuess('');
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  return (
    <div>
      <h1>Hangman Game App</h1>
      <div className="word">{guessedWord}</div>
      <p>Remaining Attempts: {remainingAttempts}</p>
      {!gameOver && (
        <div>
          <input
            type="text"
            maxLength="1"
            value={guess}
            onChange={handleInputChange}
          />
          <button onClick={handleGuess}>Guess</button>
        </div>
      )}
      {gameOver && <p>{guessedWord === word ? 'You won!' : 'You lost!'}</p>}
    </div>
  );
}

export default HangmanGameApp;
