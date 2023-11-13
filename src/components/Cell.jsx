import React from 'react';
import uniqueId from 'lodash.uniqueid';

const Cell = ({
  filled, color, rowIndex, colIndex,
}) => (
  <div
    key={uniqueId()}
    className={`cell ${filled ? 'filled' : 'empty'}`}
    style={{ backgroundColor: color || 'transparent' }}
    data-row={rowIndex}
    data-col={colIndex}
  />
);

export default Cell;
