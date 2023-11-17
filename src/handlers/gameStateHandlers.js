import { speedMap } from '../gameUtils/gameUtils';
import { startAnimation, cancelAnimation } from './animationHandlers';

const handleGameState = (
  dispatch,
  gameState,
  dispatchSetFallSpeed,
  setShowGameOverModal,
  lastUpdateTimestamp,
) => {
  const {
    score, fallSpeed, started, gameIsOver,
  } = gameState;

  const animate = startAnimation(dispatch, gameState, lastUpdateTimestamp);
  const currentScore = score;
  let requestId;

  if (speedMap[currentScore] && fallSpeed !== speedMap[currentScore]) {
    dispatchSetFallSpeed(speedMap[currentScore]);
  }

  if (started) requestId = requestAnimationFrame(animate);

  if (gameIsOver) setShowGameOverModal(true);

  return () => cancelAnimation(requestId);
};

export default handleGameState;
