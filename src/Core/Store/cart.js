import create from "zustand";

const useCartStore = create((set) => ({
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  addToCart: (modelId, sizeId, price) => set((state) => {
    const newCartItems = [
      ...state.cartItems,
      { model_id: modelId, size_id: sizeId, price, count: 1 },
    ];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),
  removeFromCart: (modelId, sizeId) => set((state) => {
    const newCartItems = state.cartItems.filter(
      (item) => item.model_id !== modelId || item.size_id !== sizeId
    );
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),
  updateItemCount: (modelId, sizeId, newCount) => set((state) => {
    const newCartItems = state.cartItems.map((item) =>
      item.model_id === modelId && item.size_id === sizeId
        ? { ...item, count: newCount }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),
  removeAllCart: () => set(() => {
    localStorage.removeItem("cart");
    return { cartItems: [] };
  }),
}));

export default useCartStore;