import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import GameBoard from './GameBoard';
import CurrentPiece from './CurrentPiece';
import GameOverModal from './GameOverModal';
import Sounds from './Sounds';
import Controls from './Controls';
import ScoreDisplay from './ScoreDisplay';
import GameAnimation from './GameAnimation';
import moveSound from '../sounds/move.mp3';
import rotateSound from '../sounds/rotate.mp3';
import dropSound from '../sounds/drop.mp3';
import { handleRestartClick, handleCloseClick } from '../handlers/clickHandlers';

const Tetris = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const sounds = Sounds({ moveSound, rotateSound, dropSound });
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  return (
    <div className="main-container">
      <Header />
      <ScoreDisplay score={gameState.score} started={gameState.started} dispatch={dispatch} />
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
      {gameState.gameIsOver && (
        <GameOverModal
          score={gameState.lastScore}
          onRestartClick={handleRestartClick(dispatch, setShowGameOverModal)}
          onCloseClick={handleCloseClick(setShowGameOverModal)}
          isModalOpen={showGameOverModal}
        />
      )}
      <Controls gameState={gameState} dispatch={dispatch} sounds={sounds} />
      <GameAnimation
        dispatch={dispatch}
        gameState={gameState}
        setShowGameOverModal={setShowGameOverModal}
      />
    </div>
  );
};

export default Tetris;
