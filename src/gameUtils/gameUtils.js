import randomColor from 'randomcolor';
import rowClearSound from '../sounds/clear_row.mp3';
import gameOverSound from '../sounds/game_over.mp3';

const playGameOverSound = () => new Audio(gameOverSound).play();

const playRowClearSound = () => new Audio(rowClearSound).play();

const calculateScore = (removedRows) => removedRows.length * 100;

const handleRowClear = (removedRows) => {
  if (removedRows.length > 0) playRowClearSound();
};

const createTetromino = (shapes, startRow, startCol) => ({
  shapes: shapes.map((shape) => shape.map((row) => [...row])),
  startRow,
  startCol,
});

const tetrominoes = {
  I: createTetromino([
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
  ], -1, 3),
  L: createTetromino([
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  ], 0, 4),
  O: createTetromino([[[1, 1], [1, 1]]], 0, 4),
  T: createTetromino([[[0, 1, 0], [1, 1, 1], [0, 0, 0]]], 0, 4),
  Z: createTetromino([
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  ], 0, 4),
};

const isCellOccupied = (board, row, col) => board[row] && board[row][col] !== null;

const isMoveOutOfRange = (row, col, numRows, numCols) => {
  const isRowOutOfRange = row < 0 || row >= numRows;
  const isColOutOfRange = col < 0 || col >= numCols;

  return isRowOutOfRange || isColOutOfRange;
};

const isValidMove = (board, piece, newPosition) => {
  if (!board || !piece) return false;

  const numRows = board.length;
  const numCols = board[0].length;

  return !piece.some((row, rowIndex) => row.some((cell, colIndex) => {
    const newRow = newPosition.row + rowIndex;
    const newCol = newPosition.col + colIndex;
    const isRowOutOfRange = isMoveOutOfRange(newRow, 0, numRows);
    const isColOutOfRange = isMoveOutOfRange(newCol, 0, numCols);
    const isCellOccupiedFlag = isCellOccupied(board, newRow, newCol);

    return cell && (isRowOutOfRange || isColOutOfRange || isCellOccupiedFlag);
  }));
};

const copyBoardWithColors = (board) => board
  .map((row) => row.map((cell) => (cell?.color ? { color: cell.color } : null)));

const placePieceOnBoard = (board, piece, position, pieceColor) => {
  const numRows = board.length;
  const numCols = board[0].length;

  piece.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const newRow = position.row + rowIndex;
      const newCol = position.col + colIndex;

      const isWithinBounds = (newRow >= 0)
        && (newRow < numRows)
        && (newCol >= 0)
        && (newCol < numCols);

      if (cell && isWithinBounds) {
        board[newRow][newCol] = { color: pieceColor };
      }
    });
  });
};

const isRowFull = (row) => row.every((cell) => cell !== null);

const removeRow = (board, rowIndex) => {
  board.splice(rowIndex, 1);
  board.unshift(Array(board[0].length).fill(null));
};

const findFullRows = (board) => board
  .map((row, rowIndex) => (isRowFull(row) ? rowIndex : null))
  .filter((index) => index !== null);

const removeFullRows = (board) => {
  const removedRows = findFullRows(board);
  let removedRowCount = 0;

  removedRows.forEach((rowIndex) => {
    removeRow(board, rowIndex);
    removedRowCount += 1;
  });

  return { removedRows, removedRowCount };
};

const processDrop = (board, piece, position, pieceColor, score) => {
  const newBoard = copyBoardWithColors(board);
  let newScore = score;

  placePieceOnBoard(newBoard, piece, position, pieceColor);

  const { removedRows, removedRowCount } = removeFullRows(newBoard);

  if (removedRowCount > 0) newScore += 100 * removedRowCount;

  return { newBoard, removedRows, newScore };
};

const rotatePieceClockwise = (tetromino) => {
  const rotatedPiece = tetromino.shape[0]
    .map((_, colIndex) => tetromino.shape
      .map((row) => row[colIndex]).reverse());

  return rotatedPiece;
};

const getRandomKey = (tetrominoKeys) => {
  if (tetrominoKeys.length === 0) {
    console.error('No tetrominoes defined.');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * tetrominoKeys.length);

  return tetrominoKeys[randomIndex];
};

const getRandomOrientationIndex = (isIPiece, shapes) => {
  const defaultOrientationIndex = 0;
  const randomOrientationIndex = Math.floor(Math.random() * shapes.length);

  return isIPiece ? defaultOrientationIndex : randomOrientationIndex;
};

const getRandomTetromino = (isFirstPiece) => {
  const tetrominoKeys = Object.keys(tetrominoes);
  const randomKey = getRandomKey(tetrominoKeys);
  const initialOrientations = tetrominoes[randomKey];
  const isIPiece = randomKey === 'I';
  const offGrid = -1;
  const onGrid = 0;

  const isFirstIPiece = isIPiece ? offGrid : onGrid;

  const hasValidOrientations = (
    initialOrientations
    && initialOrientations.shapes
    && initialOrientations.shapes.length > 0
  );

  if (!hasValidOrientations) {
    console.error(`No valid orientations defined for ${randomKey}.`);
    return null;
  }

  const randomOrientationIndex = getRandomOrientationIndex(isIPiece, initialOrientations.shapes);

  const startRow = isFirstPiece ? initialOrientations.startRow : isFirstIPiece;

  const randomTetromino = {
    shape: initialOrientations.shapes[randomOrientationIndex],
    color: randomColor(),
    startRow,
    startCol: initialOrientations.startCol,
  };

  return randomTetromino;
};

const resetGame = (initialState, nickName, scoreDesk, lastScore) => {
  playGameOverSound();

  return {
    ...initialState,
    started: false,
    gameIsOver: true,
    lastScore,
    nickName,
    scoreDesk,
  };
};

const updateGameState = (state, newBoard, removedRows, newPiece) => {
  const { score } = state;
  const newScore = score + calculateScore(removedRows);

  return {
    ...state,
    board: newBoard,
    score: newScore,
    piecePosition: { row: newPiece.startRow, col: newPiece.startCol },
    currentPiece: newPiece,
  };
};

const handleInvalidMove = (state, initialState) => {
  const {
    board, currentPiece, piecePosition, score, nickName, scoreDesk,
  } = state;

  const { newBoard, removedRows } = processDrop(
    board,
    currentPiece.shape,
    piecePosition,
    currentPiece.color,
    score,
  );

  const newPiece = getRandomTetromino(false);

  if (!isValidMove(newBoard, newPiece.shape, newPiece)) resetGame(nickName, scoreDesk, score);

  handleRowClear(removedRows);

  const finalState = updateGameState(state, newBoard, removedRows, newPiece);

  return isValidMove(newBoard, newPiece.shape, finalState.piecePosition)
    ? finalState
    : resetGame(initialState, nickName, scoreDesk, score);
};

const handleValidMove = (state, newPosition, initialState) => {
  const { board, currentPiece } = state;

  if (isValidMove(board, currentPiece.shape, newPosition)) {
    return { ...state, piecePosition: newPosition };
  }

  return handleInvalidMove(state, initialState);
};

const isPieceCellFilled = (rowIndex, colIndex, piecePosition, currentPiece) => {
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

const isCellFilledOrPiece = (
  cell,
  isPieceCell,
  rowIndex,
  colIndex,
  piecePosition,
  currentPiece,
) => {
  const isCellFilled = cell !== null
  || (isPieceCell && isPieceCellFilled(rowIndex, colIndex, piecePosition, currentPiece));
  return isCellFilled;
};

const getCellColor = (cell) => cell?.color || null;

const speedMap = {
  1000: 700,
  2000: 600,
  3000: 500,
  4000: 400,
  6000: 300,
  8000: 250,
  10000: 200,
  12000: 150,
  14000: 100,
};

export {
  tetrominoes, isValidMove, processDrop, calculateScore, rotatePieceClockwise, getRandomTetromino,
  speedMap, resetGame, playGameOverSound, handleRowClear, handleValidMove, isCellFilledOrPiece,
  isPieceCellFilled, getCellColor,
};
