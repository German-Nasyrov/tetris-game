import { dropPiece } from '../slices/gameSlice';

const startAnimation = (dispatch, gameState, lastUpdateTimestamp) => {
  const animate = (timestamp) => {
    if (!gameState.started) return;

    if (timestamp - lastUpdateTimestamp.current >= gameState.fallSpeed) {
      lastUpdateTimestamp.current = timestamp;
      dispatch(dropPiece());
    }

    requestAnimationFrame(animate);
  };

  return animate;
};

const cancelAnimation = (requestId) => () => cancelAnimationFrame(requestId);

export { startAnimation, cancelAnimation };
