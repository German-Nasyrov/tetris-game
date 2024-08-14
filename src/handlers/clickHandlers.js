import {
  setNewRecord, setNickName, startGame, movePiece, rotateCurrentPiece, dropPiece, setGameIsOver,
} from '../slices/gameSlice';

const handleInputChangeNickName = (event, setLocalNickName) => {
  const text = event.target.value;

  if (text.length <= 20) {
    setLocalNickName(text);
  } else {
    setLocalNickName(text.substring(0, 20));
  }
};

const handleAcceptClick = (localNickName, setShowNickNameModal, dispatch, setError, score) => {
  if (localNickName.trim()) {
    dispatch(setNickName(localNickName));
    dispatch(setNewRecord(score));
    setShowNickNameModal(false);
    setError('');
  } else {
    setError('Nickname cannot be empty or just spaces.');
  }
};

const handleStartClick = (score, dispatch) => () => {
  dispatch(setNewRecord(score));
  dispatch(startGame());
};

const handleRestartClick = (score, dispatch, setShowGameOverModal) => () => {
  dispatch(setNewRecord(score));
  dispatch(startGame());
  setShowGameOverModal(false);
};

const handleCloseClick = (score, dispatch, setShowGameOverModal) => () => {
  dispatch(setNewRecord(score));
  setShowGameOverModal(false);
  dispatch(setGameIsOver(false));
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
  handleStartClick,
  handleRestartClick,
  handleCloseClick,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleArrowDown,
};
