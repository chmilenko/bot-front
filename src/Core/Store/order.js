import { create } from "zustand";

const useOrder = create((set) => ({
  orders: [],
  setOrders: (orders) =>
    set((state) => ({
      ...state,
      orders: orders,
    })),
}));
export default useOrder;
