import randomColor from 'randomcolor';

const tetrominoes = {
  I: {
    shapes: [
      [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    ],
    startRow: -2,
    startCol: 3,
  },
  L: {
    shapes: [
      [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    ],
    startRow: -1,
    startCol: 4,
  },
  O: {
    shapes: [[[1, 1], [1, 1]]],
    startRow: -1,
    startCol: 4,
  },
  T: {
    shapes: [[[0, 1, 0], [1, 1, 1], [0, 0, 0]]],
    startRow: -1,
    startCol: 4,
  },
  Z: {
    shapes: [
      [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
      [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    ],
    startRow: -1,
    startCol: 4,
  },
};

const isValidMove = (board, piece, newPosition) => {
  if (!board || !piece) return false;

  return !piece.some((row, rowIndex) => row.some((cell, colIndex) => {
    const newRow = newPosition.row + rowIndex;
    const newCol = newPosition.col + colIndex;

    if (cell) {
      if (
        (newRow < -2)
        || (newRow >= board.length)
        || (newCol < 0)
        || (newCol >= board[0].length)
        || (board[newRow] && board[newRow][newCol] !== null)
      ) {
        return true;
      }
    }

    return false;
  }));
};

const processDrop = (board, piece, position, pieceColor, score) => {
  const newBoard = board
    .map((row) => row.map((cell) => (cell?.color ? { color: cell.color } : null)));
  let newScore = score;
  const removedRows = [];

  piece.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell && position.row + rowIndex >= 0) {
        const newCol = position.col + colIndex;
        newBoard[position.row + rowIndex][newCol] = { color: pieceColor };
      }
    });
  });

  let rowIndex = newBoard.length - 1;
  let removedRowCount = 0;

  while (rowIndex >= 0) {
    if (newBoard[rowIndex].every((cell) => cell !== null)) {
      const numRowsToRemove = 1;
      removedRowCount += 1;

      for (let i = 0; i < numRowsToRemove; i += 1) {
        newBoard.splice(rowIndex, 1);
        newBoard.unshift(Array(board[0].length).fill(null));
      }
    } else {
      rowIndex -= 1;
    }
  }

  if (removedRowCount > 0) {
    newScore += 100 * removedRowCount;
    removedRows.push(...Array(removedRowCount).fill(0));
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

const getRandomTetromino = (isFirstPiece) => {
  const tetrominoKeys = Object.keys(tetrominoes);

  if (tetrominoKeys.length === 0) {
    console.error('No tetrominoes defined.');
    return null;
  }

  const randomKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  const initialOrientations = tetrominoes[randomKey];
  const isIPiece = randomKey === 'I';
  const isFirstIPiece = isIPiece ? -1 : 0;

  if (
    !initialOrientations
    || !initialOrientations.shapes
    || initialOrientations.shapes.length === 0
  ) {
    console.error(`No orientations defined for ${randomKey}.`);

    return null;
  }

  const randomOrientationIndex = isIPiece ? 0
    : Math.floor(Math.random() * initialOrientations.shapes.length);

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
