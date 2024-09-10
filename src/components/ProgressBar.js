import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="level-info">
        <span>Level: {Math.floor(progress / 10) + 1}</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;