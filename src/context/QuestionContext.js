import React, { createContext } from "react";
import useQuestions from "../hooks/useQuestions";
import useGenerateQuestions from "../hooks/useGenerateQuestions";
import useEvaluateAnswer from "../hooks/useEvaluateAnswer";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const { questions, saveQuestion, completeQuestion, setQuestions } =
    useQuestions();

  const generateQuestions = useGenerateQuestions(setQuestions);

  const evaluateAnswer = useEvaluateAnswer(questions);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        saveQuestion,
        evaluateAnswer,
        completeQuestion,
        generateQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
