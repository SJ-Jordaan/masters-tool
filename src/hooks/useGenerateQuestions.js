import { useCallback } from "react";
import { Question } from "../common/models/Question";
import to_NFA from "dfa-lib/regex";
import { RegexFactory } from "../common/models/RegexFactory";
import { displayAlphabet, normaliseAlphabet } from "../common/helpers/regex";

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
                : to_NFA(normaliseAlphabet(regex), normaliseAlphabet(alphabet))
                    .to_DFA()
                    .find_passing();

            return new Question(
              questionStub.questionId,
              questionStub.type,
              questionTemplates[regexType](displayAlphabet(string)),
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
            const string2 = to_NFA(
              normaliseAlphabet(regex2),
              normaliseAlphabet(alphabet)
            )
              .to_DFA()
              .find_passing();

            return new Question(
              questionStub.questionId,
              questionStub.type,
              `Provide a regular expression accepts the string ${displayAlphabet(
                string2
              )}?`,
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
    },
    [setQuestions]
  );
};

export default useGenerateQuestions;
