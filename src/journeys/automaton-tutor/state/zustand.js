import create from "zustand";

export const Context = {
  State: "State",
  Canvas: "Canvas",
  Transition: "Transition",
};

const useAutomatonTutorStore = create((set) => ({
  graphData: {
    nodes: [
      {
        id: "id1",
        name: "name1",
        val: 5,
      },
      {
        id: "id2",
        name: "name2",
        val: 5,
      },
    ],
    links: [
      {
        source: "id1",
        target: "id2",
      },
    ],
  },
  activeContexMenu: Context.Canvas,
  setActiveContexMenu: (context) => set({ activeContexMenu: context }),
  addState: (newState) => (state) => ({
    graphData: {
      nodes: [...state.graphData.nodes, newState],
      links: state.graphData.links,
    },
  }),
  removeState: (stateIndex) => (state) => ({
    graphData: {
      nodes: [
        ...state.graphData.nodes.filter((node) => node.id !== stateIndex),
      ],
      links: state.graphData.links,
    },
  }),
  addTransition: (newTransition) => (state) => ({
    graphData: {
      nodes: state.graphData.nodes,
      links: [...state.graphData.links, newTransition],
    },
    removeTransition: (transitionIndex) => (state) => ({
      graphData: {
        nodes: state.graphData.nodes,
        links: [
          ...state.graphData.links.filter(
            (link) => link.id !== transitionIndex
          ),
        ],
      },
    }),
  }),
}));

export default useAutomatonTutorStore;
