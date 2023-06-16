import { useCallback } from "react";
import to_NFA from "dfa-lib/regex";
import { displayAlphabet, normaliseAlphabet } from "../common/helpers/regex";
import { toast } from "react-toastify";

function union(l1, l2) {
  return l1
    .concat(l2)
    .filter(function (v, i, a) {
      return a.indexOf(v) === i;
    })
    .sort();
}

function findEquivalenceCounterexamples(m1, m2) {
  m1.alphabet = m2.alphabet = union(
    normaliseAlphabet(m1.alphabet),
    normaliseAlphabet(m2.alphabet)
  );
  m1 = m1.minimized();
  m2 = m2.minimized();
  return m1.find_equivalence_counterexamples(m2);
}

function parse(s1, alphabet) {
  try {
    return to_NFA(s1, normaliseAlphabet(alphabet));
  } catch (e) {
    return null;
  }
}

const useEvaluateAnswer = (questions) => {
  return useCallback(
    (questionId, answer) => {
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
        case "Automaton to Regex":
          let m1 = parse(
            normaliseAlphabet(answer),
            normaliseAlphabet(question.alphabet)
          );
          let m2 = parse(
            normaliseAlphabet(question.answer),
            normaliseAlphabet(question.alphabet)
          );

          if (!m1 || !m2) {
            return { equal: false, counterExamples: null };
          }
          let counterExamples = findEquivalenceCounterexamples(m1, m2);

          if (counterExamples[0] === null && counterExamples[1] === null) {
            toast(`Correct answer! +${question.score} points`, {
              position: "bottom-center",
              autoClose: 2000,
              style: {
                fontSize: "1.2rem",
              },
            });

            return {
              equal: true,
              counterExamples: null,
              score: question.score,
            };
          }

          return {
            equal: false,
            counterExamples: displayAlphabet(counterExamples),
            score: 0,
          };

        case "Regex Accepts String":
          let m = parse(
            normaliseAlphabet(question.answer.replace(/\s/g, "")),
            normaliseAlphabet(question.alphabet)
          );

          if (!m) {
            return { equal: false, counterExamples: null };
          }

          if (m.accepts(normaliseAlphabet(answer))) {
            toast(`Correct answer! +${question.score} points`, {
              position: "bottom-center",
              autoClose: 2000,
              style: {
                fontSize: "1.2rem",
              },
            });
            return {
              equal: true,
              counterExamples: null,
              score: question.score,
            };
          }

          return {
            equal: false,
            message: "The string is not accepted by the given regex.",
          };

        case "Construct Automaton":
          return { equal: false, counterExamples: null };
        default:
          return { equal: false, counterExamples: null };
      }
    },
    [questions]
  );
};

export default useEvaluateAnswer;
