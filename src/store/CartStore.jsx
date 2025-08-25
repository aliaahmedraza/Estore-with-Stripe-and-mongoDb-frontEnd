import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  emptyCart: () => set({ cartItems: [] }),
  getCartItemsQuantity: () =>
    get().cartItems.reduce((total, item) => total + item.quantity, 0),

  getCartItemsTotalPrice: () =>
    get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}));

export default useCartStore;
