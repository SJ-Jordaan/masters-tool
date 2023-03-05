import create from "zustand";

export const Context = {
  State: "State",
  Canvas: "Canvas",
  Transition: "Transition",
  Simulation: "Simulation",
};

export const Modal = {
  TestInput: "TestInput",
  EditTransition: "EditTransition",
  EditState: "EditState",
  SelectAlphabet: "SelectAlphabet",
  CustomAlphabet: "CustomAlphabet",
};

const useAutomatonTutorStore = create(
  (set, get) => ({
    graphData: {
      nodes: [],
      links: [],
    },
    targetState: null,
    makeTransition: false,
    selectedEntity: null,
    finalStateIds: [],
    initialStateId: null,
    activeModal: null,
    setActiveModal: (modal) => set({ activeModal: modal }),
    addFinalState: (newStateId) =>
      set((state) => {
        if (state.finalStateIds.includes(newStateId))
          return {
            finalStateIds: [
              ...state.finalStateIds.filter((id) => id !== newStateId),
            ],
          };
        return {
          finalStateIds: [...state.finalStateIds, newStateId],
        };
      }),
    removeFinalStateIds: (stateId) => (state) => ({
      finalStateIds: state.finalStateIds.filter((id) => id !== stateId),
    }),
    setInitialState: (stateId) =>
      set((state) => ({
        initialStateId: stateId === state.initialStateId ? null : stateId,
      })),
    setTargetState: (state) => set({ targetState: state }),
    toggleMakeTransition: () =>
      set((state) => ({ makeTransition: !state.makeTransition })),
    setSelectedEntity: (entity) =>
      set((state) => ({ ...state, selectedEntity: entity })),
    activeContexMenu: Context.Canvas,
    setActiveContexMenu: (context) =>
      set((state) => ({ ...state, activeContexMenu: context })),
    addState: (newState) =>
      set((state) => ({
        graphData: {
          nodes: [...state.graphData.nodes, newState],
          links: state.graphData.links,
        },
      })),
    removeState: (stateIndex) =>
      set((state) => ({
        graphData: {
          nodes: [
            ...state.graphData.nodes.filter((node) => node.id !== stateIndex),
          ],
          links: state.graphData.links,
        },
      })),
    addTransition: (newTransition) =>
      set((state) => ({
        graphData: {
          nodes: state.graphData.nodes,
          links: [...state.graphData.links, newTransition],
        },
      })),
    removeTransition: (transitionIndex) =>
      set((state) => ({
        graphData: {
          nodes: state.graphData.nodes,
          links: [
            ...state.graphData.links.filter(
              (link) => link.index !== transitionIndex
            ),
          ],
        },
      })),
  }),
  {
    name: "automaton-tutor",
  }
);

export default useAutomatonTutorStore;
