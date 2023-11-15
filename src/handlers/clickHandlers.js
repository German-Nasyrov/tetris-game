import {
  startGame, movePiece, rotateCurrentPiece, dropPiece,
} from '../slices/gameSlice';

const handleStartClick = (dispatch) => () => dispatch(startGame());

const handleRestartClick = (dispatch, setShowGameOverModal) => () => {
  dispatch(startGame());
  setShowGameOverModal(false);
};

const handleCloseClick = (setShowGameOverModal) => () => {
  setShowGameOverModal(false);
};

const handleArrowLeft = (currentCol, dispatch, sounds) => {
  dispatch(movePiece({ col: currentCol - 1 }));
  sounds.playMoveSound();
};

const handleArrowRight = (currentCol, dispatch, sounds) => {
  dispatch(movePiece({ col: currentCol + 1 }));
  sounds.playMoveSound();
};

const handleArrowUp = (dispatch, sounds) => {
  dispatch(rotateCurrentPiece());
  sounds.playRotateSound();
};

const handleArrowDown = (dispatch, sounds, isArrowDownPressed, setIsArrowDownPressed) => {
  dispatch(dropPiece());

  if (!isArrowDownPressed) {
    sounds.playDropSound();
    setIsArrowDownPressed(true);
  }
};

export {
  handleStartClick,
  handleRestartClick,
  handleCloseClick,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleArrowDown,
};
