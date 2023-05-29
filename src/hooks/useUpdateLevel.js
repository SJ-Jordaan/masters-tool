import { Level } from "../common/models/Level";

const useUpdateLevel = (setLevels) => {
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

  const addLevel = (level) => {
    const newLevel = new Level(level);
    setLevels((prevLevels) => {
      return [...prevLevels, newLevel];
    });
  };

  const completeQuestion = (levels, levelId, score) => {
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

  return {
    addLevel,
    startLevel,
    completeQuestion,
    setCurrentQuestionIndex,
    quitLevel,
    trackIncorrectAttempts,
    trackHintsUsed,
    trackTimeTaken,
    completeLevel,
    updateLevelState,
  };
};

export default useUpdateLevel;
