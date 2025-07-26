"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

/**
 * Component แสดงรายการเมนูอาหารของร้าน
 * รองรับตัวเลือกที่มาจากข้อมูลเมนูแต่ละรายการ
 */
export default function MenuList({ menuCategories, menus, store }) {
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedMeat, setSelectedMeat] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  /**
   * เปิด Modal สำหรับเลือกตัวเลือกเมนู
   * @param {Object} menu - ข้อมูลเมนูที่เลือก
   */
  const openModal = (menu) => {
    setModalMenu(menu);
    
    // ตั้งค่าเริ่มต้นตามตัวเลือกที่มีในเมนู
    setSelectedLevel(menu.levelOptions?.[0]?.value || "");
    setSelectedMeat(menu.meatOptions?.[0]?.value || "");
    setQuantity(1);
    setNote("");
    setModalOpen(true);
  };

  /**
   * คำนวณราคารวมตามตัวเลือกที่เลือก
   */
  const calculateTotalPrice = () => {
    if (!modalMenu) return 0;
    
    let totalPrice = modalMenu.price;
    
    // เพิ่มราคาจากตัวเลือกระดับ
    if (selectedLevel && modalMenu.levelOptions) {
      const levelOption = modalMenu.levelOptions.find(opt => opt.value === selectedLevel);
      if (levelOption) {
        totalPrice += levelOption.priceAdd;
      }
    }
    
    // เพิ่มราคาจากตัวเลือกเนื้อสัตว์
    if (selectedMeat && modalMenu.meatOptions) {
      const meatOption = modalMenu.meatOptions.find(opt => opt.value === selectedMeat);
      if (meatOption) {
        totalPrice += meatOption.priceAdd;
      }
    }
    
    return totalPrice * quantity;
  };

  /**
   * เพิ่มเมนูลงตะกร้า
   */
  const handleAdd = () => {
    const finalPrice = calculateTotalPrice() / quantity; // ราคาต่อหน่วย
    
    addToCart({
      ...modalMenu,
      price: finalPrice, // ราคาที่รวมตัวเลือกแล้ว
      selectedLevel,
      selectedMeat,
      quantity,
      note,
      storeId: store?.id,
      storeName: store?.name,
    });
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#2563eb]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z" />
            </svg>
            เมนูร้านอาหาร
          </h2>
        </div>
        <div className="p-6">
          {menuCategories.map((cat) => (
            <div key={cat.id} className="mb-8 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg">
                  {cat.id === 1 ? (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C7.03 2 2.73 5.61 2.07 10.5c-.09.67.41 1.27 1.09 1.27h17.68c.68 0 1.18-.6 1.09-1.27C21.27 5.61 16.97 2 12 2zm0 18c-2.21 0-4.21-1.45-4.83-3.5h9.66C16.21 18.55 14.21 20 12 20z" />
                    </svg>
                  ) : cat.id === 2 ? (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a7 7 0 0 0-7 7c0 3.87 3.13 7 7 7s7-3.13 7-7a7 7 0 0 0-7-7zm0 16c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5s-5-2.24-5-5a5 5 0 0 1 5-5zm0 14c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
              </div>

              <div className="grid gap-3">
                {menus
                  .filter((m) => m.categoryId === cat.id)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-colors duration-200 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">
                            {m.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-[#2563eb]">
                              ฿{m.price}
                            </span>
                          </div>
                        </div>
                        <button
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          onClick={() => openModal(m)}
                        >
                          เพิ่ม
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{modalMenu?.name}</h3>
              <p className="text-blue-100 text-sm">ปรับแต่งรายการของคุณ</p>
            </div>
            <div className="p-6 space-y-4">
              {/* แสดงตัวเลือกระดับ (ธรรมดา/พิเศษ) เฉพาะเมนูที่มี */}
              {modalMenu?.levelOptions && modalMenu.levelOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ตัวเลือก
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white"
                  >
                    {modalMenu.levelOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} {opt.priceAdd > 0 && `(+฿${opt.priceAdd})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* แสดงตัวเลือกเนื้อสัตว์ เฉพาะเมนูที่มี */}
              {modalMenu?.meatOptions && modalMenu.meatOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    เนื้อสัตว์
                  </label>
                  <select
                    value={selectedMeat}
                    onChange={(e) => setSelectedMeat(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white"
                  >
                    {modalMenu.meatOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} {opt.priceAdd > 0 && `(+฿${opt.priceAdd})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  จำนวน
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  หมายเหตุ
                </label>
                <textarea
                  placeholder="เพิ่มหมายเหตุ (ไม่บังคับ)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg"
                >
                  เพิ่มลงตะกร้า ฿{calculateTotalPrice()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
