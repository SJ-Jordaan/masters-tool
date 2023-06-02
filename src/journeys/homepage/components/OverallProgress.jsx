import React from "react";
import { Link } from "react-router-dom";

const OverallProgress = ({ categories, levels }) => {
  return (
    <div className="stats stats-vertical shadow flex flex-col justify-center">
      {categories.map((category, index) => {
        const categoryLevels = levels.filter(
          (level) => level.categoryId === category.id
        );

        const totalScore = categoryLevels.reduce(
          (total, level) => total + level.score,
          0
        );

        const totalPossibleScore = categoryLevels.reduce(
          (total, level) => total + level.totalScore,
          0
        );

        const percentageComplete =
          totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;

        return (
          <Link to={`/library/${category.id}`} className="stat" key={index}>
            <div className="stat-figure">
              <div
                className="radial-progress text-green-600"
                style={{ "--value": percentageComplete }}
              >
                {percentageComplete.toFixed(0)}%
              </div>
            </div>
            <div className="stat-title">{category.title}</div>
            <div className="stat-value text-green-600">{totalScore}</div>
            <div className="stat-desc">Total Score</div>
          </Link>
        );
      })}
    </div>
  );
};

export default OverallProgress;
