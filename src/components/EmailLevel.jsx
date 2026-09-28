import React, { useState } from 'react';

export default function EmailLevel({ level, onAnswer }) {
  const [found, setFound] = useState([]);
  const email = level.email;

  function inspect(part) {
    const clue = email.clues.find(item => item.id === part);
    if (clue && !found.includes(part)) setFound([...found, part]);
  }

  function decide(isPhishing) {
    const correct = isPhishing === email.phishing;
    onAnswer({
      correct,
      points: 100 + found.length * 15,
      message: email.phishing
        ? 'Era un correo falso. El remitente y el enlace son sospechosos.'
        : 'En este ejemplo, el correo era seguro. Igual conviene revisar antes de abrir enlaces.'
    });
  }

  return (
    <div>
      <p>Haz clic en las partes del correo para revisarlas.</p>
      <div className="email">
        <button className="inspect" onClick={() => inspect('sender')}><b>De:</b> {email.from}</button>
        <button className="inspect" onClick={() => inspect('subject')}><b>Asunto:</b> {email.subject}</button>
        <button className="inspect message" onClick={() => inspect('body')}>{email.body}</button>
        <button className="secondary" onClick={() => inspect('url')}>Ver enlace</button>
        <p className="small">{email.url}</p>
      </div>
      <p>Pistas: {found.length} de {email.clues.length}</p>
      <ul>{found.map(id => {
        const clue = email.clues.find(item => item.id === id);
        return <li key={id}><b>{clue.label}:</b> {clue.detail}</li>;
      })}</ul>
      <div className="actions">
        <button onClick={() => decide(true)}>Es phishing</button>
        <button className="secondary" onClick={() => decide(false)}>Es seguro</button>
      </div>
    </div>
  );
}
