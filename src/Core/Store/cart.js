import create from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (model_id, size_id, size, price, totalCount) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.model_id === model_id && item.size_id === size_id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.model_id === model_id && item.size_id === size_id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [
            ...state.cartItems,
            { model_id, size_id, size, count: 1, price, totalCount },
          ],
        };
      }
    }),
  removeFromCart: (model_id, size_id) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.model_id !== model_id || item.size_id !== size_id
      ),
    })),
  updateItemCount: (model_id, size_id, newCount) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.model_id === model_id && item.size_id === size_id
          ? { ...item, count: newCount }
          : item
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;