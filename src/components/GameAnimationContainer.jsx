import GameAnimation from './GameAnimation';

const GameAnimationContainer = ({ dispatch, gameState, setShowGameOverModal }) => (
  <GameAnimation
    dispatch={dispatch}
    gameState={gameState}
    setShowGameOverModal={setShowGameOverModal}
  />
);

export default GameAnimationContainer;
