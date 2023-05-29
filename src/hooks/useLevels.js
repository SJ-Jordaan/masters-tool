import { useState, useEffect } from "react";
import levelsData from "../data/levels.json";
import { Level } from "../common/models/Level";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";

const calculateTotalScore = (level, questions) => {
  return level.questionIds
    ?.map(
      (id) => questions?.find((question) => question.questionId === id)?.score
    )
    .reduce((total, questionScore) => total + questionScore, 0);
};

const saveLevelProgressToLocalStorage = (levels) => {
  const progressLevels = levels.filter(
    (level) => level.isStarted || level.isCompleted || level.isGenerated
  );
  saveToLocalStorage("levels", progressLevels);
};
const useLevels = (questions) => {
  const [levels, setLevels] = useState([]);

  const initializeLevels = () => {
    let savedLevels = getFromLocalStorage("levels");
    savedLevels = savedLevels
      ? savedLevels.map((levelData) => new Level(levelData))
      : [];

    const mergedLevels = levelsData.map((levelData) => {
      const savedLevel = savedLevels.find(
        (savedLevel) => savedLevel.levelId === levelData.levelId
      );
      const levelWithTotalScore = {
        ...levelData,
        totalScore: calculateTotalScore(levelData, questions),
      };
      if (savedLevel) {
        // If a matching level was found in savedLevels, return a new Level with progress merged in.
        return new Level({ ...levelWithTotalScore, ...savedLevel });
      } else {
        // If no matching level was found in savedLevels, just return the level from levelsData.
        return new Level(levelWithTotalScore);
      }
    });

    const allLevels = [
      ...mergedLevels,
      ...savedLevels.filter((level) => level.isGenerated),
    ];
    setLevels(allLevels);
    saveLevelProgressToLocalStorage(allLevels);
  };

  useEffect(() => {
    if (levels.length === 0) {
      initializeLevels();
    } else {
      saveLevelProgressToLocalStorage(levels);
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels]);

  return {
    levels,
    setLevels,
  };
};

export default useLevels;
