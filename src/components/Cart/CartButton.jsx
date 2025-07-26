
"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartList from "@/components/Cart/CartList";
import CartModal from "@/components/Cart/CartModal";
import { useClientNavigation } from "@/hooks/useClientNavigation";

/**
 * ปุ่มตะกร้าสินค้าที่ลอยอยู่มุมล่างขวา
 * แสดงจำนวนสินค้าและเปิด Modal ตะกร้าเมื่อคลิก
 */
export default function CartButton() {
  // ดึงข้อมูลและฟังก์ชันจาก Cart Context
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  
  // สถานะการเปิด/ปิด Modal ตะกร้า
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hook สำหรับการนำทางที่ปลอดภัย
  const { navigateTo, isClient } = useClientNavigation();

  /**
   * จัดกลุ่มสินค้าในตะกร้าตามร้าน
   * เพื่อแสดงผลแยกตามร้านในตะกร้า
   */
  const groupItemsByStore = () => {
    return cart.reduce((groupedItems, item) => {
      // ใช้ storeId หรือ categoryId เป็น key สำหรับจัดกลุ่ม
      const storeKey = item.storeId || item.categoryId || 'unknown';
      
      if (!groupedItems[storeKey]) {
        groupedItems[storeKey] = [];
      }
      
      groupedItems[storeKey].push(item);
      return groupedItems;
    }, {});
  };

  /**
   * เปลี่ยนจำนวนสินค้าในตะกร้า
   * @param {Object} item - รายการสินค้า
   * @param {number} changeAmount - จำนวนที่จะเปลี่ยน (+1 หรือ -1)
   */
  const handleQuantityChange = (item, changeAmount) => {
    const newQuantity = item.quantity + changeAmount;
    
    // ไม่ให้จำนวนต่ำกว่า 1
    if (newQuantity < 1) return;
    
    // ลบรายการเก่าและเพิ่มรายการใหม่ด้วยจำนวนที่อัปเดต
    removeFromCart(item.id);
    addToCart({ ...item, quantity: newQuantity });
  };

  /**
   * ยืนยันคำสั่งซื้อและไปหน้าชำระเงิน
   */
  const handleOrderConfirmation = () => {
    if (cart.length > 0) {
      // บันทึกข้อมูลตะกร้าใน localStorage เพื่อส่งไปหน้าสั่งซื้อ
      localStorage.setItem("foody_order", JSON.stringify(cart));
      
      // ล้างตะกร้าหลังจากยืนยันคำสั่งซื้อ
      clearCart();
      
      // ไปหน้าสั่งซื้อ
      navigateTo("/orders");
    }
  };

  /**
   * คำนวณยอดรวมทั้งหมดในตะกร้า
   */
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // ไม่แสดงปุ่มจนกว่าจะโหลดเสร็จฝั่ง client
  if (!isClient) {
    return null;
  }

  const groupedItems = groupItemsByStore();

  return (
    <>
      {/* ปุ่มตะกร้าลอยมุมล่างขวา */}
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="fixed z-50 bottom-6 right-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 px-6 py-4 font-bold text-base border-2 border-white"
        aria-label="เปิดตะกร้าสินค้า"
      >
        <div className="relative">
          {/* ไอคอนตะกร้า */}
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 16h9.68a3 3 0 0 0 2.92-2.36l1.54-7A2 2 0 0 0 19.36 4H6.21l-.34-1.63A2 2 0 0 0 4 0H2a1 1 0 1 0 0 2h2l3.6 17.59A2 2 0 0 0 11.5 22h7a1 1 0 1 0 0-2h-7l-.16-.84ZM6.21 6h13.15l-1.54 7H7.16L6.21 6Z"/>
          </svg>
          
          {/* แสดงจำนวนสินค้าในตะกร้า */}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
        <span>ตะกร้า</span>
      </button>

      {/* Modal ตะกร้าสินค้า */}
      <CartModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        {cart.length === 0 ? (
          // แสดงเมื่อตะกร้าว่าง
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 16h9.68a3 3 0 0 0 2.92-2.36l1.54-7A2 2 0 0 0 19.36 4H6.21l-.34-1.63A2 2 0 0 0 4 0H2a1 1 0 1 0 0 2h2l3.6 17.59A2 2 0 0 0 11.5 22h7a1 1 0 1 0 0-2h-7l-.16-.84ZM6.21 6h13.15l-1.54 7H7.16L6.21 6Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">ตะกร้าว่างเปล่า</h3>
            <p className="text-gray-500 text-sm">เพิ่มรายการอาหารเพื่อเริ่มสั่งซื้อ</p>
          </div>
        ) : (
          // แสดงเมื่อมีสินค้าในตะกร้า
          <>
            {/* รายการสินค้าในตะกร้า */}
            <CartList 
              grouped={groupedItems} 
              handleQty={handleQuantityChange} 
              removeFromCart={removeFromCart} 
            />
            
            {/* ส่วนสรุปและปุ่มดำเนินการ */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* แสดงยอดรวม */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">ยอดรวมทั้งหมด</span>
                <span className="text-2xl font-bold text-[#2563eb]">
                  ฿{calculateTotalPrice()}
                </span>
              </div>
              
              {/* ปุ่มดำเนินการ */}
              <div className="space-y-3">
                {/* ปุ่มยืนยันคำสั่งซื้อ */}
                <button
                  onClick={handleOrderConfirmation}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  ยืนยันคำสั่งซื้อ
                </button>
                
                {/* ปุ่มล้างตะกร้า */}
                <button
                  onClick={clearCart}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                  ล้างตะกร้า
                </button>
              </div>
            </div>
          </>
        )}
      </CartModal>
    </>
  );
}
