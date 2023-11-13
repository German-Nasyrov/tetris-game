import React from 'react';
import uniqueId from 'lodash.uniqueid';
import Cell from './Cell';

const CurrentPiece = ({ piece, piecePosition }) => {
  if (!piece || !piece.shape) return null;

  return (
    <div className="current-piece">
      {piece.shape.map((row, rowIndex) => (
        <div key={uniqueId()} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={uniqueId()}
              filled={cell === 1}
              color={piece.color}
              rowIndex={piecePosition.row + rowIndex}
              colIndex={piecePosition.col + colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CurrentPiece;
