import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useOneModel = create(persist(
  (set) => ({
    oneModel: [],
    setOneModel: (oneModel) =>
      set((state) => ({
        ...state,
        oneModel: oneModel,
      })),
  }),
  {
    name: 'oneModel-storage', 
    getStorage: () => localStorage, 
  }
));
export default useOneModel;
