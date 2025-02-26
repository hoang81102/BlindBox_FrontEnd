import { createContext, useState, useEffect } from "react";
import { addToCart as addToCartAPI } from "../Controller/ApiController";
import { loadCart as getCartbyUserId } from "../Controller/ApiController";
import { updateQuantity } from "../Controller/ApiController";
import { deleteItemInCart } from "../Controller/ApiController";
export const CartService = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (userId, product, quantity) => {
    try {
      await addToCartAPI(
        userId,
        product?.blindBoxId,
        product?.packageId,
        quantity
      );
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const loadCart = async (userId) => {
    try {
      const cartData = await getCartbyUserId(userId);
      setCart(cartData || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const increaseQuantity = async (cartId, userId) => {
    const item = cart.find((item) => item.cartId === cartId);
    if (!item) return;

    const newQuantity = item.quantity + 1;

    try {
      await updateQuantity(cartId, userId, newQuantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (cartId, userId) => {
    const item = cart.find((item) => item.cartId === cartId);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    try {
      await updateQuantity(cartId, userId, newQuantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await deleteItemInCart(cartId);
      setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartService.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartService.Provider>
  );
};
