
import React from 'react';

const ProgressBar = ({ progress, label = null }) => {
  const displayProgress = Math.max(0, Math.min(100, progress)); 
  const colorClass = displayProgress === 100 ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${colorClass} h-2.5 rounded-full`}
        style={{ width: `${displayProgress}%` }}
        role="progressbar"
        aria-valuenow={displayProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      {label && <p className="text-sm mt-1 text-gray-600">{label}: {displayProgress}%</p>}
    </div>
  );
};

export default ProgressBar;