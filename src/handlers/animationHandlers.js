import { dropPiece } from '../slices/gameSlice';

const startAnimation = (dispatch, gameState, lastUpdateTimestamp) => {
  const animate = (timestamp) => {
    if (!gameState.started || !gameState.gameIsOver) return;

    if (timestamp - lastUpdateTimestamp.current >= gameState.fallSpeed) {
      lastUpdateTimestamp.current = timestamp;
      dispatch(dropPiece());
    }

    requestAnimationFrame(animate);
  };

  return animate;
};

export default startAnimation;
