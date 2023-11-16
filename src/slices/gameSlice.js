import { createSlice } from '@reduxjs/toolkit';
import {
  isValidMove,
  getRandomTetromino,
  rotatePieceClockwise,
  handleValidMove,
} from '../gameUtils/gameUtils';

const initialState = {
  started: false,
  board: Array(20).fill(null).map(() => Array(10).fill(null)),
  currentPiece: null,
  piecePosition: { row: null, col: null },
  score: 0,
  lastScore: 0,
  fallSpeed: 800,
  gameIsOver: null,
  timeUntilStart: 500,
};

const startGameReducer = (state) => {
  if (state.started) return state;

  const newPiece = getRandomTetromino(true);
  const { startRow, startCol } = newPiece;

  return {
    ...initialState,
    started: true,
    currentPiece: newPiece,
    piecePosition: { row: startRow, col: startCol },
  };
};

const movePieceReducer = (state, action) => {
  if (!state.started || !state.currentPiece || !state.currentPiece.shape) return state;

  const newPosition = { ...state.piecePosition, ...action.payload };

  if (!isValidMove(state.board, state.currentPiece.shape, newPosition)) return state;

  return { ...state, piecePosition: newPosition };
};

const rotateCurrentPieceReducer = (state) => {
  if (!state.started || !state.currentPiece) return state;

  const currentOrientation = state.currentPiece;

  if (!currentOrientation.shape) return state;

  const newPiece = rotatePieceClockwise(currentOrientation);
  const newPosition = state.piecePosition;

  if (!isValidMove(state.board, newPiece, newPosition)) return state;

  return { ...state, currentPiece: { ...currentOrientation, shape: newPiece } };
};

const dropPieceReducer = (state) => {
  if (!state.started || !state.currentPiece) return state;

  if (state.timeUntilStart > 0) {
    return { ...state, timeUntilStart: state.timeUntilStart - state.fallSpeed };
  }

  const newPosition = { ...state.piecePosition, row: state.piecePosition.row + 1 };

  return handleValidMove(state, newPosition, initialState);
};

const setFallSpeedReducer = (state, action) => ({ ...state, fallSpeed: action.payload });

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: startGameReducer,
    movePiece: movePieceReducer,
    rotateCurrentPiece: rotateCurrentPieceReducer,
    dropPiece: dropPieceReducer,
    setFallSpeed: setFallSpeedReducer,
  },
});

export const {
  startGame,
  movePiece,
  rotateCurrentPiece,
  dropPiece,
  setFallSpeed,
} = gameSlice.actions;

export default gameSlice.reducer;
