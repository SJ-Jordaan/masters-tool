import create from "zustand";

const useGraphStore = create(
  (set, get) => ({
    isLocked: false,
    setIsLocked: (isLocked) => set({ isLocked: isLocked }),
    alphabet: "01",
    setAlphabet: (alphabet) => set({ alphabet: alphabet }),
  }),
  {
    name: "graph-settings-store",
  }
);

export default useGraphStore;
