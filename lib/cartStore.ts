/**
 * Shopping cart state management using Zustand
 * Handles cart items, quantities, and total calculations
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurant_id: number;
  restaurant_name?: string;
  image?: string;
  is_veg: boolean;
}

interface CartState {
  items: CartItem[];
  restaurantId: number | null;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set: any, get: any) => ({
      items: [],
      restaurantId: null,

      addItem: (item: CartItem) => {
        const state = get();

        // Check if cart has items from different restaurant
        if (state.restaurantId && state.restaurantId !== item.restaurant_id) {
          if (
            !confirm(
              "Your cart contains items from another restaurant. Clear cart and add this item?"
            )
          ) {
            return;
          }
          set({ items: [item], restaurantId: item.restaurant_id });
          return;
        }

        const existingItem = state.items.find(
          (i: CartItem) => i.id === item.id
        );

        if (existingItem) {
          set({
            items: state.items.map((i: CartItem) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId: item.restaurant_id,
          });
        }
      },

      removeItem: (itemId: number) => {
        const state = get();
        const newItems = state.items.filter((i: CartItem) => i.id !== itemId);
        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
        });
      },

      updateQuantity: (itemId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((i: CartItem) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [], restaurantId: null });
      },

      getTotal: () => {
        return get().items.reduce(
          (total: number, item: CartItem) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce(
          (count: number, item: CartItem) => count + item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
