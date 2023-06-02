import React from "react";
import { Link } from "react-router-dom";

const LevelOverview = ({ level }) => {
  const {
    levelId,
    levelName,
    description,
    isCompleted,
    isStarted,
    score,
    totalScore,
    hintsUsed,
    timeTaken,
    incorrectAttempts,
  } = level;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const formattedTime = `${minutes}m ${seconds}s`;

  const progress = totalScore !== 0 ? (score / totalScore) * 100 : 0;

  return (
    <div className="rounded-lg shadow p-4 mb-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{levelName}</h2>
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm text-white ${
            isCompleted
              ? "bg-green-500"
              : isStarted
              ? "bg-primary"
              : "bg-accent"
          }`}
        >
          {isCompleted ? "Completed" : isStarted ? "Started" : "Not Started"}
        </span>
      </div>

      <p className="text-lg">{description}</p>

      <div className="space-y-2">
        <p className="text-sm">
          Progress:{" "}
          <span className="text-green-400">{progress.toFixed(2)}%</span>
        </p>
        <div className="h-2 rounded">
          <div
            className="h-full bg-green-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {isStarted && (
          <div className="grid grid-cols-3 gap-2 text-sm text-center">
            <div className="flex justify-center items-center flex-col">
              <div>Hints used</div>
              <span className="text-green-400">{hintsUsed}</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Time taken</div>
              <span className="text-green-400">{formattedTime}</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Attempts</div>
              <span className="text-green-400">{incorrectAttempts}</span>
            </div>
          </div>
        )}
      </div>

      <Link
        to={`/level/${levelId}`}
        onClick={(e) => {
          if (isCompleted) {
            e.preventDefault();
          }
        }}
        className={`btn btn-outline w-full px-4 py-2 rounded ${
          isCompleted && "hidden"
        }`}
      >
        {isCompleted ? "Completed" : "Start Level"}
      </Link>
    </div>
  );
};

export default LevelOverview;
