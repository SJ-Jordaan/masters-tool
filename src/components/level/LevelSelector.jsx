import React, { useContext } from "react";
import { LevelContext } from "../../context/LevelContext";
import LevelOverview from "./LevelOverview";

const LevelSelector = ({ categoryId }) => {
  const { levels } = useContext(LevelContext);

  const categoryLevels = levels.filter(
    (level) => level.categoryId === categoryId
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md p-2 space-y-6">
        <h2 className="text-4xl font-bold">Select a Level</h2>
        {categoryLevels.map((level) => (
          <LevelOverview key={level.levelId} level={level} />
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
