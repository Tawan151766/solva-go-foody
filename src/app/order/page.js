
"use client";

"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { createOrder, fetchOrderById } from "@/lib/apiService";
import { useState, useEffect } from 'react';
import OrderSuccessDetail from '@/components/Order/OrderSuccessDetail';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function OrderPage() {
  const router = useRouter();
  const { cart, clearCart, isHydrated } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // ใช้ร้านเดียวใน cart เท่านั้น (cart มีได้แค่ร้านเดียว)
  const storeId = cart[0]?.storeId || null;
  const storeName = cart[0]?.storeName || '';
  const items = cart.map(item => ({
    menuId: item.menuId,
    quantity: item.quantity,
    price: item.price
  }));
  const selectedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateForm = () => {
    if (!customerName.trim()) return false;
    if (!phone.trim()) return false;
    if (!address.trim()) return false;
    // phone: only digits, length 10
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) return false;
    return true;
  };

  const handleCreateOrder = async () => {
    if (!storeId || items.length === 0) return;
    if (!validateForm()) {
      setErrorMsg('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
      return;
    }
    setIsOrderCreating(true);
    setErrorMsg('');
    const payload = {
      storeId,
      deliveryAddress: address,
      paymentMethod: null,
      slipUrl: '',
      items,
      customerName: customerName.trim(),
      phone: phone.trim(),
      note: note.trim()
    };
    try {
      const data = await createOrder(payload);
      if (data?.data?.order?.id) {
        // แปลง id เป็น base64 ก่อนส่งไปแสดงผลหรือค้นหา
        const orderId = data.data.order.id;
        const hashId = typeof window !== 'undefined' ? window.btoa(orderId) : orderId;
        // fetch order by id (uuid) (ยังใช้ id จริงในการ fetch)
        try {
          await fetchOrderById(orderId);
          // สามารถนำ orderData ไปใช้แสดงผลหรือเก็บใน state เพิ่มเติมได้
        } catch (e) {
          // กรณีดึง order ไม่สำเร็จ
        }
        setOrderId(hashId); // เก็บ hashId แทน id จริง
        setOrderSuccess(true);
        clearCart();
      } else {
        setErrorMsg('ไม่สามารถสร้างออเดอร์ได้');
      }
    } catch (err) {
      setErrorMsg('เกิดข้อผิดพลาดในการสร้างออเดอร์');
    }
    setIsOrderCreating(false);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่มีสินค้าในตะกร้า</h1>
          <p className="text-gray-600 mb-6">กรุณาเพิ่มสินค้าลงตะกร้าก่อนทำการสั่งซื้อ</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-semibold"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <OrderSuccessDetail
        open={orderSuccess}
        orderId={orderId ? (typeof window !== 'undefined' ? window.atob(orderId) : orderId) : ''}
        onClose={() => setOrderSuccess(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{storeName ? `ร้าน: ${storeName}` : 'ไม่มีร้านอาหาร'}</h2>
          <ul className="mb-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between py-1">
                <span>เมนู {item.menuId}</span>
                <span>x{item.quantity}</span>
                <span>{item.price} บาท</span>
              </li>
            ))}
          </ul>
          <div className="font-bold mb-4">รวม {selectedTotal} บาท</div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อผู้รับ *</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="กรอกชื่อผู้รับอาหาร"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์ *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="0812345678"
              maxLength="12"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">รูปแบบ: 0812345678</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">ที่อยู่จัดส่ง *</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="กรอกที่อยู่จัดส่งแบบละเอียด"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">หมายเหตุ (ไม่บังคับ)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="หมายเหตุสำหรับร้านอาหารหรือผู้ส่ง"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
            />
          </div>

          {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}

          <button
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-semibold mt-2"
            onClick={handleCreateOrder}
            disabled={isOrderCreating || !validateForm()}
          >
            {isOrderCreating ? 'กำลังสั่งซื้อ...' : 'ยืนยันสั่งซื้อ'}
          </button>
        </div>
      </div>
    </div>
  );
}