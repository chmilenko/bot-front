import { create } from "zustand";

const useModels = create((set) => ({
  modelsNike: [],
  modelsAdidas: [],
  modelsRickOwens: [],
  setModelsNike: (models) =>
    set((state) => ({
      ...state,
      modelsNike: models,
    })),
  setModelsAdidas: (models) =>
    set((state) => ({
      ...state,
      modelsAdidas: models,
    })),
  setModelsRickOwens: (models) =>
    set((state) => ({
      ...state,
      modelsRickOwens: models,
    })),
}));
export default useModels;
