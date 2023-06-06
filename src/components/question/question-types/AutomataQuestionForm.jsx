import React from "react";
import AutomatonBuilder from "../../automaton-builder/AutomatonBuilder";
import to_NFA from "dfa-lib/regex";
import { normaliseAlphabet } from "../../../common/helpers/regex";

const AutomataQuestionForm = ({
  question,
  answer,
  handleInput,
  handleDelete,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const generateAutomaton = (regex, alphabet) => {
    const dfa = to_NFA(
      normaliseAlphabet(regex),
      normaliseAlphabet(alphabet)
    ).minimized();
    const stateMap = new Map(dfa.states.map((state, i) => [state, String(i)]));

    const transitions = dfa.states.flatMap((state) => {
      return dfa.alphabet.flatMap((char) => {
        return {
          from: stateMap.get(state),
          to: stateMap.get(dfa.delta[state][char]),
          label: char,
        };
      });
    });

    return {
      states: Array.from(stateMap.values()),
      alphabet: dfa.alphabet.map((char) => {
        return {
          char: char,
          count: transitions.filter((transition) => {
            return transition.label === char;
          }).length,
        };
      }),
      transitions: transitions,
      initial: stateMap.get(dfa.initial),
      finals: dfa.final.map((state) => stateMap.get(state)),
    };
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-2">
      <p className="text-xl">{question.questionContent}</p>

      <div className="w-full h-96">
        <AutomatonBuilder
          automaton={generateAutomaton(question.answer, question.alphabet)}
          answer={answer}
          handleInput={handleInput}
          handleDelete={handleDelete}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default AutomataQuestionForm;
