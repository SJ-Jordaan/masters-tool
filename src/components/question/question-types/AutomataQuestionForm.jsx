import React, { useMemo } from "react";
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
  const automaton = useMemo(() => {
    const dfa = to_NFA(
      normaliseAlphabet(question.answer),
      normaliseAlphabet(question.alphabet)
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
      transitions: [],
      initial: stateMap.get(dfa.initial),
      finals: dfa.final.map((state) => stateMap.get(state)),
    };
  }, [question.alphabet, question.answer]);

  const handleNewTransition = (startNodeId, endNodeId, symbol) => {
    // Create a new version of the automaton with the transition added.
    // The exact implementation depends on how your automaton and transitions are structured.
    const newAutomaton = {
      ...automaton,
      transitions: [
        ...automaton.transitions,
        {
          startNodeId,
          endNodeId,
          symbol,
        },
      ],
    };

    // Pass the new automaton to handleInput.
    handleInput(newAutomaton);
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-2">
      <p className="text-xl">{question.questionContent}</p>

      <div className="w-full h-96">
        <AutomatonBuilder
          automaton={automaton}
          answer={answer}
          handleInput={handleNewTransition}
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
