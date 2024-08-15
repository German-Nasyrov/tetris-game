import { dropPiece } from '../slices/gameSlice';

let animationActive = false;

const startAnimation = (dispatch, gameState, lastUpdateTimestamp) => {
  const animate = (timestamp) => {
    if (!gameState.started || gameState.gameIsOver || !animationActive) {
      return;
    }

    if (timestamp - lastUpdateTimestamp.current >= gameState.fallSpeed) {
      lastUpdateTimestamp.current = timestamp;
      dispatch(dropPiece());
    }

    requestAnimationFrame(animate);
  };

  return () => {
    animationActive = true;
    requestAnimationFrame(animate);
  };
};

const stopAnimation = () => {
  animationActive = false;
};

export { startAnimation, stopAnimation };
