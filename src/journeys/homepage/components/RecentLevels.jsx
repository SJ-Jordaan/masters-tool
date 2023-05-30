import React from "react";
import { Link } from "react-router-dom";

const RecentLevels = ({ levels }) => {
  const sortedLevels = [...levels]
    .sort((a, b) => b.lastAccessed - a.lastAccessed)
    .filter((level) => level.lastAccessed > 0)
    .slice(0, 5);

  if (sortedLevels.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl">Recently Accessed Levels</h2>
      {sortedLevels.map((level, index) => (
        <Link
          to={`/level/${level.levelId}`}
          key={`recent-${level.levelId}-${index}`}
        >
          <p>{level.levelName}</p>
          <progress
            className="progress progress-primary w-56"
            value={level.score}
            max={level.totalScore}
          ></progress>
        </Link>
      ))}
    </div>
  );
};

export default RecentLevels;
