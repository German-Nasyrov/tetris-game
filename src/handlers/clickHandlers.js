import {
  setNickName, startGame, movePiece, rotateCurrentPiece, dropPiece,
} from '../slices/gameSlice';

const handleInputChangeNickName = (event, setLocalNickName) => {
  const text = event.target.value;

  if (text.length <= 20) {
    setLocalNickName(text);
  } else {
    setLocalNickName(text.substring(0, 20));
  }
};

const handleAcceptNickName = (localNickName, setShowNickNameModal, dispatch) => {
  dispatch(setNickName(localNickName));
  setShowNickNameModal(false);
};

const handleAcceptClick = (localNickName, setShowNickNameModal, dispatch, setError) => {
  if (localNickName.trim()) {
    handleAcceptNickName(localNickName, setShowNickNameModal, dispatch);
    setError('');
  } else {
    setError('Nickname cannot be empty or just spaces.');
  }
};

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
  handleInputChangeNickName,
  handleAcceptClick,
  handleAcceptNickName,
  handleStartClick,
  handleRestartClick,
  handleCloseClick,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleArrowDown,
};
