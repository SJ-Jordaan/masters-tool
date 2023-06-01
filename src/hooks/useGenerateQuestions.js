import { useCallback } from "react";
import { Question } from "../common/models/Question";
import { RegexFactory } from "../common/models/RegexFactory";

const useGenerateQuestions = (setQuestions) => {
  return useCallback(
    (questionTypes, difficulty, numQuestions) => {
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
        ["*", "∪", "(", ")"],
        ["*", "∪", "(", ")"],
        ["*", "∪", "(", ")"],
        ["*", "∪", "(", ")"],
        ["*", "∪", "(", ")"],
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

      const newQuestions = questionStubs.map((questionStub) => {
        const regexType =
          regexTypes[Math.floor(Math.random() * regexTypes.length)];
        const relevantLength = (difficulty % 2) + 1;

        const questionConfig = rf.generateQuestionConfig(
          relevantLength,
          regexType,
          questionStub.type
        );

        return new Question(
          questionStub.questionId,
          questionStub.type,
          questionConfig.questionText,
          alphabet.join(""),
          questionConfig.re,
          questionConfig.hints,
          difficulty * 4 + 5,
          false,
          operators,
          true
        );
      });

      // add new questions to your questions state array
      setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);

      // return the array of new questions
      return newQuestions;
    },
    [setQuestions]
  );
};

export default useGenerateQuestions;
