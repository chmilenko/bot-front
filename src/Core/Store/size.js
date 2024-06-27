import { create } from "zustand";

const useSize = create((set) => ({
  sizes: [],
  setSizes: (sizes) =>
    set((state) => ({
      ...state,
      sizes: sizes,
    })),
}));
export default useSize;
