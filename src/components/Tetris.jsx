import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFallSpeed } from '../slices/gameSlice';
import { handleStartClick, handleRestartClick, handleCloseClick } from '../handlers/clickHandlers';
import handleGameState from '../handlers/gameStateHandlers';
import Header from './Header';
import GameBoard from './GameBoard';
import CurrentPiece from './CurrentPiece';
import StartButton from './StartButton';
import GameOverModal from './GameOverModal';
import Sounds from './Sounds';
import Controls from './Controls';
import moveSound from '../sounds/move.mp3';
import rotateSound from '../sounds/rotate.mp3';
import dropSound from '../sounds/drop.mp3';

const Tetris = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const sounds = Sounds({ moveSound, rotateSound, dropSound });
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const timestampRef = useRef(0);
  const lastUpdateTimestamp = useRef(timestampRef.current);

  useEffect(() => {
    const dispatchSetFallSpeed = (speed) => dispatch(setFallSpeed(speed));
    const requestId = requestAnimationFrame(() => handleGameState(
      dispatch,
      gameState,
      dispatchSetFallSpeed,
      setShowGameOverModal,
      lastUpdateTimestamp,
    ));

    return () => cancelAnimationFrame(requestId);
  }, [gameState, dispatch]);

  return (
    <div className="main-container">
      <Header />
      <div className="score-container">
        <div className="score">
          Score:
          {' '}
          {gameState.score}
        </div>
        {gameState.started ? null : (
          <div className="button-container">
            <StartButton onStartClick={handleStartClick(dispatch)} />
          </div>
        )}
      </div>
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
    </div>
  );
};

export default Tetris;
