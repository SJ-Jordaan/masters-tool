import React, { createContext, useEffect, useState } from "react";
import { Level } from "../common/models/Level";
import levelsData from "../data/levels.json";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);

  const calculateTotalScore = (level) => {
    const savedQuestions = getFromLocalStorage("questions");
    return level.questionIds
      .map(
        (id) =>
          savedQuestions.find((question) => question.questionId === id)?.score
      )
      .reduce((total, questionScore) => total + questionScore, 0);
  };

  const initializeLevels = () => {
    const savedLevels = getFromLocalStorage("levels");
    if (savedLevels) {
      setLevels(savedLevels.map((levelData) => new Level(levelData)));
    } else {
      const levelsWithTotalScore = levelsData.map((level) => ({
        ...level,
        totalScore: calculateTotalScore(level),
      }));
      const initializedLevels = levelsWithTotalScore.map(
        (levelData) => new Level(levelData)
      );
      setLevels(initializedLevels);
      saveToLocalStorage("levels", initializedLevels);
    }
  };

  useEffect(initializeLevels, []);

  useEffect(() => {
    saveToLocalStorage("levels", levels);
  }, [levels]);

  const updateLevelState = (levelId, newValues) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.levelId === levelId
          ? new Level({ ...level, ...newValues })
          : level
      )
    );
  };

  const startLevel = (levelId) => {
    updateLevelState(levelId, { isStarted: true, isCompleted: false });
  };

  const completeQuestion = (levelId, score) => {
    const currentLevel = levels.find((level) => level.levelId === levelId);
    console.log(score);
    console.log(currentLevel.score);
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
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};
