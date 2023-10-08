import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LevelEnd = ({
  score,
  totalScore,
  timeTaken,
  hintsUsed,
  incorrectAttempts,
  achievements,
  levels,
}) => {
  const navigate = useNavigate();

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const formattedTime = `${minutes} minute${
    minutes !== 1 ? "s" : ""
  } and ${seconds} second${seconds !== 1 ? "s" : ""}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5 space-y-8">
      <h2 className="text-4xl font-bold text-yellow-400">Level Complete!</h2>

      <div className="w-full max-w-md space-y-8">
        <div>
          <p className="text-lg">Your score:</p>
          <div className="h-3 rounded bg-gray-800 w-full">
            <div
              className="h-full bg-yellow-400 rounded text-xs flex items-center justify-center"
              style={{ width: `${(score / totalScore) * 100}%` }}
            >
              {((score / totalScore) * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        <p className="text-lg">
          Time spent:{" "}
          <span className="font-bold text-yellow-400">{formattedTime}</span>
        </p>
        <p className="text-lg">
          Hints used:{" "}
          <span className="font-bold text-yellow-400">{hintsUsed}</span>
        </p>
        <p className="text-lg">
          Incorrect Answers:{" "}
          <span className="font-bold text-yellow-400">{incorrectAttempts}</span>
        </p>

        {achievements?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <span
                key={index}
                className="bg-green-500 text-black py-1 px-2 rounded-full"
              >
                {achievement}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col space-x-4 gap-8">
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/", { replace: true })}
        >
          Go Home
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const nextLevel = levels.find((level) => !level.isCompleted);

            if (!nextLevel) {
              navigate("/", { replace: true });
              toast("You have completed all levels!");
              return;
            }
            navigate(`/level/${nextLevel.levelId}`, { replace: true });
          }}
        >
          Next Level
        </button>
      </div>
    </div>
  );
};

export default LevelEnd;
