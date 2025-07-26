"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import OrderSummary from '@/components/Order/OrderSummary';
import DeliveryInfo from '@/components/Order/DeliveryInfo';
import PaymentOptions from '@/components/Order/PaymentOptions';
import PaymentUpload from '@/components/Order/PaymentUpload';
import PaymentSuccess from '@/components/Order/PaymentSuccess';

/**
 * หน้าสำหรับจัดการคำสั่งซื้อและการชำระเงิน
 * มีขั้นตอน: สรุปคำสั่งซื้อ → เลือกการชำระเงิน → อัปโหลดหลักฐาน → แสดงผลสำเร็จ
 */
export default function OrderPage() {
  const router = useRouter();
  const { cart, clearCart, isHydrated } = useCart();
  
  // States สำหรับจัดการขั้นตอนต่างๆ
  const [currentStep, setCurrentStep] = useState('summary'); // summary, delivery, payment, upload, success
  const [selectedStores, setSelectedStores] = useState(new Set());
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  // จัดกลุ่มสินค้าตามร้าน - ใช้ useMemo เพื่อป้องกัน re-calculation ที่ไม่จำเป็น
  const grouped = useMemo(() => {
    return cart.reduce((acc, item) => {
      const storeId = item.storeId;
      if (!acc[storeId]) {
        acc[storeId] = {
          storeName: item.storeName,
          items: [],
          total: 0
        };
      }
      acc[storeId].items.push(item);
      acc[storeId].total += item.price * item.quantity;
      return acc;
    }, {});
  }, [cart]);

  // คำนวณยอดรวมของร้านที่เลือก
  const selectedTotal = useMemo(() => {
    return Array.from(selectedStores).reduce((total, storeId) => {
      return total + (grouped[storeId]?.total || 0);
    }, 0);
  }, [selectedStores, grouped]);

  // เลือกร้านทั้งหมดเมื่อมีการเปลี่ยนแปลงของ cart เท่านั้น
  useEffect(() => {
    console.log('Cart data:', cart);
    console.log('Grouped data:', grouped);
    const allStoreIds = Object.keys(grouped);
    
    // เช็คว่า selectedStores ปัจจุบันต่างจาก allStoreIds หรือไม่
    const currentStoreIds = Array.from(selectedStores);
    const hasChanged = allStoreIds.length !== currentStoreIds.length || 
                      !allStoreIds.every(id => selectedStores.has(id));
    
    if (hasChanged && allStoreIds.length > 0) {
      setSelectedStores(new Set(allStoreIds));
    }
  }, [cart]); // เอา grouped ออกจาก dependencies

  // ถ้าไม่มีสินค้าในตะกร้า ให้กลับไปหน้าหลัก (หลังจากโหลดเสร็จ)
  useEffect(() => {
    if (!isHydrated) return; // รอให้โหลดข้อมูลก่อน
    
    if (cart.length === 0) {
      console.log('No items in cart, redirecting to home');
      router.push('/');
    }
  }, [cart, router, isHydrated]);

  // จัดการการเลือกร้าน
  const handleStoreSelection = (storeId, isSelected) => {
    const newSelected = new Set(selectedStores);
    if (isSelected) {
      newSelected.add(storeId);
    } else {
      newSelected.delete(storeId);
    }
    setSelectedStores(newSelected);
  };

  // เลือกร้านทั้งหมด
  const handleSelectAll = () => {
    const allStoreIds = Object.keys(grouped);
    const allSelected = selectedStores.size === allStoreIds.length;
    
    if (allSelected) {
      setSelectedStores(new Set());
    } else {
      setSelectedStores(new Set(allStoreIds));
    }
  };

  // ไปขั้นตอนกรอกข้อมูลจัดส่ง
  const handleProceedToDelivery = () => {
    if (selectedStores.size === 0) {
      alert('กรุณาเลือกร้านอาหารอย่างน้อย 1 ร้าน');
      return;
    }
    setCurrentStep('delivery');
  };

  // ไปขั้นตอนเลือกการชำระเงิน
  const handleProceedToPayment = (deliveryData) => {
    setDeliveryInfo(deliveryData);
    setCurrentStep('payment');
  };

  // ไปขั้นตอนอัปโหลดหลักฐาน
  const handlePaymentMethodSelected = (method) => {
    setPaymentMethod(method);
    setCurrentStep('upload');
  };

  // เสร็จสิ้นการชำระเงิน
  const handlePaymentComplete = (trackingNum) => {
    setTrackingNumber(trackingNum);
    setCurrentStep('success');
    
    // ลบสินค้าที่สั่งซื้อแล้วออกจากตะกร้า
    const selectedItems = cart.filter(item => selectedStores.has(item.storeId));
    selectedItems.forEach(item => {
      // ในการใช้งานจริงอาจต้องลบทีละรายการ
    });
  };

  // กลับหน้าหลัก
  const handleBackToHome = () => {
    clearCart();
    router.push('/');
  };

  // กลับขั้นตอนก่อนหน้า
  const handleBack = () => {
    switch (currentStep) {
      case 'payment':
        setCurrentStep('summary');
        break;
      case 'upload':
        setCurrentStep('payment');
        break;
      default:
        break;
    }
  };

  // แสดง loading ขณะรอข้อมูลจาก localStorage
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'summary', label: 'สรุปคำสั่งซื้อ', step: 1 },
              { key: 'payment', label: 'เลือกการชำระเงิน', step: 2 },
              { key: 'upload', label: 'อัปโหลดหลักฐาน', step: 3 },
              { key: 'success', label: 'เสร็จสิ้น', step: 4 }
            ].map((item, index) => (
              <div key={item.key} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep === item.key 
                    ? 'bg-[#2563eb] text-white' 
                    : ['summary', 'payment', 'upload'].indexOf(currentStep) > ['summary', 'payment', 'upload'].indexOf(item.key)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === item.key ? 'text-[#2563eb]' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    ['summary', 'payment', 'upload'].indexOf(currentStep) > index
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content based on current step */}

        {currentStep === 'summary' && (
          <OrderSummary
            grouped={grouped}
            selectedStores={selectedStores}
            onStoreSelection={handleStoreSelection}
            onSelectAll={handleSelectAll}
            onProceedToDelivery={handleProceedToDelivery}
            selectedTotal={selectedTotal}
          />
        )}

        {currentStep === 'delivery' && (
          <DeliveryInfo
            onBack={() => setCurrentStep('summary')}
            onContinue={handleProceedToPayment}
            selectedTotal={selectedTotal}
            selectedStores={selectedStores}
            grouped={grouped}
          />
        )}

        {currentStep === 'payment' && (
          <PaymentOptions
            selectedTotal={selectedTotal}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onPayment={handlePaymentMethodSelected}
            onBack={handleBack}
            selectedStores={selectedStores}
            grouped={grouped}
          />
        )}

        {currentStep === 'upload' && (
          <PaymentUpload
            paymentMethod={paymentMethod}
            selectedTotal={selectedTotal}
            onBack={handleBack}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {currentStep === 'success' && (
          <PaymentSuccess
            trackingNumber={trackingNumber}
            selectedTotal={selectedTotal}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </div>
  );
}