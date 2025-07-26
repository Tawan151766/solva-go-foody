
"use client";
import { createContext, useContext, useState, useEffect } from "react";

// สร้าง Context สำหรับจัดการตะกร้าสินค้า
const CartContext = createContext();

/**
 * Provider สำหรับจัดการสถานะตะกร้าสินค้า
 * ใช้ครอบ components ที่ต้องการเข้าถึงข้อมูลตะกร้า
 */
export function CartProvider({ children }) {
  // รายการสินค้าในตะกร้า
  const [cartItems, setCartItems] = useState([]);
  
  // สถานะว่าแอปโหลดเสร็จแล้วหรือยัง (ป้องกัน hydration error)
  const [isAppReady, setIsAppReady] = useState(false);

  /**
   * เมื่อ component โหลดเสร็จ (client-side)
   * จะตั้งสถานะว่าแอปพร้อมใช้งาน
   */
  useEffect(() => {
    setIsAppReady(true);
    
    // ในอนาคตสามารถเพิ่มการบันทึกข้อมูลใน localStorage ได้ที่นี่
    // const savedCartItems = localStorage.getItem('cartItems');
    // if (savedCartItems) {
    //   setCartItems(JSON.parse(savedCartItems));
    // }
  }, []);

  /**
   * เพิ่มสินค้าลงตะกร้า
   * @param {Object} newItem - ข้อมูลสินค้าที่จะเพิ่ม
   */
  const addItemToCart = (newItem) => {
    // สร้าง ID ที่ไม่ซ้ำกันสำหรับสินค้าแต่ละรายการ
    const itemWithUniqueId = { 
      ...newItem, 
      id: Date.now() + Math.random() 
    };
    
    setCartItems((currentItems) => [...currentItems, itemWithUniqueId]);
  };

  /**
   * ลบสินค้าออกจากตะกร้า
   * @param {string|number} itemId - ID ของสินค้าที่จะลบ
   */
  const removeItemFromCart = (itemId) => {
    setCartItems((currentItems) => 
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  /**
   * ล้างสินค้าทั้งหมดในตะกร้า
   */
  const clearAllItems = () => {
    setCartItems([]);
  };

  // ข้อมูลที่จะส่งให้ components ที่ใช้ Context นี้
  const cartContextValue = {
    cart: cartItems,              // รายการสินค้าในตะกร้า
    addToCart: addItemToCart,     // ฟังก์ชันเพิ่มสินค้า
    removeFromCart: removeItemFromCart, // ฟังก์ชันลบสินค้า
    clearCart: clearAllItems,     // ฟังก์ชันล้างตะกร้า
    isHydrated: isAppReady        // สถานะว่าแอปพร้อมใช้งาน
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
    throw new Error('useCart ต้องใช้ภายใน CartProvider เท่านั้น');
  }
  
  return cartContext;
}
