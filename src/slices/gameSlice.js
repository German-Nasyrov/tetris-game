import { createSlice } from '@reduxjs/toolkit';
import {
  isValidMove, processDrop, calculateScore, rotatePieceClockwise, getRandomTetromino,
} from '../utils/utils';
import rowClearSound from '../sounds/clear_row.mp3';

const initialState = {
  started: false,
  board: Array(20).fill(null).map(() => Array(10).fill(null)),
  currentPiece: null,
  piecePosition: { row: null, col: null },
  score: 0,
  lastScore: 0,
  fallSpeed: 800,
  gameIsOver: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      if (state.started) return state;

      const newPiece = getRandomTetromino(true);
      const { startRow, startCol } = newPiece;

      return {
        ...initialState,
        started: true,
        currentPiece: newPiece,
        piecePosition: { row: startRow, col: startCol },
      };
    },
    movePiece: (state, action) => {
      if (!state.started || !state.currentPiece || !state.currentPiece.shape) return state;

      const newPosition = { ...state.piecePosition, ...action.payload };
      if (!isValidMove(state.board, state.currentPiece.shape, newPosition)) return state;

      return { ...state, piecePosition: newPosition };
    },
    rotateCurrentPiece: (state) => {
      if (!state.started || !state.currentPiece) return state;

      const currentOrientation = state.currentPiece;

      if (!currentOrientation.shape) return state;

      const newPiece = rotatePieceClockwise(currentOrientation);

      const newPosition = state.piecePosition;

      if (!isValidMove(state.board, newPiece, newPosition)) {
        return state;
      }

      return { ...state, currentPiece: { ...currentOrientation, shape: newPiece } };
    },
    dropPiece: (state) => {
      if (!state.started || !state.currentPiece) return state;

      const newPosition = { ...state.piecePosition, row: state.piecePosition.row + 1 };

      if (isValidMove(state.board, state.currentPiece.shape, newPosition)) {
        return { ...state, piecePosition: newPosition };
      }

      const { newBoard, removedRows, newScore } = processDrop(
        state.board,
        state.currentPiece.shape,
        state.piecePosition,
        state.currentPiece.color,
        state.score,
      );

      const newPiece = getRandomTetromino(false);
      const { startRow, startCol } = newPiece;

      if (!isValidMove(newBoard, newPiece.shape, { row: startRow, col: startCol })) {
        return {
          ...initialState, started: false, gameIsOver: true, lastScore: state.score,
        };
      }

      if (removedRows.length > 0) {
        const playRowClearSound = new Audio(rowClearSound);
        playRowClearSound.play();
      }

      const finalState = {
        ...state,
        board: newBoard,
        score: newScore + calculateScore(removedRows),
        piecePosition: { row: startRow, col: startCol },
        currentPiece: newPiece,
        currentPieceColor: newPiece.color,
      };

      if (!isValidMove(newBoard, newPiece.shape, finalState.piecePosition)) {
        return {
          ...finalState, started: false, gameIsOver: true, lastScore: state.score,
        };
      }

      return finalState;
    },
    setFallSpeed: (state, action) => ({ ...state, fallSpeed: action.payload }),
  },
});

export const {
  startGame, movePiece, rotateCurrentPiece, dropPiece, setFallSpeed,
} = gameSlice.actions;

export default gameSlice.reducer;
