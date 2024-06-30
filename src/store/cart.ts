import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";

type Product = Prisma.ProductGetPayload<{
  include: {
    attributes: true;
    images: true;
  };
}>;

interface CartItem extends Product {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: Product) => void;
  remove: (idProduct: number) => void;
  removeAll: () => void;
};

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: loadCartFromLocalStorage(),
  count: () => {
    const { cart } = get();
    if (cart.length)
      return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
    return 0;
  },
  add: (product: Product) => {
    const { cart } = get();
    const updatedCart = updateCart(product, cart);
    set({ cart: updatedCart });
    saveCartToLocalStorage(updatedCart);
    toast.success("Product added to cart");
  },
  remove: (idProduct: number) => {
    const { cart } = get();
    const updatedCart = removeCart(idProduct, cart);
    set({ cart: updatedCart });
    saveCartToLocalStorage(updatedCart);
  },
  removeAll: () => {
    set({ cart: [] });
    saveCartToLocalStorage([]);
  },
}));

function updateCart(product: Product, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;

  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, count: item.count + 1 } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: number, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
