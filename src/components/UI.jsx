import React from 'react';
export function Panel({ title, children }) {
  return <section className="panel"><h2>{title}</h2>{children}</section>;
}

export function ProgressBar({ value, label }) {
  return (
    <div className="progress">
      <div className="progress-label"><span>{label}</span><span>{value}%</span></div>
      <div className="track"><div style={{ width: `${value}%` }} /></div>
    </div>
  );
}
