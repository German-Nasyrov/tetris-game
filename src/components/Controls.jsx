import { useEffect, useState, useCallback } from 'react';
import { movePiece, rotateCurrentPiece, dropPiece } from '../slices/gameSlice';

const Controls = ({ gameState, dispatch, sounds }) => {
  const [isArrowDownPressed, setIsArrowDownPressed] = useState(false);
  const currentCol = gameState.piecePosition.col;

  const handleArrowLeft = useCallback(() => {
    dispatch(movePiece({ col: currentCol - 1 }));
    sounds.playMoveSound();
  }, [dispatch, currentCol, sounds]);

  const handleArrowRight = useCallback(() => {
    dispatch(movePiece({ col: currentCol + 1 }));
    sounds.playMoveSound();
  }, [dispatch, currentCol, sounds]);

  const handleArrowUp = useCallback(() => {
    dispatch(rotateCurrentPiece());
    sounds.playRotateSound();
  }, [dispatch, sounds]);

  const handleArrowDown = useCallback(() => {
    dispatch(dropPiece());
    if (!isArrowDownPressed) {
      sounds.playDropSound();
      setIsArrowDownPressed(true);
    }
  }, [dispatch, isArrowDownPressed, sounds]);

  const onKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleArrowLeft();
        break;
      case 'ArrowRight':
        handleArrowRight();
        break;
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowDown':
        handleArrowDown();
        break;
      default:
        break;
    }
  }, [handleArrowLeft, handleArrowRight, handleArrowUp, handleArrowDown]);

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
