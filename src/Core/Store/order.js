import { create } from "zustand";

const useOrder = create((set) => ({
  models: [],
  sizes: {},
  price: 0,
  setOrder: (order) =>
    set((state) => ({
      ...state,
      order: order,
    })),
}));
export default useOrder;
