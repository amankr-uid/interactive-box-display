import React from 'react';
import Box from './Box';

const CShapeLayout = ({ count, boxes, onBoxClick }) => {
  const topCount = Math.ceil(count / 3);
  const bottomCount = topCount;
  const middleCount = Math.max(0, count - topCount - bottomCount);

  const topIndexes = Array.from({ length: topCount }, (_, i) => i);
  const middleIndexes = Array.from({ length: middleCount }, (_, i) => topCount + i);
  const bottomIndexes = Array.from({ length: bottomCount }, (_, i) => topCount + middleCount + i);

  return (
    <div className="cshape">
      <div className="top-row">
        {topIndexes.map((idx) => (
          <Box key={idx} index={idx} isGreen={boxes[idx]?.isGreen} onClick={onBoxClick} />
        ))}
      </div>

      <div className="middle-row">
        <div className="middle-col">
          {middleIndexes.map((idx) => (
            <Box key={idx} index={idx} isGreen={boxes[idx]?.isGreen} onClick={onBoxClick} />
          ))}
        </div>
        <div className="middle-filler" />
      </div>

      <div className="bottom-row">
        {bottomIndexes.map((idx) => (
          <Box key={idx} index={idx} isGreen={boxes[idx]?.isGreen} onClick={onBoxClick} />
        ))}
      </div>
    </div>
  );
};

export default CShapeLayout;
