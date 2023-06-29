import React, { useState } from "react";

const AutomatonBuilder = ({ answer, handleInput }) => {
  const [currentState, setCurrentState] = useState(answer.states[0]);
  const [currentSymbol, setCurrentSymbol] = useState(answer.alphabet[0]);
  const [currentAutomaton, setCurrentAutomaton] = useState(answer);

  const isMissingTransition = (state, symbol = null) => {
    if (symbol === null) {
      // Check if a state is missing any transition
      return !currentAutomaton.transitions
        .filter((transition) => transition.from === state)
        .every((transition) => transition.to !== "");
    } else {
      // Check if a state-symbol pair is missing a transition
      return !currentAutomaton.transitions.some(
        (transition) =>
          transition.from === state &&
          transition.label === symbol &&
          transition.to !== ""
      );
    }
  };

  const handleStateSelect = (selectedState) => {
    const oldTransition = currentAutomaton.transitions.find(
      (transition) =>
        transition.from === currentState && transition.label === currentSymbol
    );
    const updatedTransitions = currentAutomaton.transitions.map(
      (transition) => {
        if (transition === oldTransition) {
          return {
            ...transition,
            to: selectedState,
          };
        } else {
          return transition;
        }
      }
    );

    const updatedAutomaton = {
      ...currentAutomaton,
      transitions: updatedTransitions,
    };

    setCurrentAutomaton(updatedAutomaton);
    handleInput(currentState, selectedState, currentSymbol);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="tabs tabs-boxed flex flex-wrap">
        {currentAutomaton.states.map((state, index) => (
          <div
            className={`tab ${currentState === state && "tab-active"} flex-1`}
            onClick={() => setCurrentState(state)}
            key={`state-${index}`}
          >
            {state}
            {isMissingTransition(state) && "*"}
          </div>
        ))}
      </div>
      <div className="tabs tabs-boxed flex flex-wrap">
        {currentAutomaton.alphabet.map((symbol, index) => (
          <div
            className={`tab ${currentSymbol === symbol && "tab-active"} flex-1`}
            onClick={() => setCurrentSymbol(symbol)}
            key={`symbol-${index}`}
          >
            {symbol}
            {isMissingTransition(currentState, symbol) && "*"}
          </div>
        ))}
      </div>
      <div className="tabs tabs-boxed flex flex-wrap">
        {currentAutomaton.states.map((state, index) => {
          const isActive =
            currentAutomaton.transitions.find(
              (transition) =>
                transition.from === currentState &&
                transition.label === currentSymbol &&
                transition.to === state
            ) !== undefined;
          return (
            <div
              className={`tab ${isActive && "tab-active"} flex-1`}
              onClick={() => handleStateSelect(state)}
              key={`end-${index}`}
            >
              {state}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomatonBuilder;
