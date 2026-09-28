import React, { useState } from 'react';
import { Panel, ProgressBar } from './components/UI';
import EmailLevel from './components/EmailLevel';
import AccountLevel from './components/AccountLevel';
import DecisionLevel from './components/DecisionLevel';
import levelsData from './data/missions.json';

const levels = levelsData.levels;

export default function App() {
  const [screen, setScreen] = useState('start');
  const [levelNumber, setLevelNumber] = useState(0);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [answer, setAnswer] = useState(null);
  const level = levels[levelNumber];

  function startGame() {
    setLevelNumber(0);
    setLives(3);
    setXp(0);
    setAnswer(null);
    setScreen('game');
  }

  function handleAnswer(result) {
    if (answer) return;
    setAnswer(result);
    if (result.correct) setXp(xp + result.points);
    else setLives(Math.max(0, lives - 1));
  }

  function nextLevel() {
    setAnswer(null);
    if (lives === 0) setScreen('lost');
    else if (levelNumber === levels.length - 1) setScreen('won');
    else setLevelNumber(levelNumber + 1);
  }

  function showLevel() {
    if (level.type === 'phishing') {
      return <EmailLevel key={level.id} level={level} onAnswer={handleAnswer} />;
    }
    if (level.type === 'password') {
      return <AccountLevel key={level.id} onAnswer={handleAnswer} />;
    }
    return <DecisionLevel key={level.id} level={level} onAnswer={handleAnswer} />;
  }

  return (
    <div className="app">
      <header>
        <strong>CyberQuest</strong>
        <span>XP: {xp}</span>
      </header>
      <main>
        {screen === 'start' && (
          <section className="start-box">
            <h1>CyberQuest</h1>
            <p>Resuelve 6 niveles sobre seguridad digital. Tienes 3 vidas.</p>
            <p>Revisa correos, protege una cuenta y elige qué harías en cada situación.</p>
            <button onClick={startGame}>Empezar</button>
          </section>
        )}

        {screen === 'game' && (
          <>
            <div className="score-bar">
              <span>Nivel {levelNumber + 1} de {levels.length}</span>
              <span>Vidas: {'❤️'.repeat(lives)}{'🤍'.repeat(3 - lives)}</span>
              <span>XP: {xp}</span>
            </div>
            <ProgressBar value={Math.round((levelNumber / levels.length) * 100)} label="Progreso" />
            <Panel title={level.title}>
              <p className="muted">{level.subtitle}</p>
              {showLevel()}
              {answer && (
                <div className="answer-box">
                  <h3>{answer.correct ? 'Bien hecho' : 'Respuesta incorrecta'}</h3>
                  <p>{answer.message}</p>
                  <p>{answer.correct ? `+${answer.points} XP` : 'Perdiste una vida'}</p>
                  <button onClick={nextLevel}>
                    {lives === 0 || levelNumber === levels.length - 1 ? 'Ver resultado' : 'Siguiente nivel'}
                  </button>
                </div>
              )}
            </Panel>
          </>
        )}

        {(screen === 'won' || screen === 'lost') && (
          <Panel title={screen === 'won' ? 'Terminaste el juego' : 'Se acabaron las vidas'}>
            <p>{screen === 'won' ? 'Completaste los 6 niveles.' : 'Puedes intentarlo otra vez.'}</p>
            <p>Puntos: {xp} XP</p>
            <button onClick={startGame}>Jugar otra vez</button>
          </Panel>
        )}
      </main>
    </div>
  );
}
