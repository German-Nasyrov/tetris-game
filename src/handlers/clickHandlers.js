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

const handleArrowKey = (actionFunction, dispatch, sounds) => {
  dispatch(actionFunction());
  sounds.playMoveSound();
};

const handleArrowLeft = (currentCol, dispatch, sounds) => {
  handleArrowKey(() => movePiece({ col: currentCol - 1 }), dispatch, sounds);
};

const handleArrowRight = (currentCol, dispatch, sounds) => {
  handleArrowKey(() => movePiece({ col: currentCol + 1 }), dispatch, sounds);
};

const handleArrowUp = (dispatch, sounds) => {
  dispatch(rotateCurrentPiece());
  sounds.playRotateSound();
};

const handleArrowDown = (dispatch, sounds, isArrowDownPressed, setIsArrowDownPressed) => {
  handleArrowKey(() => dropPiece(), dispatch, sounds);
  if (!isArrowDownPressed) {
    sounds.playDropSound();
    setIsArrowDownPressed(true);
  }
};

export {
  handleStartClick,
  handleRestartClick,
  handleCloseClick,
  handleArrowKey,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleArrowDown,
};
