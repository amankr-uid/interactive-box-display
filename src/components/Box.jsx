import React from 'react';

const Box = ({ index, isGreen, onClick }) => {
  return (
    <button
      className={`box ${isGreen ? 'green' : 'red'}`}
      onClick={() => onClick(index)}
      aria-label={`box-${index}`}
      type="button"
    />
  );
};

export default Box;
