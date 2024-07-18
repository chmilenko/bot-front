import { create } from "zustand";

const useOrder = create((set) => ({
  orders: [],
  order: {

  },
  setOrders: (orders) =>
    set((state) => ({
      ...state,
      orders: orders,
    })),
}));
export default useOrder;
