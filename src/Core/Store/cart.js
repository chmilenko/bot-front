import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  typeDelivery: [],
  typePickup: {
    phoneNumber: '',
  },
  typeSdek: {
    fullName: '',
    address: '',
    phoneNumber: '',
  },
  typeCity: {
    fullName: '',
    address: '',
    phoneNumber: '',
  },
  selectedDeliveryType: null,
  addToCart: (model_id, size_id, size, price, totalCount) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.model_id === model_id && item.size_id === size_id
      );
      const updatedCartItems = existingItem
        ? state.cartItems.map((item) =>
            item.model_id === model_id && item.size_id === size_id
              ? { ...item, count: item.count + 1 }
              : item
          )
        : [
            ...state.cartItems,
            { model_id, size_id, size, count: 1, price, totalCount },
          ];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  removeFromCart: (model_id, size_id) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.model_id !== model_id || item.size_id !== size_id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  updateItemCount: (model_id, size_id, newCount) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.model_id === model_id && item.size_id === size_id
          ? { ...item, count: newCount }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  clearCart: () => {
    localStorage.removeItem("cartItems");
    set({ cartItems: [] });
  },
  loadCart: () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    set({ cartItems });
  },
  loadTypesDelivery: (types) => 
    set((state) => ({
      ...state,
      typeDelivery: types,
    })),
  updateTypePickup: (data) =>
    set((state) => ({
      typePickup: { ...state.typePickup, ...data },
    })),
  updateTypeSdek: (data) =>
    set((state) => ({
      typeSdek: { ...state.typeSdek, ...data },
    })),
  updateTypeCity: (data) =>
    set((state) => ({
      typeCity: { ...state.typeCity, ...data },
    })),
  clearTypeDelivery: (type) =>
    set((state) => ({
      [type]: Object.keys(state[type]).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    })),
  setSelectedDeliveryType: (deliveryType) => 
    set({ selectedDeliveryType: deliveryType }), // Добавляем выбранный тип доставки
}));

export default useCartStore;