import React, { createContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";
import questionsData from "../data/questions.json";
import { Question } from "../common/models/Question";
import to_NFA from "dfa-lib/regex";
import { RegexFactory } from "../common/models/RegexFactory";

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
    q.operators,
    q.isGenerated
  );

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const saveQuestionProgressToLocalStorage = (questions) => {
    const progressQuestions = questions.filter(
      (question) => question.isCompleted || question.isGenerated
    );
    saveToLocalStorage("questions", progressQuestions);
  };

  const initializeQuestions = () => {
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
  };

  useEffect(() => {
    if (questions.length === 0) {
      initializeQuestions();
    } else {
      saveQuestionProgressToLocalStorage(questions);
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const generateQuestions = (questionTypes, difficulty, numQuestions) => {
    const questionStubs = Array(numQuestions)
      .fill()
      .map((_, i) => ({
        questionId: Date.now().toString() + i, // or however you generate question IDs
        type: questionTypes[i % questionTypes.length], // cycles through question types
      }));

    const alphabet = [
      ["a", "b"],
      ["a", "b", "c"],
      ["a", "b", "c"],
      ["a", "b", "c", "d"],
      ["a", "b", "c", "d"],
    ][difficulty - 1];

    const operators = [
      ["*", "|", "(", ")"],
      ["*", "|", "(", ")"],
      ["*", "|", "(", ")"],
      ["*", "|", "(", ")"],
      ["*", "|", "(", ")"],
    ][difficulty - 1];

    const rf = new RegexFactory(alphabet);
    const regexTypes = [
      "begin",
      "contain",
      "end",
      "exact",
      "at least",
      "divisible",
    ];

    const questionTemplates = {
      begin: (string) =>
        `Provide a regular expression that recognises strings that begin with ${string}`,
      contain: (string) =>
        `Provide a regular expression that recognises strings that contain ${string}`,
      end: (string) =>
        `Provide a regular expression that recognises strings that end with ${string}`,
      exact: (string) =>
        `Provide a regular expression that recognises strings that are exactly ${string.length} characters long`,
      "at least": (string) =>
        `Provide a regular expression that recognises strings that contain at least ${string.length} characters`,
      divisible: (length) =>
        `Provide a regular expression that recognises strings with a length divisible by ${length}`,
    };

    const newQuestions = questionStubs.map((questionStub) => {
      const regexType =
        regexTypes[Math.floor(Math.random() * regexTypes.length)];
      const relevantLength = (difficulty % 2) + 1;
      switch (questionStub.type) {
        case "Regex":
          const regex = rf.randomRE(relevantLength, regexType);
          const string =
            regexType === "divisible"
              ? relevantLength
              : to_NFA(regex, alphabet).to_DFA().find_passing();
          return new Question(
            questionStub.questionId,
            questionStub.type,
            questionTemplates[regexType](string),
            alphabet.join(""),
            regex,
            "Hints are disabled for custom questions",
            difficulty * 4 + 5,
            false,
            operators,
            true
          );
        case "Regex Equivalence":
          const regex1 = rf.randomRE((difficulty % 2) + 1, regexType);
          return new Question(
            questionStub.questionId,
            questionStub.type,
            `Provide a regular expression that is equivalent to ${regex1}`,
            alphabet.join(""),
            regex1,
            "Hints are disabled for custom questions",
            difficulty * 4 + 5,
            false,
            operators,
            true
          );
        case "Regex Accepts String":
          const regex2 = rf.randomRE((difficulty % 2) + 1, regexType);
          const string2 = to_NFA(regex2, alphabet).to_DFA().find_passing();
          return new Question(
            questionStub.questionId,
            questionStub.type,
            `Provide a regular expression accepts the string ${string2}?`,
            alphabet.join(""),
            regex2,
            "Hints are disabled for custom questions",
            difficulty * 4 + 5,
            false,
            operators,
            true
          );
        default:
          throw new Error("Invalid question type");
      }
    });

    // add new questions to your questions state array
    setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);

    // return the array of new questions
    return newQuestions;
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
      return null;
    }
  }

  const evaluateAnswer = (questionId, answer) => {
    const question = questions.find((q) => q.questionId === questionId);
    if (!question) {
      return { equal: false, counterExamples: null };
    }

    switch (question.questionType) {
      case "Regex Equivalence":
        if (question.answer === answer) {
          return {
            equal: false,
            counterExamples: null,
            message: "You can't use the same regex",
          };
        }
      // eslint-disable-next-line no-fallthrough
      case "Regex":
        let m1 = parse(answer.replace(/\s/g, ""), question.alphabet);
        let m2 = parse(question.answer.replace(/\s/g, ""), question.alphabet);

        if (!m1 || !m2) {
          return { equal: false, counterExamples: null };
        }
        let counterExamples = findEquivalenceCounterexamples(m1, m2);

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
      value={{
        questions,
        saveQuestion: saveQuestionProgressToLocalStorage,
        evaluateAnswer,
        completeQuestion,
        generateQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
