import { create } from "zustand";

const useOrder = create((set) => ({
  order: [],
  setOrder: (order) =>
    set((state) => ({
      ...state,
      order: order,
    })),
}));
export default useOrder;
