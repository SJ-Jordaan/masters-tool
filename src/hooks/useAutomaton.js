import { useState } from "react";

function useAutomaton(initialAutomaton) {
  const [automaton, setAutomaton] = useState(initialAutomaton);

  const addState = (newState) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      states: [...prevAutomaton.states, newState],
    }));
  };

  const removeState = (stateToRemove) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      states: prevAutomaton.states.filter((state) => state !== stateToRemove),
    }));
  };

  const addTransition = (newTransition) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      transitions: [...prevAutomaton.transitions, newTransition],
    }));
  };

  const removeTransition = (transitionToRemove) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      transitions: prevAutomaton.transitions.filter(
        (transition) =>
          transition.from !== transitionToRemove.from ||
          transition.to !== transitionToRemove.to
      ),
    }));
  };

  const setInitialState = (newInitialState) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      initial: newInitialState,
    }));
  };

  const setFinalStates = (newFinalStates) => {
    setAutomaton((prevAutomaton) => ({
      ...prevAutomaton,
      finals: newFinalStates,
    }));
  };

  return {
    automaton,
    addState,
    removeState,
    addTransition,
    removeTransition,
    setInitialState,
    setFinalStates,
  };
}

export default useAutomaton;
