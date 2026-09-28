import React, { useState } from 'react';

export default function DecisionLevel({ level, onAnswer }) {
  const [inspected, setInspected] = useState(false);

  function choose(option) {
    onAnswer({ correct: option.safe, points: 150, message: option.feedback });
  }

  return (
    <div>
      <div className="scene">
        <div className="scene-icon">{level.icon}</div>
        <p>{level.scene}</p>
        <button className="secondary" onClick={() => setInspected(true)}>Mirar con atención</button>
        {inspected && <p className="hint">Piensa qué puede salir mal antes de elegir.</p>}
      </div>
      <div className="actions">
        {level.options.map(option =>
          <button className="option" key={option.label} onClick={() => choose(option)}>{option.label}</button>
        )}
      </div>
    </div>
  );
}
