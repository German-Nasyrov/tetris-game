import { speedMap } from '../gameUtils/gameUtils';
import { startAnimation, stopAnimation } from './animationHandlers';

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

  if (speedMap[score] && fallSpeed !== speedMap[score]) {
    dispatchSetFallSpeed(speedMap[score]);
  }

  if (started && !gameIsOver) {
    animate(); // Запуск анимации
  } else {
    stopAnimation(); // Остановка анимации
  }

  if (gameIsOver) {
    setShowGameOverModal(true);
  }
};

export default handleGameState;
