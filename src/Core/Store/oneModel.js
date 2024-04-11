import { create } from "zustand";

const useOneModel = create((set) => ({
  oneModel: [],
  setOneModel: (oneModel) =>
    set((state) => ({
      ...state,
      oneModel: oneModel,
    })),
}));
export default useOneModel;
