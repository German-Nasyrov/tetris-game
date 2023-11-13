import Button from 'react-bootstrap/Button';

const GameOverModal = ({
  score, onRestartClick, onCloseClick, isModalOpen,
}) => (
  <div className={`overlay ${isModalOpen ? '' : 'hidden'}`}>
    <div className="modal">
      <h2>Game Over</h2>
      <p>
        Your Score:
        {' '}
        {score}
      </p>
      <Button variant="primary" onClick={onRestartClick}>Start Again</Button>
      <span
        className="close-button"
        role="button"
        tabIndex={0}
        onClick={onCloseClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCloseClick(); }}
      >
        X
      </span>
    </div>
  </div>
);

export default GameOverModal;
