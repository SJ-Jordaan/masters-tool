import { useEffect, useMemo, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";
import questionsData from "../data/questions.json";
import { Question } from "../common/models/Question";

const createQuestion = (q) =>
  new Question(
    q.questionId,
    q.questionType,
    q.questionContent,
    q.alphabet,
    q.answer,
    q.hint,
    q.score,
    q.isCompleted,
    q.operators,
    q.isGenerated
  );
const useQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const saveQuestionProgressToLocalStorage = (questions) => {
    const progressQuestions = questions.filter(
      (question) => question.isCompleted || question.isGenerated
    );
    saveToLocalStorage("questions", progressQuestions);
  };

  const initializeQuestions = useMemo(() => {
    let savedQuestions = getFromLocalStorage("questions");
    savedQuestions = savedQuestions ? savedQuestions.map(createQuestion) : [];

    const initializedQuestions = [...questionsData].map(createQuestion);

    // Merge savedQuestions with initializedQuestions
    savedQuestions.forEach((savedQuestion) => {
      const index = initializedQuestions.findIndex(
        (initQuestion) => initQuestion.questionId === savedQuestion.questionId
      );

      if (index >= 0) {
        // Replace initializedQuestion with the savedQuestion if it exists
        initializedQuestions[index] = savedQuestion;
      } else {
        // Otherwise, it's a new question (generated), so add it to the list
        initializedQuestions.push(savedQuestion);
      }
    });

    setQuestions(initializedQuestions);
    saveQuestionProgressToLocalStorage(initializedQuestions);
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      initializeQuestions();
    } else {
      saveQuestionProgressToLocalStorage(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const completeQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionId === questionId ? { ...q, isCompleted: true } : q
      )
    );
  };

  return {
    questions,
    saveQuestion: saveQuestionProgressToLocalStorage,
    completeQuestion,
    setQuestions,
  };
};

export default useQuestions;
