import GameBoard from './GameBoard';
import CurrentPiece from './CurrentPiece';

const GameBoardContainer = ({ gameState }) => (
  <div className="game-board-container">
    <GameBoard
      board={gameState.board}
      currentPiece={gameState.currentPiece}
      piecePosition={gameState.piecePosition}
    >
      <CurrentPiece
        piece={gameState.currentPiece}
        piecePosition={gameState.piecePosition}
      />
    </GameBoard>
  </div>
);

export default GameBoardContainer;
