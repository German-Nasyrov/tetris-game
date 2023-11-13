import { startGame } from '../slices/gameSlice';

const handleStartClick = (dispatch) => () => dispatch(startGame());

const handleRestartClick = (dispatch, setShowGameOverModal) => () => {
  dispatch(startGame());
  setShowGameOverModal(false);
};

const handleCloseClick = (setShowGameOverModal) => () => {
  setShowGameOverModal(false);
};

export { handleStartClick, handleRestartClick, handleCloseClick };
