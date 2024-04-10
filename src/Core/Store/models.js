import { create } from "zustand";

 const useModels = create((set) => ({
    models: [],
    setModels: (models) =>
    set((state) => ({
      ...state,
      models: models,
    })),
}))

export default useModels