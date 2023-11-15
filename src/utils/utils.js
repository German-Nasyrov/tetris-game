import randomColor from 'randomcolor';

const createTetromino = (shapes, startRow, startCol) => ({
  shapes: shapes.map((shape) => shape.map((row) => [...row])),
  startRow,
  startCol,
});

const tetrominoes = {
  I: createTetromino([[1, 1, 1, 1], [0, 0, 0, 0]], -2, 3),
  L: createTetromino([[0, 0, 1], [1, 1, 1]], -1, 4),
  O: createTetromino([[1, 1], [1, 1]], -1, 4),
  T: createTetromino([[0, 1, 0], [1, 1, 1]], -1, 4),
  Z: createTetromino([[1, 1, 0], [0, 1, 1]], -1, 4),
};

const isValidMove = (board, piece, newPosition) => {
  if (!board || !piece) return false;

  return !piece.some((row, rowIndex) => row.some((cell, colIndex) => {
    const newRow = newPosition.row + rowIndex;
    const newCol = newPosition.col + colIndex;

    const isRowOutOfRange = newRow < -2 || newRow >= board.length;
    const isColOutOfRange = newCol < 0 || newCol >= board[0].length;
    const isCellOccupied = board[newRow] && board[newRow][newCol] !== null;

    if (cell && (isRowOutOfRange || isColOutOfRange || isCellOccupied)) {
      return true;
    }

    return false;
  }));
};

const copyBoardWithColors = (board) => board
  .map((row) => row.map((cell) => (cell?.color ? { color: cell.color } : null)));

const placePieceOnBoard = (board, piece, position, pieceColor) => {
  piece.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell && position.row + rowIndex >= 0) {
        const newCol = position.col + colIndex;
        board[position.row + rowIndex][newCol] = { color: pieceColor };
      }
    });
  });
};

const removeFullRows = (board) => {
  const removedRows = [];
  let rowIndex = board.length - 1;
  let removedRowCount = 0;

  while (rowIndex >= 0) {
    if (board[rowIndex].every((cell) => cell !== null)) {
      const numRowsToRemove = 1;
      removedRowCount += 1;

      for (let i = 0; i < numRowsToRemove; i += 1) {
        board.splice(rowIndex, 1);
        board.unshift(Array(board[0].length).fill(null));
      }
    } else {
      rowIndex -= 1;
    }
  }

  return { removedRows, removedRowCount };
};

const processDrop = (board, piece, position, pieceColor, score) => {
  const newBoard = copyBoardWithColors(board);
  let newScore = score;

  placePieceOnBoard(newBoard, piece, position, pieceColor);

  const { removedRows, removedRowCount } = removeFullRows(newBoard);

  if (removedRowCount > 0) {
    newScore += 100 * removedRowCount;
  }

  return { newBoard, removedRows, newScore };
};

const calculateScore = (removedRows) => removedRows.length * 100;

const rotatePieceClockwise = (tetromino) => {
  const rows = tetromino.shape.length;
  const cols = tetromino.shape[0].length;
  const rotatedPiece = Array.from({ length: cols }, () => Array.from({ length: rows }, () => 0));

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rotatedPiece[col][rows - 1 - row] = tetromino.shape[row][col];
    }
  }

  return rotatedPiece;
};

const getRandomKey = (tetrominoKeys) => {
  if (tetrominoKeys.length === 0) {
    console.error('No tetrominoes defined.');
    return null;
  }

  return tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
};

const getRandomOrientationIndex = (isIPiece, shapes) => (
  isIPiece
    ? 0
    : Math.floor(Math.random() * shapes.length)
);

const getRandomTetromino = (isFirstPiece) => {
  const tetrominoKeys = Object.keys(tetrominoes);
  const randomKey = getRandomKey(tetrominoKeys);
  const initialOrientations = tetrominoes[randomKey];
  const isIPiece = randomKey === 'I';
  const isFirstIPiece = isIPiece ? -1 : 0;

  if (!initialOrientations || !initialOrientations.shapes
      || initialOrientations.shapes.length === 0) {
    console.error(`No orientations defined for ${randomKey}.`);
    return null;
  }

  const randomOrientationIndex = getRandomOrientationIndex(isIPiece, initialOrientations.shapes);
  const randomTetromino = {
    shape: initialOrientations.shapes[randomOrientationIndex],
    color: randomColor(),
    startRow: isFirstPiece ? initialOrientations.startRow : isFirstIPiece,
    startCol: initialOrientations.startCol,
  };

  return randomTetromino;
};

const speedMap = {
  1200: 700,
  2600: 600,
  4000: 500,
  5400: 400,
  7800: 300,
  9000: 250,
  12000: 200,
  15000: 150,
  20000: 100,
};

export {
  tetrominoes, isValidMove, processDrop, calculateScore, rotatePieceClockwise, getRandomTetromino,
  speedMap,
};
