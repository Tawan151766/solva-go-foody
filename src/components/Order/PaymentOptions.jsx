import { useState } from 'react';

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

  const paymentMethods = [
    {
      id: 'cash',
      name: 'เงินสด',
      description: 'ชำระเงินสดเมื่อได้รับอาหาร',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'promptpay',
      name: 'พร้อมเพย์',
      description: 'สแกน QR Code เพื่อชำระเงิน',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v14h14V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'credit',
      name: 'บัตรเครดิต/เดบิต',
      description: 'ชำระด้วยบัตรเครดิตหรือเดบิต',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
      ),
      color: 'purple'
    },
    {
      id: 'wallet',
      name: 'กระเป๋าเงินดิจิทัล',
      description: 'TrueMoney, ShopeePay, LINE Pay',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      color: 'indigo'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onPayment();
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
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
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

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">เลือกวิธีการชำระเงิน</h3>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                getColorClasses(method.color, paymentMethod === method.id)
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => onPaymentMethodChange(e.target.value)}
                className="sr-only"
              />
              <div className={getIconBackgroundClass(method.color, paymentMethod === method.id)}>
                {method.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{method.name}</h4>
                <p className="text-sm opacity-75">{method.description}</p>
              </div>
              {paymentMethod === method.id && (
                <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </label>
          ))}
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