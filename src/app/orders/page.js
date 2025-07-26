"use client";
import React, { useState, useEffect } from "react";
import OrderSummary from "@/components/Order/OrderSummary";
import PaymentOptions from "@/components/Order/PaymentOptions";
import ClientOnly from "@/components/ClientOnly";
import { useClientNavigation } from "@/hooks/useClientNavigation";

export default function OrdersPage() {
  const [order, setOrder] = useState([]);
  const [paymentStep, setPaymentStep] = useState("review"); // 'review', 'payment', 'confirmed'
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedStores, setSelectedStores] = useState(new Set());
  const { navigateTo } = useClientNavigation();

  useEffect(() => {
    const saved = localStorage.getItem("foody_order");
    if (saved) {
      try {
        const orderData = JSON.parse(saved);
        setOrder(orderData);
        localStorage.removeItem("foody_order");
      } catch (error) {
        console.error("Error parsing order data:", error);
        localStorage.removeItem("foody_order");
      }
    }
  }, []);

  // Group order items by store
  const grouped = order.reduce((acc, item) => {
    const storeId = item.storeId || item.categoryId;
    const storeName = item.storeName || "ร้านอาหาร";
    if (!acc[storeId]) {
      acc[storeId] = {
        storeName,
        items: [],
        total: 0,
      };
    }
    acc[storeId].items.push(item);
    acc[storeId].total += item.price * item.quantity;
    return acc;
  }, {});

  const handleStoreSelection = (storeId) => {
    const newSelected = new Set(selectedStores);
    if (newSelected.has(storeId)) {
      newSelected.delete(storeId);
    } else {
      newSelected.add(storeId);
    }
    setSelectedStores(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedStores.size === Object.keys(grouped).length) {
      setSelectedStores(new Set());
    } else {
      setSelectedStores(new Set(Object.keys(grouped)));
    }
  };

  const getSelectedTotal = () => {
    return Object.entries(grouped)
      .filter(([storeId]) => selectedStores.has(storeId))
      .reduce((total, [, storeData]) => total + storeData.total, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedStores.size === 0) {
      alert("กรุณาเลือกร้านที่ต้องการชำระเงิน");
      return;
    }
    setPaymentStep("payment");
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("กรุณาเลือกวิธีการชำระเงิน");
      return;
    }
    setPaymentStep("confirmed");
  };

  const handleBackToHome = () => {
    navigateTo("/");
  };



  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">กำลังโหลด...</h1>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {paymentStep === "review" && "ยืนยันคำสั่งซื้อ"}
              {paymentStep === "payment" && "เลือกวิธีการชำระเงิน"}
              {paymentStep === "confirmed" && "ชำระเงินสำเร็จ"}
            </h1>
            <p className="text-gray-600">
              {paymentStep === "review" &&
                "ตรวจสอบรายการและเลือกร้านที่ต้องการสั่งซื้อ"}
              {paymentStep === "payment" &&
                "เลือกวิธีการชำระเงินที่สะดวกสำหรับคุณ"}
              {paymentStep === "confirmed" &&
                "ขอบคุณสำหรับการสั่งซื้อ รายการของคุณกำลังเตรียม"}
            </p>
          </div>

          {paymentStep === "confirmed" ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ชำระเงินสำเร็จ!
              </h2>
              <p className="text-gray-600 mb-6">
                คำสั่งซื้อของคุณได้รับการยืนยันแล้ว
                <br />
                ร้านค้าจะเริ่มเตรียมอาหารในไม่ช้า
              </p>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">ยอดชำระทั้งหมด</p>
                <p className="text-2xl font-bold text-[#2563eb]">
                  ฿{getSelectedTotal()}
                </p>
              </div>
              <button
                onClick={handleBackToHome}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                กลับหน้าหลัก
              </button>
            </div>
          ) : order.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 16h9.68a3 3 0 0 0 2.92-2.36l1.54-7A2 2 0 0 0 19.36 4H6.21l-.34-1.63A2 2 0 0 0 4 0H2a1 1 0 1 0 0 2h2l3.6 17.59A2 2 0 0 0 11.5 22h7a1 1 0 1 0 0-2h-7l-.16-.84ZM6.21 6h13.15l-1.54 7H7.16L6.21 6Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ไม่มีรายการในออเดอร์
              </h3>
              <p className="text-gray-500 mb-6">
                เพิ่มรายการอาหารเพื่อเริ่มสั่งซื้อ
              </p>
              <button
                onClick={handleBackToHome}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                เลือกอาหาร
              </button>
            </div>
          ) : (
            <>
              {paymentStep === "review" && (
                <OrderSummary
                  grouped={grouped}
                  selectedStores={selectedStores}
                  onStoreSelection={handleStoreSelection}
                  onSelectAll={handleSelectAll}
                  onProceedToPayment={handleProceedToPayment}
                  selectedTotal={getSelectedTotal()}
                />
              )}

              {paymentStep === "payment" && (
                <PaymentOptions
                  selectedTotal={getSelectedTotal()}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onPayment={handlePayment}
                  onBack={() => setPaymentStep("review")}
                  selectedStores={selectedStores}
                  grouped={grouped}
                />
              )}
            </>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
