"use client";
import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();


export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // handle hydration error
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);

    // get data from localStorage
    try {
      const savedCartItems = localStorage.getItem("foody_cart");
      if (savedCartItems) {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(parsedItems);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  /**
   * save to localStorage
   */
  useEffect(() => {
    if (isAppReady) {
      try {
        localStorage.setItem("foody_cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isAppReady]);

  /**
   * addItemToCart
   * @param {Object} newItem 
   */
  const addItemToCart = (newItem) => {
    // ตรวจสอบว่ามีข้อมูลเมนูจริงครบถ้วน
    if (!newItem.menuId || !newItem.name || !newItem.price || !newItem.storeId) {
      console.warn('addItemToCart: ข้อมูลเมนูไม่ครบ ไม่เพิ่มเข้าตะกร้า', newItem);
      return;
    }
    setCartItems((currentItems) => {
      // ลบเมนูของร้านอื่นออก เหลือเฉพาะร้านที่เลือก
      const filtered = currentItems.filter(item => item.storeId === newItem.storeId);
      const itemWithUniqueId = {
        ...newItem,
        id: newItem.menuId,
        uniqueCartId: Date.now() + Math.floor(Math.random() * 10000),
      };
      return [...filtered, itemWithUniqueId];
    });
  };

  /**
   * removeItemFromCart
   * @param {string|number} uniqueCartId - ใช้ uniqueCartId ใน cart
   */
  const removeItemFromCart = (uniqueCartId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.uniqueCartId !== uniqueCartId)
    );
  };

  /**
   * clearAllItems
   */
  const clearAllItems = () => {
    setCartItems([]);
  };

  // for components that use this Context
  const cartContextValue = {
    cart: cartItems, // products in the cart
    addToCart: addItemToCart, // a function to add a product
    removeFromCart: removeItemFromCart, // a function to remove a product
    clearCart: clearAllItems, // a function to clear all products
    isHydrated: isAppReady, // state to check if the app is ready
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook สำหรับใช้งาน Cart Context
 * ต้องใช้ภายใน CartProvider เท่านั้น
 * @returns {Object} ข้อมูลและฟังก์ชันสำหรับจัดการตะกร้า
 */
export function useCart() {
  const cartContext = useContext(CartContext);

  // ตรวจสอบว่าใช้ Hook นี้ภายใน Provider หรือไม่
  if (!cartContext) {
    throw new Error("useCart ต้องใช้ภายใน CartProvider เท่านั้น");
  }

  return cartContext;
}
