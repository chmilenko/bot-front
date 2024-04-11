import { create } from "zustand";

const useMarks = create((set) => ({
  marks: [],
  setMarks: (marks) =>
    set((state) => ({
      ...state,
      marks: marks,
    })),
}));
export default useMarks;
