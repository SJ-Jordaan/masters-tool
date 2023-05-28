import React, { useContext } from "react";
import { LevelContext } from "../../context/LevelContext";
import LevelOverview from "./LevelOverview";

const LevelSelector = () => {
  const { levels } = useContext(LevelContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md rounded-lg shadow-md p-6 bg-gray-800 space-y-6">
        <h2 className="text-4xl font-bold text-yellow-400">Select a Level</h2>
        {levels.map((level) => (
          <LevelOverview key={level.levelId} level={level} />
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
