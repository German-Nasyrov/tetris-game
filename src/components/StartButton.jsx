import React from 'react';
import Button from 'react-bootstrap/Button';

const StartButton = ({ onStartClick }) => (
  <Button
    onClick={onStartClick}
    variant="primary"
    className="start-button"
  >
    Start
  </Button>
);

export default StartButton;
