import React from 'react';
import Button from 'react-bootstrap/Button';

const StartButton = ({ onStartClick }) => (
  <Button onClick={onStartClick} variant="primary" className="start-button">Старт</Button>
);

export default StartButton;
