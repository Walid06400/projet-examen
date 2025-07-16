// resources/js/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (formation) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.slug === formation.slug);
      if (existingItem) {
        triggerCartPulse();
        return prev;
      }
      
      const newCart = [...prev, { ...formation, quantity: 1 }];
      setLastAddedItem(formation);
      showAddNotification();
      triggerCartPulse();
      
      return newCart;
    });
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setCart([]);

  const triggerCartPulse = () => {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
      cartBadge.classList.add('animate-pulse-purple');
      setTimeout(() => {
        cartBadge.classList.remove('animate-pulse-purple');
      }, 1000);
    }
  };

  const showAddNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart,
        showNotification,
        lastAddedItem
      }}
    >
      {children}
      
      <AnimatePresence>
        {showNotification && lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-2xl max-w-sm"
            style={{
              boxShadow: "0 10px 40px rgba(168, 85, 247, 0.3)"
            }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="bg-white/20 p-2 rounded-full"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="font-semibold">Ajouté au panier !</p>
                <p className="text-sm opacity-90">{lastAddedItem.title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}
