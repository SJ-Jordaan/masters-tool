import React, { createContext, useContext, useEffect, useState } from "react";
import { Level } from "../common/models/Level";
import levelsData from "../data/levels.json";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";
import { QuestionContext } from "./QuestionContext";

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const { questions } = useContext(QuestionContext);

  const calculateTotalScore = (level) => {
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
        totalScore: calculateTotalScore(levelData),
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
      return;
    }
    saveLevelProgressToLocalStorage(levels);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels]);

  const addLevel = (level) => {
    const newLevel = new Level(level);
    setLevels((prevLevels) => [...prevLevels, newLevel]);
  };

  const updateLevelState = (levelId, newValues) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) => {
        if (level.levelId === levelId) {
          const l = new Level({ ...level, ...newValues });
          l.updateTimestamp();
          return l;
        }
        return level;
      })
    );
  };

  const startLevel = (levelId) => {
    updateLevelState(levelId, { isStarted: true, isCompleted: false });
  };

  const completeQuestion = (levelId, score) => {
    const currentLevel = levels.find((level) => level.levelId === levelId);
    updateLevelState(levelId, {
      currentQuestionIndex: currentLevel.currentQuestionIndex + 1,
      score: currentLevel.score + score,
    });
  };

  const setCurrentQuestionIndex = (levelId, index) => {
    updateLevelState(levelId, { currentQuestionIndex: index });
  };

  const quitLevel = (levelId) => {
    updateLevelState(levelId, { currentQuestionIndex: 0 });
  };

  const trackIncorrectAttempts = (levelId, incorrectAttempts) => {
    updateLevelState(levelId, { incorrectAttempts: incorrectAttempts });
  };

  const trackHintsUsed = (levelId, hintsUsed) => {
    updateLevelState(levelId, { hintsUsed: hintsUsed });
  };

  const trackTimeTaken = (levelId, timeTaken) => {
    updateLevelState(levelId, { timeTaken: timeTaken });
  };

  const completeLevel = (levelId) => {
    updateLevelState(levelId, {
      isCompleted: true,
    });
  };

  return (
    <LevelContext.Provider
      value={{
        levels,
        startLevel,
        completeQuestion,
        setCurrentQuestionIndex,
        completeLevel,
        quitLevel,
        trackIncorrectAttempts,
        trackHintsUsed,
        trackTimeTaken,
        addLevel,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};
