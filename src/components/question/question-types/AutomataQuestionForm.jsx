import React, { useEffect, useMemo } from "react";
import AutomatonBuilder from "../../automaton-builder/AutomatonBuilder";
import to_NFA from "dfa-lib/regex";
import { normaliseAlphabet } from "../../../common/helpers/regex";
import AutomatonRenderer from "../../automaton-renderer/AutomatonRenderer";

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
          to: "",
          label: char,
        };
      });
    });

    return {
      states: Array.from(stateMap.values()),
      alphabet: dfa.alphabet,
      transitions: transitions,
      initial: stateMap.get(dfa.initial),
      finals: dfa.final.map((state) => stateMap.get(state)),
    };
  }, [question.alphabet, question.answer]);

  const handleNewTransition = (startNodeId, endNodeId, symbol) => {
    // Create a new version of the automaton with the transition added.
    // The exact implementation depends on how your automaton and transitions are structured.
    const newAutomaton = {
      ...automaton,
      transitions: answer.transitions.map((transition) => {
        if (transition.from === startNodeId && transition.label === symbol) {
          return {
            ...transition,
            to: endNodeId,
          };
        } else {
          return transition;
        }
      }),
    };

    // Pass the new automaton to handleInput.
    handleInput(newAutomaton);
  };

  useEffect(() => {
    if (!answer) {
      handleInput(automaton);
    }
  }, [handleInput, automaton, answer]);

  return (
    <div className="flex flex-col items-center w-full h-full px-2">
      <p className="text-xl">{question.questionContent}</p>

      <div className="w-full h-96">
        {answer && (
          <>
            <AutomatonRenderer automaton={answer} height={200} />
            <AutomatonBuilder
              automaton={automaton}
              answer={answer}
              handleInput={handleNewTransition}
              handleDelete={handleDelete}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              handleReset={handleReset}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AutomataQuestionForm;
