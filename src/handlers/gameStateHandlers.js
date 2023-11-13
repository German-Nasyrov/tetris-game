import { speedMap } from '../utils/utils';
import { startAnimation, cancelAnimation } from './animationHandlers';

const handleGameState = (
  dispatch,
  gameState,
  dispatchSetFallSpeed,
  setShowGameOverModal,
  lastUpdateTimestamp,
) => {
  const animate = startAnimation(dispatch, gameState, lastUpdateTimestamp);

  const currentScore = gameState.score;
  let requestId;

  if (speedMap[currentScore] && gameState.fallSpeed !== speedMap[currentScore]) {
    dispatchSetFallSpeed(speedMap[currentScore]);
  }

  if (gameState.started) requestId = requestAnimationFrame(animate);

  if (gameState.gameIsOver) setShowGameOverModal(true);

  return () => cancelAnimation(requestId);
};

export default handleGameState;
