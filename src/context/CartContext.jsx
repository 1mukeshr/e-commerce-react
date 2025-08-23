import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((items) => {
      const item = items.find((i) => i.id === product.id);
      if (item) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((i) => i.id !== productId)
        : items.map((i) =>
            i.id === productId ? { ...i, quantity } : i
          )
    );
  };

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const toggleCart = () => setShowCart((prev) => !prev);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        showCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export default CartContext;