import create from "zustand";

const useSimulationStore = create(
  (set, get) => ({
    isSimulating: false,
    isAccepting: true,
    isPlaying: false,
    isDoneSimulating: false,
    currentCharIndex: null,
    currentState: null,
    currentTransition: null,
    currentInput: "",
    highlitedStates: [],
    highlitedTransitions: [],
    backtrackingStack: {
      currentCharIndex: [],
      currentState: [],
    },
    updateBacktrackingStack: (currentCharIndex, currentState) =>
      set({
        backtrackingStack: {
          currentCharIndex,
          currentState,
        },
        isDoneSimulating: false,
      }),
    setCurrentCharIndex: (char) => set({ currentCharIndex: char }),
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setIsAccepting: (isAccepting) =>
      set({
        isAccepting: isAccepting,
        isDoneSimulating: true,
        isPlaying: false,
      }),
    setIsSimulating: (isSimulating) => set({ isSimulating: isSimulating }),
    addToHighlitedStates: (state) =>
      set({ highlitedStates: [...get().highlitedStates, state] }),
    addToHighlitedTransitions: (transition) =>
      set({
        highlitedTransitions: [...get().highlitedTransitions, transition],
      }),
    setCurrentState: (state) => set({ currentState: [...state] }),
    setCurrentTransition: (transition) =>
      set({ currentTransition: transition }),
    setCurrentInput: (input) => set({ currentInput: input }),
    reset: () =>
      set({
        isSimulating: true,
        isPlaying: false,
        currentCharIndex: null,
        currentState: null,
        currentTransition: null,
        highlitedStates: [],
        highlitedTransitions: [],
        isAccepting: false,
        isDoneSimulating: false,
        backtrackingStack: {
          currentCharIndex: [],
          currentState: [],
        },
      }),
  }),
  {
    name: "simulation-store",
  }
);

export default useSimulationStore;
