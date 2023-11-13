import { useEffect, useState, useCallback } from 'react';
import { movePiece, rotateCurrentPiece, dropPiece } from '../slices/gameSlice';

const Controls = ({ gameState, dispatch, sounds }) => {
  const [isArrowDownPressed, setIsArrowDownPressed] = useState(false);
  const currentCol = gameState.piecePosition.col;

  const onKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        dispatch(movePiece({ col: currentCol - 1 }));
        sounds.playMoveSound();
        break;
      case 'ArrowRight':
        dispatch(movePiece({ col: currentCol + 1 }));
        sounds.playMoveSound();
        break;
      case 'ArrowUp':
        dispatch(rotateCurrentPiece());
        sounds.playRotateSound();
        break;
      case 'ArrowDown':
        dispatch(dropPiece());
        if (!isArrowDownPressed) {
          sounds.playDropSound();
          setIsArrowDownPressed(true);
        }
        break;
      default:
        break;
    }
  }, [dispatch, currentCol, isArrowDownPressed, sounds]);

  const onKeyUp = useCallback((e) => {
    if (e.key === 'ArrowDown') setIsArrowDownPressed(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return null;
};

export default Controls;
