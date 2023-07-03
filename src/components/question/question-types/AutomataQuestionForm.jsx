import React, { useEffect } from "react";
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
  useEffect(() => {
    const dfa = to_NFA(
      normaliseAlphabet(question.answer),
      normaliseAlphabet(question.alphabet)
    ).minimized();

    const stateMap = new Map();
    stateMap.set(dfa.initial, "0");

    let i = 1;
    for (const state of dfa.states) {
      if (state !== dfa.initial) {
        stateMap.set(state, String(i++));
      }
    }

    const transitionsProvided =
      question.questionType === "Construct Automaton Missing Symbols";
    // Create an empty array for the transitions
    let transitions = [];

    // Populate transitions array using the delta object
    Object.entries(dfa.delta).forEach(([fromState, transition]) => {
      Object.entries(transition).forEach(([symbol, toState]) => {
        // Only add transitions where there is a "to" state
        if (toState) {
          transitions.push({
            from: stateMap.get(fromState),
            to: stateMap.get(toState),
            label: "",
          });
        }
      });
    });

    // Create a set for visited states and a queue for BFS
    const visited = new Set();
    const queue = [stateMap.get(dfa.initial)];

    // Perform BFS to find all reachable states
    while (queue.length) {
      const currentState = queue.shift();
      visited.add(currentState);

      transitions
        .filter((t) => t.from === currentState)
        .forEach((t) => {
          if (!visited.has(t.to)) {
            queue.push(t.to);
          }
        });
    }

    // Filter out states and transitions not connected to the initial state
    const filteredStates = Array.from(stateMap.values()).filter((state) =>
      visited.has(state)
    );
    const filteredTransitions = transitions.filter(
      (t) => visited.has(t.from) && visited.has(t.to)
    );

    // Create a new stateMap for the filtered states
    const filteredStateMap = new Map();
    filteredStateMap.set(filteredStates[0], "0");

    let j = 1;
    for (const state of filteredStates) {
      if (state !== filteredStates[0]) {
        filteredStateMap.set(state, String(j++));
      }
    }

    // Re-map transitions with the new state names
    const reMappedTransitions = filteredTransitions.map((t) => ({
      from: filteredStateMap.get(t.from),
      to: filteredStateMap.get(t.to),
      label: t.label,
    }));

    // Re-map final states with the new state names
    const reMappedFinals = dfa.final.map((state) =>
      filteredStateMap.get(state)
    );

    if (!answer) {
      handleInput({
        states: Array.from(filteredStateMap.values()),
        alphabet: dfa.alphabet,
        transitions: transitionsProvided ? reMappedTransitions : [],
        finals: reMappedFinals,
        initial: filteredStateMap.get(filteredStates[0]),
        current: {
          from: filteredStateMap.get(filteredStates[0]),
          symbols: [],
          to: null,
        },
      });
    }
  }, [question, handleInput, answer]);

  const handleTransitionInput = (from, to = null, symbols = []) => {
    // Split the existing transitions into two arrays:
    // those that match the current 'from' state and those that don't
    const [matchingTransitions, nonMatchingTransitions] = partition(
      answer.transitions,
      (t) => t.from === from
    );

    if (to) {
      // For each symbol, check if a transition already exists from 'from' to 'to'
      // Add new transitions where they do not already exist
      const newTransitions = symbols
        .filter(
          (symbol) =>
            !matchingTransitions.some((t) => t.to === to && t.label === symbol)
        )
        .map((symbol) => ({ from, to, label: symbol }));

      // For each existing transition from 'from' to 'to', check if its symbol is still in the new symbols list
      // If it is not, then it will be excluded, effectively deleting the transition
      const updatedTransitions = matchingTransitions.filter(
        (t) => t.to !== to || symbols.includes(t.label)
      );

      handleInput({
        ...answer,
        transitions: [
          ...nonMatchingTransitions,
          ...newTransitions,
          ...updatedTransitions,
        ],
        current: { from, to, symbols },
      });
    } else {
      // If there's no 'to' state, we simply update the 'from' state and reset 'to' and 'symbols'
      handleInput({
        ...answer,
        transitions: answer.transitions,
        current: { from, to: null, symbols: [] },
      });
    }
  };

  // Helper function to partition an array into two arrays based on a predicate
  function partition(array, isValid) {
    return array.reduce(
      ([pass, fail], elem) => {
        return isValid(elem)
          ? [[...pass, elem], fail]
          : [pass, [...fail, elem]];
      },
      [[], []]
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full px-2">
      <p id={"question-content"} className="text-xl">
        {question.questionContent}
      </p>

      <div className="w-full h-96">
        {answer && (
          <AutomatonBuilder
            answer={answer}
            isTransitionsProvided={
              question.questionType === "Construct Automaton Missing Symbols"
            }
            handleInput={handleTransitionInput}
            handleDelete={handleDelete}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default AutomataQuestionForm;
