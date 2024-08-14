import React from 'react';
import uniqueId from 'lodash.uniqueid';

const ScoreDesk = ({ scoreDesk }) => {
  const scores = scoreDesk || {};

  return (
    <div className="score-desk">
      {Object.entries(scores).map(([nickName, score]) => (
        <div key={nickName} className="score-entry">
          <div className="scores">
            Game Records
            <br />
            <br />
            <div key={uniqueId()} className="players-score">
              {nickName}
              :&nbsp;
              {score}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreDesk;
