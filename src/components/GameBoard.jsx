import React from 'react';
import uniqueId from 'lodash.uniqueid';
import Cell from './Cell';

const isWithinPieceBounds = (rowIndex, colIndex, piecePosition, currentPiece) => {
  if (!currentPiece) return false;

  const { row, col } = piecePosition;
  const { shape } = currentPiece;
  const pieceRow = rowIndex - row;
  const pieceCol = colIndex - col;

  const isInsideRow = pieceRow >= 0 && pieceRow < shape.length;
  const isInsideCol = pieceCol >= 0 && pieceCol < shape[0].length;
  const isPieceCell = isInsideRow && isInsideCol && shape[pieceRow][pieceCol] === 1;

  return isPieceCell;
};

const GameBoard = ({ board, piecePosition, currentPiece }) => (
  <div className="game-board">
    {board.map((row, rowIndex) => (
      <div key={uniqueId()} className="row">
        {row.map((cell, colIndex) => {
          const isPieceCell = isWithinPieceBounds(rowIndex, colIndex, piecePosition, currentPiece);
          const isCellFilled = cell !== null || (isPieceCell && currentPiece
            .shape[rowIndex - piecePosition.row][colIndex - piecePosition.col] === 1);
          const color = isPieceCell ? currentPiece.color : cell?.color || null;

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
