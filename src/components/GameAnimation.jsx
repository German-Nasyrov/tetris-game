import { useEffect, useRef } from 'react';
import handleGameState from '../handlers/gameStateHandlers';
import { setFallSpeed } from '../slices/gameSlice';

const GameAnimation = ({ dispatch, gameState, setShowGameOverModal }) => {
  const timestampRef = useRef(0);
  const lastUpdateTimestamp = useRef(timestampRef.current);

  useEffect(() => {
    const dispatchSetFallSpeed = (speed) => dispatch(setFallSpeed(speed));
    const handleAnimationFrame = () => {
      handleGameState(
        dispatch,
        gameState,
        dispatchSetFallSpeed,
        setShowGameOverModal,
        lastUpdateTimestamp,
      );
    };
    const requestId = requestAnimationFrame(handleAnimationFrame);

    return () => cancelAnimationFrame(requestId);
  }, [gameState, dispatch, setShowGameOverModal]);
};

export default GameAnimation;
