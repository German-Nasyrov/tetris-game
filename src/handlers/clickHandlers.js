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

const handleArrowMove = (currentCol, currentColOffset, dispatch, sounds) => {
  dispatch(movePiece({ col: currentCol + currentColOffset }));
  sounds.playMoveSound();
};

const handleArrowLeft = (currentCol, dispatch, sounds) => {
  handleArrowMove(currentCol, -1, dispatch, sounds);
};

const handleArrowRight = (currentCol, dispatch, sounds) => {
  handleArrowMove(currentCol, 1, dispatch, sounds);
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
