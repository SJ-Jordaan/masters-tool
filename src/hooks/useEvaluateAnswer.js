import { useCallback } from "react";
import to_NFA from "dfa-lib/regex";
import { displayAlphabet, normaliseAlphabet } from "../common/helpers/regex";
import { toast } from "react-toastify";
import { NFA } from "dfa-lib";

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

function convertToNFA(automaton) {
  const alphabet = automaton.alphabet;

  // Convert transitions into delta structure
  const delta = {};
  automaton.states.forEach((state) => {
    delta[state] = {};
  });

  automaton.transitions.forEach((transition) => {
    if (transition.label === "") {
      return;
    }

    if (!(transition.label in delta[transition.from])) {
      delta[transition.from][transition.label] = [];
    }
    if (transition.to) {
      delta[transition.from][transition.label].push(transition.to);
    }
  });

  const initial = [automaton.initial];
  const final = automaton.finals;

  return new NFA(alphabet, delta, initial, final);
}

const useEvaluateAnswer = (questions) => {
  return useCallback(
    (questionId, answer) => {
      const question = questions.find((q) => q.questionId === questionId);
      if (!question) {
        return { equal: false, counterExamples: null };
      }

      if (
        question.questionType === "Regex Equivalence" &&
        question.answer === answer
      ) {
        return {
          equal: false,
          counterExamples: null,
          message: "You can't use the same regex",
        };
      }

      const handleEquivalenceEvaluation = (m1, m2) => {
        if (!m1 || !m2) {
          console.log("m1 or m2 is null", m1, m2);
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
      };

      if (
        question.questionType === "Regex Equivalence" ||
        question.questionType === "Regex" ||
        question.questionType === "Automaton to Regex" ||
        question.questionType === "Construct Automaton" ||
        question.questionType === "Construct Automaton Missing Symbols"
      ) {
        let m1 =
          question.questionType === "Construct Automaton" ||
          question.questionType === "Construct Automaton Missing Symbols"
            ? convertToNFA(answer)
            : parse(
                normaliseAlphabet(answer),
                normaliseAlphabet(question.alphabet)
              );

        let m2 = parse(
          normaliseAlphabet(question.answer),
          normaliseAlphabet(question.alphabet)
        );

        console.log("m1", m1);
        console.log("m2", m2);

        return handleEquivalenceEvaluation(m1, m2);
      } else if (question.questionType === "Regex Accepts String") {
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
      } else {
        return { equal: false, counterExamples: null };
      }
    },
    [questions]
  );
};

export default useEvaluateAnswer;
