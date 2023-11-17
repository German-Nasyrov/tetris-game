import React from 'react';
import uniqueId from 'lodash.uniqueid';
import Cell from './Cell';
import { isPieceCellFilled, isCellFilledOrPiece, getCellColor } from '../gameUtils/gameUtils';

const GameBoard = ({ board, piecePosition, currentPiece }) => (
  <div className="game-board">
    {board.map((row, rowIndex) => (
      <div key={uniqueId()} className="row">
        {row.map((cell, colIndex) => {
          const isPieceCell = isPieceCellFilled(rowIndex, colIndex, piecePosition, currentPiece);
          const isCellFilled = isCellFilledOrPiece(
            cell,
            isPieceCell,
            rowIndex,
            colIndex,
            piecePosition,
            currentPiece,
          );
          const color = isPieceCell ? currentPiece.color : getCellColor(cell);

          return (
            <Cell
              key={uniqueId()}
              filled={isCellFilled}
              color={color}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          );
        })}
      </div>
    ))}
  </div>
);

export default GameBoard;
