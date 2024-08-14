import GameOverModal from './GameOverModal';
import { handleRestartClick, handleCloseClick } from '../handlers/clickHandlers';

const GameOverModalContainer = ({
  score, dispatch, showGameOverModal, setShowGameOverModal,
}) => (
  <GameOverModal
    score={score}
    onRestartClick={handleRestartClick(score, dispatch, setShowGameOverModal)}
    onCloseClick={handleCloseClick(score, dispatch, setShowGameOverModal)}
    isModalOpen={showGameOverModal}
  />
);

export default GameOverModalContainer;
