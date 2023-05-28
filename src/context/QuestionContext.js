import React, { createContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";
import questionsData from "../data/questions.json";
import { Question } from "../common/models/Question";
import to_NFA from "dfa-lib/regex";

export const QuestionContext = createContext();

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
    q.operators
  );

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = getFromLocalStorage("questions");
    if (savedQuestions) {
      setQuestions(savedQuestions.map(createQuestion));
    } else {
      saveQuestions(questionsData.map(createQuestion));
    }
  }, []);

  const saveQuestions = (questionData) => {
    setQuestions(questionData.map(createQuestion));
    saveToLocalStorage("questions", questionData);
  };

  const completeQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionId === questionId ? { ...q, isCompleted: true } : q
      )
    );
  };

  function union(l1, l2) {
    return l1
      .concat(l2)
      .filter(function (v, i, a) {
        return a.indexOf(v) === i;
      })
      .sort();
  }

  function findEquivalenceCounterexamples(m1, m2) {
    m1.alphabet = m2.alphabet = union(m1.alphabet, m2.alphabet);
    m1 = m1.minimized();
    m2 = m2.minimized();
    return m1.find_equivalence_counterexamples(m2);
  }

  function parse(s1, alphabet) {
    try {
      return to_NFA(s1, alphabet);
    } catch (e) {
      console.log("error", e);
      return null;
    }
  }

  const evaluateAnswer = (questionId, answer) => {
    const question = questions.find((q) => q.questionId === questionId);
    if (!question) {
      return { equal: false, counterExamples: null };
    }
    console.log("question", question);
    console.log("answer", answer);

    switch (question.questionType) {
      case "Regex Equivalence":
        if (question.answer === answer) {
          return {
            equal: false,
            counterExamples: null,
          };
        }
      // eslint-disable-next-line no-fallthrough
      case "Regex":
        let m1 = parse(answer.replace(/\s/g, ""), question.alphabet);
        let m2 = parse(question.answer.replace(/\s/g, ""), question.alphabet);
        console.log("m1", m1);
        console.log("m2", m2);

        if (!m1 || !m2) {
          return { equal: false, counterExamples: null };
        }
        let counterExamples = findEquivalenceCounterexamples(m1, m2);

        console.log("counterExamples", counterExamples);

        return {
          equal: counterExamples[0] === null && counterExamples[1] === null,
          counterExamples: counterExamples.map((c) => (c === "" ? "ε" : c)),
          score:
            counterExamples[0] === null && counterExamples[1] === null
              ? question.score
              : 0,
        };
      case "Regex Accepts String":
        let m = parse(question.answer.replace(/\s/g, ""), question.alphabet);

        if (!m) {
          return { equal: false, counterExamples: null };
        }

        if (m.accepts(answer)) {
          return {
            equal: true,
            counterExamples: null,
            score: question.score,
          };
        }

        return {
          equal: false,
          counterExamples: ["The string is not accepted by the given regex."],
        };

      default:
        return { equal: false, counterExamples: null };
    }
  };

  return (
    <QuestionContext.Provider
      value={{ questions, saveQuestions, evaluateAnswer, completeQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
