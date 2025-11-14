import React, { useEffect, useRef, useState } from 'react';
import InputControl from './components/InputControl';
import CShapeLayout from './components/CShapeLayout';
import BoxGrid from './components/BoxGrid';
import { clampInt } from './utils';

const MIN = 5;
const MAX = 25;

const App = () => {
  const [input, setInput] = useState('8');
  const [count, setCount] = useState(8);
  const [boxes, setBoxes] = useState(() => Array.from({ length: 8 }, () => ({ isGreen: false })));
  const [error, setError] = useState('');

  const clickOrderRef = useRef([]);
  const revertingRef = useRef(false);
  const revertTimerRef = useRef(null);

  // Reset boxes on count change
  useEffect(() => {
    setBoxes(Array.from({ length: count }, () => ({ isGreen: false })));
    clickOrderRef.current = [];
    if (revertTimerRef.current) {
      clearInterval(revertTimerRef.current);
      revertTimerRef.current = null;
      revertingRef.current = false;
    }
  }, [count]);

  const handleGenerate = () => {
    const val = Number(input);
    if (!Number.isInteger(val) || Number.isNaN(val)) {
      setError('Enter an integer value');
      return;
    }
    if (val < MIN || val > MAX) {
      setError(`Value must be between ${MIN} and ${MAX}`);
      return;
    }
    setError('');
    setCount(val);
  };

  const handleBoxClick = (index) => {
    if (revertingRef.current) return; // ignore clicks during revert

    setBoxes((prev) => {
      const next = prev.map((b) => ({ ...b }));
      if (!next[index].isGreen) {
        next[index].isGreen = true;
        clickOrderRef.current.push(index);
      }
      return next;
    });
  };

  // When all green, start revert in reverse click order (1 per sec)
  useEffect(() => {
    const allGreen = boxes.length > 0 && boxes.every((b) => b.isGreen);
    if (allGreen && !revertingRef.current) {
      startRevertSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxes]);

  const startRevertSequence = () => {
    revertingRef.current = true;
    const order = [...clickOrderRef.current].reverse();
    let i = 0;
    revertTimerRef.current = setInterval(() => {
      if (i >= order.length) {
        clearInterval(revertTimerRef.current);
        revertTimerRef.current = null;
        revertingRef.current = false;
        clickOrderRef.current = [];
        return;
      }
      const idx = order[i];
      setBoxes((prev) => prev.map((b, j) => (j === idx ? { ...b, isGreen: false } : b)));
      i += 1;
    }, 1000);
  };

  // Choose C-shape by default. Swap to <BoxGrid /> if you want a simple grid.
  return (
    <div className="page">
      <h1>Interactive Box Display</h1>
      <p className="hint">Enter N (5 - 25) then click "Generate". Click boxes to turn them green.</p>

      <InputControl value={input} onChange={setInput} onGenerate={handleGenerate} error={error} />

      <CShapeLayout count={count} boxes={boxes} onBoxClick={handleBoxClick} />

      <div className="footer-note">
        Click order (oldest → newest): {clickOrderRef.current.join(' -> ') || '—'}{' '}
        {revertingRef.current ? ' — Reverting...' : ''}
      </div>
    </div>
  );
};

export default App;