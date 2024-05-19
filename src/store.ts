import { create } from "zustand";
import { orderT } from "./types";
import { Product } from "@prisma/client";

type StoreT = {
  order: orderT[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  deleteProduct: (id: Product["id"]) => void;
  clearOrder:()=>void
};

export const useStore = create<StoreT>((set, get) => ({
  order: [],
  addToCart: (product) => {
    const { categoryId, image, ...data } = product;

    let order: orderT[] = [];
    if (get().order.find((order) => order.id === product.id)) {
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    set(() => ({
      order,
    }));
  },
  increaseQuantity: (id) => {
    const order = get().order.map((order) =>
      order.id === id
        ? {
            ...order,
            quantity: order.quantity + 1,
            subtotal: order.price*(order.quantity+1)
          }
        : order
    );
    set(() => ({ order: order }));
  },
  decreaseQuantity: (id) => {
    let order:orderT[] =get().order
    if (get().order.find((order) => order.quantity > 1)) {
        order = get().order.map((order) =>
        order.id === id
          ? {
              ...order,
              quantity: order.quantity - 1,
              subtotal: order.price*(order.quantity-1)
            }
          : order
      );
    }
    set(() => ({ order: order }));
  },
  deleteProduct: (id)=>{
    const order = get().order.filter((order) => order.id !== id);
    set(()=>({
        order:order
    }))
  },
  clearOrder:()=>{
    set(()=>({
      order: []
    }))
  }
}));
