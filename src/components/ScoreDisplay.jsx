import React from 'react';
import StartButton from './StartButton';
import { handleStartClick } from '../handlers/clickHandlers';

const ScoreDisplay = ({ score, started, dispatch }) => (
  <div className="score-container">
    <div className="score">
      Score:
      {' '}
      {score}
    </div>
    {!started && (
      <div className="button-container">
        <StartButton onStartClick={handleStartClick(dispatch)} />
      </div>
    )}
  </div>
);

export default ScoreDisplay;
