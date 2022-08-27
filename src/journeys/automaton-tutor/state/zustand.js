import create from "zustand";
import { persist } from "zustand/middleware";

export const Context = {
  State: "State",
  Canvas: "Canvas",
  Transition: "Transition",
};

const useAutomatonTutorStore = create(
  (set, get) => ({
    graphData: {
      nodes: [
        {
          id: "id1",
          name: "name1",
          val: 5,
          isInitial: true,
        },
        {
          id: "id2",
          name: "name2",
          val: 5,
          isFinal: true,
        },
        {
          id: "id3",
          name: "name2",
          val: 5,
        },
      ],
      links: [
        {
          source: "id1",
          target: "id3",
        },
      ],
    },
    selectedEntity: null,
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
              (link) => link.id !== transitionIndex
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
