"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { HiOutlineSearch, HiX } from "react-icons/hi";

// Component สำหรับ Modal ค้นหาออเดอร์
export function SearchOrderModal({ open, onClose }) {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      // decode base64 id before req api
      let realId = orderId.trim();
      try {
        realId = typeof window !== 'undefined' ? window.atob(orderId.trim()) : orderId.trim();
      } catch (e) {}
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${realId}`);
      const data = await res.json();
      if (data?.data?.order) {
        setOrder(data.data.order);
      } else {
        setError("ไม่พบออเดอร์นี้");
      }
    } catch (e) {
      setError("เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>
          <HiX className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold mb-4">ค้นหาออเดอร์</h2>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          placeholder="กรอก Order ID (Base64)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className="bg-[#2563eb] text-white px-4 py-2 rounded w-full mb-2"
          onClick={handleSearch}
          disabled={loading || !orderId.trim()}
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {order && (
          <div className="bg-gray-50 rounded p-3 mt-2">
            {/* <div className="font-semibold">Order ID: {typeof window !== 'undefined' ? window.btoa(order.id) : order.id}</div> */}
            <div>สถานะ: {order.status}</div>
            <div>ชื่อผู้รับ: {order.customerName}</div>
            <div>เบอร์: {order.phone}</div>
            <div>ที่อยู่: {order.deliveryAddress}</div>
            <div>ยอดรวม: {order.totalPrice} บาท</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component  Floating Button visible Modal
export default function SearchOrderFloatingButton() {
  const { openModal, setOpenModal } = useModal();

  return (
    <>
      <button
        className="fixed z-40 bottom-28 right-6 md:bottom-32 md:right-10 bg-white border border-[#2563eb] shadow-lg rounded-full p-3 hover:bg-[#f4f0f0] focus:outline-none"
        style={{ marginBottom: 8 }}
        onClick={() => setOpenModal(openModal === "searchOrder" ? null : "searchOrder")}
        aria-label="ค้นหาออเดอร์"
      >
        <HiOutlineSearch className="w-6 h-6 text-[#2563eb]" />
      </button>
      <SearchOrderModal open={openModal === "searchOrder"} onClose={() => setOpenModal(null)} />
    </>
  );
}
