"use client";
import { useCart } from "@/context/CartContext";
// import { HiOutlineSparkles, HiOutlineCake, HiOutlineUser } from "react-icons/hi";
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
      menuId: modalMenu.id, // อิง id เมนูจริง
      name: modalMenu.name,
      price: finalPrice, // ราคาที่รวมตัวเลือกแล้ว
      selectedLevel,
      selectedMeat,
      quantity,
      note,
      storeId: store?.id,
      storeName: store?.name,
      // ...modalMenu, // ถ้าต้องการ field อื่นเพิ่ม
    });
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            เมนูร้านอาหาร
          </h2>
        </div>
        <div className="p-6">
          {menuCategories.map((cat) => (
            <div key={cat.id} className="mb-8 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                {/* ไอคอนประเภทอาหารถูกลบออก */}
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
