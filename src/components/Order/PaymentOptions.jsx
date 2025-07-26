import { useState } from 'react';
import { HiCash, HiQrcode, HiCreditCard, HiDeviceMobile, HiStar, HiCheck } from "react-icons/hi";

import { useEffect } from 'react';

export default function PaymentOptions({ 
  selectedTotal, 
  paymentMethod, 
  onPaymentMethodChange, 
  onPayment, 
  onBack,
  selectedStores,
  grouped 
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-select 'bank' method on mount
  useEffect(() => {
    // set เฉพาะตอน mount เท่านั้น
    onPaymentMethodChange('bank');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentMethods = [
    {
      id: 'bank',
      name: 'โอนเงินผ่านบัญชีธนาคาร',
      description: 'โอนเงินเข้าบัญชี test-bank 000000000 และแนบสลิป',
      icon: <HiCash className="w-6 h-6" />,
      color: 'blue'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsProcessing(false);
    onPayment(paymentMethod);
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      green: isSelected 
        ? 'border-green-500 bg-green-50 text-green-700' 
        : 'border-gray-200 hover:border-green-300 text-gray-700',
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 text-blue-700' 
        : 'border-gray-200 hover:border-blue-300 text-gray-700',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 text-purple-700' 
        : 'border-gray-200 hover:border-purple-300 text-gray-700',
      indigo: isSelected 
        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
        : 'border-gray-200 hover:border-indigo-300 text-gray-700'
    };
    return colors[color];
  };

  // ✅ แก้ไข className ที่เปลี่ยนตาม state เพื่อหลีกเลี่ยง hydration error
  const getIconBackgroundClass = (color, isSelected) => {
    const baseClass = 'w-12 h-12 rounded-full flex items-center justify-center mr-4';
    const backgroundColors = {
      green: isSelected ? 'bg-green-100' : 'bg-gray-100',
      blue: isSelected ? 'bg-blue-100' : 'bg-gray-100',
      purple: isSelected ? 'bg-purple-100' : 'bg-gray-100',
      indigo: isSelected ? 'bg-indigo-100' : 'bg-gray-100'
    };
    return `${baseClass} ${backgroundColors[color] || 'bg-gray-100'}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">สรุปคำสั่งซื้อ</h3>
        <div className="space-y-3">
          {Array.from(selectedStores).map(storeId => {
            const storeData = grouped[storeId];
            return (
              <div key={storeId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center">
                    <HiStar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{storeData.storeName}</p>
                    <p className="text-sm text-gray-500">{storeData.items.length} รายการ</p>
                  </div>
                </div>
                <p className="font-bold text-[#2563eb]">฿{storeData.total}</p>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">ยอดรวมทั้งหมด</p>
            <p className="text-2xl font-bold text-[#2563eb]">฿{selectedTotal}</p>
          </div>
        </div>
      </div>

      {/* Payment Method - Only Bank Transfer */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">โอนเงินผ่านบัญชีธนาคาร</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className={getIconBackgroundClass('blue', true)}>
            <HiCash className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">test-bank</div>
            <div className="text-sm text-gray-700">เลขที่บัญชี <span className="font-mono">000000000</span></div>
            <div className="text-sm text-gray-500">โปรดโอนเงินและแนบสลิปในขั้นตอนถัดไป</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
              !paymentMethod || isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                กำลังดำเนินการ...
              </div>
            ) : (
              `ชำระเงิน ฿${selectedTotal}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}