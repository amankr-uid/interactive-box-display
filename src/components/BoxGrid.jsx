import React from 'react';
import Box from './Box';

const BoxGrid = ({ boxes, onBoxClick }) => {
  return (
    <div className="grid">
      {boxes.map((b, i) => (
        <Box key={i} index={i} isGreen={b.isGreen} onClick={onBoxClick} />
      ))}
    </div>
  );
};

export default BoxGrid;
