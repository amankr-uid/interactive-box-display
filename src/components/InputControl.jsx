import React from 'react';

const InputControl = ({ value, onChange, onGenerate, error }) => {
  return (
    <div className="controls">
      <input
        aria-label="number-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter number (5-25)"
      />
      <button onClick={onGenerate}>Generate</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputControl;
