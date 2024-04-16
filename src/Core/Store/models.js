import { create } from "zustand";

const useModels = create((set) => ({
  allModels: [], 
  modelsNike: [],
  modelsAdidas: [],
  modelsRickOwens: [],
  setAllModels: (models) => 
  set((state) => ({
    ...state,
    allModels: models,
  })),
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
