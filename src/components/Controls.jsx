import { useEffect, useState, useCallback } from 'react';
import {
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleArrowDown,
} from '../handlers/clickHandlers';

const Controls = ({ gameState, dispatch, sounds }) => {
  const [isArrowDownPressed, setIsArrowDownPressed] = useState(false);
  const currentCol = gameState.piecePosition.col;

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleArrowLeft(currentCol, dispatch, sounds);
        break;
      case 'ArrowRight':
        handleArrowRight(currentCol, dispatch, sounds);
        break;
      case 'ArrowUp':
        handleArrowUp(dispatch, sounds);
        break;
      case 'ArrowDown':
        handleArrowDown(dispatch, sounds, isArrowDownPressed, setIsArrowDownPressed);
        break;
      default:
        break;
    }
  }, [dispatch, isArrowDownPressed, sounds, currentCol]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowDown') setIsArrowDownPressed(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return null;
};

export default Controls;
