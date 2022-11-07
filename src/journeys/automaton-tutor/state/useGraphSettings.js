import create from "zustand";

const useGraphStore = create(
  (set, get) => ({
    isLocked: false,
    setIsLocked: (isLocked) => set({ isLocked: isLocked }),
  }),
  {
    name: "graph-settings-store",
  }
);

export default useGraphStore;
