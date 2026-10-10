import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'snaptreasures_cart';
const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 49;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedVariant = null, customization = null) => {
    setCartItems((prevItems) => {
      const variantName = selectedVariant || (product.sizes ? product.sizes[0] : 'Standard');
      const cartItemId = `${product.id}_${variantName}_${customization?.text || ''}_${customization?.template || ''}`;

      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: customization?.previewUrl || (product.images ? product.images[0] : ''),
            category: product.category,
            variant: variantName,
            customization: customization || null,
            quantity: Math.max(1, quantity),
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setOrderNotes('');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        deliveryFee,
        total,
        orderNotes,
        setOrderNotes,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
