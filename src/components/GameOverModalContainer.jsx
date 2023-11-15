import GameOverModal from './GameOverModal';
import { handleRestartClick, handleCloseClick } from '../handlers/clickHandlers';

const GameOverModalContainer = ({
  score, dispatch, showGameOverModal, setShowGameOverModal,
}) => (
  <GameOverModal
    score={score}
    onRestartClick={handleRestartClick(dispatch, setShowGameOverModal)}
    onCloseClick={handleCloseClick(setShowGameOverModal)}
    isModalOpen={showGameOverModal}
  />
);

export default GameOverModalContainer;
