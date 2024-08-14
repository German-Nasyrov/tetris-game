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
  gameIsOver: false,
  timeUntilStart: 500,
  nickName: '',
  scoreDesk: {},
};

const setNewRecordReducer = (state, action) => {
  const newRecord = action.payload;
  const { nickName, scoreDesk } = state;
  const updatedScoreDesk = {
    ...scoreDesk,
    [nickName]: Math.max(scoreDesk[nickName] || 0, newRecord),
  };

  return { ...state, scoreDesk: updatedScoreDesk, lastScore: newRecord };
};

const setNickNameReducer = (state, action) => {
  const nickName = action.payload;
  return { ...state, nickName };
};

const startGameReducer = (state) => {
  const { started, nickName, scoreDesk } = state;

  if (started) return state;

  const newPiece = getRandomTetromino(true);
  const { startRow, startCol } = newPiece;

  return {
    ...initialState,
    started: true,
    currentPiece: newPiece,
    piecePosition: { row: startRow, col: startCol },
    nickName,
    scoreDesk,
  };
};

const movePieceReducer = (state, action) => {
  const { payload } = action;

  const {
    started,
    currentPiece,
    piecePosition,
    board,
  } = state;

  if (!started || !currentPiece || !currentPiece.shape) return state;

  const newPosition = { ...piecePosition, ...payload };

  if (!isValidMove(board, currentPiece.shape, newPosition)) return state;

  return { ...state, piecePosition: newPosition };
};

const rotateCurrentPieceReducer = (state) => {
  const {
    started,
    currentPiece,
    piecePosition,
    board,
  } = state;

  if (!started || !currentPiece) return state;

  const currentOrientation = currentPiece;

  if (!currentOrientation.shape) return state;

  const newPiece = rotatePieceClockwise(currentOrientation);
  const newPosition = piecePosition;

  if (!isValidMove(board, newPiece, newPosition)) return state;

  return { ...state, currentPiece: { ...currentOrientation, shape: newPiece } };
};

const dropPieceReducer = (state) => {
  const {
    started,
    currentPiece,
    piecePosition,
    timeUntilStart,
    fallSpeed,
  } = state;

  if (!started || !currentPiece) return state;

  if (timeUntilStart > 0) {
    return { ...state, timeUntilStart: timeUntilStart - fallSpeed };
  }

  const newPosition = { ...piecePosition, row: piecePosition.row + 1 };

  return handleValidMove(state, newPosition, initialState);
};

const setFallSpeedReducer = (state, action) => {
  const { payload } = action;

  return { ...state, fallSpeed: payload };
};

const setGameIsOverReducer = (state, action) => {
  const { payload } = action;

  return { ...state, gameIsOver: payload };
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNewRecord: setNewRecordReducer,
    setNickName: setNickNameReducer,
    startGame: startGameReducer,
    movePiece: movePieceReducer,
    rotateCurrentPiece: rotateCurrentPieceReducer,
    dropPiece: dropPieceReducer,
    setFallSpeed: setFallSpeedReducer,
    setGameIsOver: setGameIsOverReducer,
  },
});

export const {
  setNewRecord,
  setNickName,
  startGame,
  movePiece,
  rotateCurrentPiece,
  dropPiece,
  setFallSpeed,
  setGameIsOver,
} = gameSlice.actions;

export default gameSlice.reducer;
