import React, { createContext, useContext } from "react";
import { QuestionContext } from "./QuestionContext";
import useLevels from "../hooks/useLevels";
import useUpdateLevel from "../hooks/useUpdateLevel";

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const { questions } = useContext(QuestionContext);
  const { levels, setLevels } = useLevels(questions);
  const {
    addLevel,
    startLevel,
    completeQuestion: completeQuestionInHook,
    setCurrentQuestionIndex,
    quitLevel,
    trackIncorrectAttempts,
    trackHintsUsed,
    trackTimeTaken,
    completeLevel,
  } = useUpdateLevel(setLevels);

  const completeQuestion = (levelId, score) =>
    completeQuestionInHook(levels, levelId, score);

  return (
    <LevelContext.Provider
      value={{
        levels,
        startLevel,
        completeQuestion,
        setCurrentQuestionIndex,
        quitLevel,
        trackIncorrectAttempts,
        trackHintsUsed,
        trackTimeTaken,
        completeLevel,
        addLevel,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};
