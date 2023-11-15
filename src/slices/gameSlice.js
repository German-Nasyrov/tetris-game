import { createSlice } from '@reduxjs/toolkit';
import {
  isValidMove,
  processDrop,
  calculateScore,
  rotatePieceClockwise,
  getRandomTetromino,
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

  if (!isValidMove(state.board, newPiece, newPosition)) {
    return state;
  }

  return { ...state, currentPiece: { ...currentOrientation, shape: newPiece } };
};

const resetGame = (lastScore) => ({
  ...initialState,
  started: false,
  gameIsOver: true,
  lastScore,
});

const playRowClearSound = () => new Audio(rowClearSound).play();

const handleRowClear = (removedRows) => {
  if (removedRows.length > 0) {
    playRowClearSound();
  }
};

const updateGameState = (state, newBoard, removedRows, newPiece) => {
  const newScore = state.score + calculateScore(removedRows);

  return {
    ...state,
    board: newBoard,
    score: newScore,
    piecePosition: { row: newPiece.startRow, col: newPiece.startCol },
    currentPiece: newPiece,
  };
};

const handleInvalidMove = (state) => {
  const { newBoard, removedRows } = processDrop(
    state.board,
    state.currentPiece.shape,
    state.piecePosition,
    state.currentPiece.color,
    state.score,
  );
  const newPiece = getRandomTetromino(false);

  if (!isValidMove(newBoard, newPiece.shape, newPiece)) {
    return resetGame(state.score);
  }

  handleRowClear(removedRows);

  const finalState = updateGameState(state, newBoard, removedRows, newPiece);

  return isValidMove(newBoard, newPiece.shape, finalState.piecePosition)
    ? finalState
    : resetGame(state.score);
};

const handleValidMove = (state, newPosition) => {
  if (isValidMove(state.board, state.currentPiece.shape, newPosition)) {
    return { ...state, piecePosition: newPosition };
  }
  return handleInvalidMove(state);
};

const dropPieceReducer = (state) => {
  if (!state.started || !state.currentPiece) {
    return state;
  }

  const newPosition = { ...state.piecePosition, row: state.piecePosition.row + 1 };

  return handleValidMove(state, newPosition);
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
