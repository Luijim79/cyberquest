import React, { useState } from 'react';
import { ProgressBar } from './UI';

export default function AccountLevel({ onAnswer }) {
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [recovery, setRecovery] = useState(false);

  const rules = [
    { text: '14 caracteres o más', ok: password.length >= 14 },
    { text: 'Mayúsculas y minúsculas', ok: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { text: 'Números', ok: /\d/.test(password) },
    { text: 'Símbolos', ok: /[^a-zA-Z0-9]/.test(password) },
    { text: 'Sin palabras o números muy fáciles', ok: password.length > 0 && !/(1234|password|contraseña|qwerty|alex)/i.test(password) }
  ];
  const score = Math.min(100, rules.filter(rule => rule.ok).length * 14 + (twoFactor ? 20 : 0) + (recovery ? 10 : 0));

  function tryAttack() {
    onAnswer({
      correct: score >= 75,
      points: 180,
      message: score >= 75
        ? 'La cuenta quedó mejor protegida.'
        : 'La cuenta sigue débil. Prueba una contraseña más larga y activa la verificación en dos pasos.'
    });
  }

  return (
    <div>
      <p>Protege la cuenta de Alex. Usa una contraseña inventada, nunca una real.</p>
      <label className="field">Contraseña de prueba
        <input value={password} onChange={event => setPassword(event.target.value)} autoComplete="off" />
      </label>
      <label className="check"><input type="checkbox" checked={twoFactor} onChange={event => setTwoFactor(event.target.checked)} /> Activar verificación en dos pasos</label>
      <label className="check"><input type="checkbox" checked={recovery} onChange={event => setRecovery(event.target.checked)} /> Activar recuperación</label>
      <ProgressBar value={score} label="Protección" />
      <ul>{rules.map(rule => <li key={rule.text}>{rule.ok ? '✓' : '○'} {rule.text}</li>)}</ul>
      <button onClick={tryAttack}>Probar seguridad</button>
    </div>
  );
}
