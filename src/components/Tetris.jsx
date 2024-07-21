/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Nickname from './Nickname';
import GameBoardContainer from './GameBoardContainer';
import GameOverModalContainer from './GameOverModalContainer';
import GameAnimationContainer from './GameAnimationContainer';
import Sounds from './Sounds';
import Controls from './Controls';
import ScoreDisplay from './ScoreDisplay';
import moveSound from '../sounds/move.mp3';
import rotateSound from '../sounds/rotate.mp3';
import dropSound from '../sounds/drop.mp3';

const Tetris = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const sounds = Sounds({ moveSound, rotateSound, dropSound });
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showNickNameModal, setShowNickNameModal] = useState(true);

  useEffect(() => {
    setShowNickNameModal(true);
  }, []);

  return (
    <div className="main-container">
      <Nickname
        dispatch={dispatch}
        showNickNameModal={showNickNameModal}
        setShowNickNameModal={setShowNickNameModal}
      />
      <Header />
      <ScoreDisplay score={gameState.score} started={gameState.started} dispatch={dispatch} />
      <GameBoardContainer gameState={gameState} />
      {gameState.gameIsOver && (
        <GameOverModalContainer
          score={gameState.lastScore}
          dispatch={dispatch}
          showGameOverModal={showGameOverModal}
          setShowGameOverModal={setShowGameOverModal}
        />
      )}
      <Controls gameState={gameState} dispatch={dispatch} sounds={sounds} />
      <GameAnimationContainer dispatch={dispatch} gameState={gameState} setShowGameOverModal={setShowGameOverModal} />
    </div>
  );
};

export default Tetris;
