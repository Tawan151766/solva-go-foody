import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { HiCheck, HiClock, HiEye, HiClipboardCopy } from 'react-icons/hi';

export default function PaymentSuccess({ 
  trackingNumber, 
  selectedTotal, 
  onBackToHome 
}) {
  const { clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState('checking'); // checking, approved, completed
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // จำลองการตรวจสอบใบเสร็จ
    const timer1 = setTimeout(() => {
      setPaymentStatus('approved');
    }, 3000);

    const timer2 = setTimeout(() => {
      setPaymentStatus('completed');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // ล้างตะกร้าทันทีที่ paymentStatus เป็น completed
  useEffect(() => {
    if (paymentStatus === 'completed') {
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  const copyTrackingNumber = async () => {
    try {
      await navigator.clipboard.writeText(trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusInfo = () => {
    switch (paymentStatus) {
      case 'checking':
        return {
          icon: <HiClock className="w-8 h-8 text-yellow-500 animate-pulse" />,
          title: 'กำลังตรวจสอบการชำระเงิน',
          description: 'ระบบกำลังตรวจสอบหลักฐานการชำระเงินของคุณ',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800'
        };
      case 'approved':
        return {
          icon: <HiCheck className="w-8 h-8 text-green-500" />,
          title: 'การชำระเงินได้รับการอนุมัติ',
          description: 'หลักฐานการชำระเงินถูกต้อง กำลังเตรียมคำสั่งซื้อ',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      case 'completed':
        return {
          icon: <HiCheck className="w-8 h-8 text-blue-500" />,
          title: 'คำสั่งซื้อเสร็จสมบูรณ์',
          description: 'คำสั่งซื้อของคุณได้รับการยืนยันแล้ว',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
      default:
        return {};
    }
  };

  const statusInfo = getStatusInfo();

  const orderSteps = [
    {
      id: 1,
      title: 'ได้รับคำสั่งซื้อ',
      description: 'ระบบได้รับคำสั่งซื้อของคุณแล้ว',
      completed: paymentStatus !== 'checking',
      time: '14:30'
    },
    {
      id: 2,
      title: 'ตรวจสอบการชำระเงิน',
      description: 'กำลังตรวจสอบหลักฐานการชำระเงิน',
      completed: paymentStatus === 'approved' || paymentStatus === 'completed',
      time: '14:33'
    },
    {
      id: 3,
      title: 'เตรียมอาหาร',
      description: 'ร้านอาหารกำลังเตรียมอาหารของคุณ',
      completed: paymentStatus === 'completed',
      time: paymentStatus === 'completed' ? '14:36' : '-'
    },
    {
      id: 4,
      title: 'พร้อมส่ง',
      description: 'อาหารพร้อมสำหรับการจัดส่ง',
      completed: false,
      time: '-'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Status Card */}
      <div className={`${statusInfo.bgColor} rounded-2xl shadow-lg p-8 border border-gray-100 text-center`}>
        <div className="flex justify-center mb-4">
          {statusInfo.icon}
        </div>
        <h2 className={`text-2xl font-bold ${statusInfo.textColor} mb-2`}>
          {statusInfo.title}
        </h2>
        <p className={`${statusInfo.textColor} opacity-80`}>
          {statusInfo.description}
        </p>
      </div>

      {/* Tracking Number */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">เลขติดตามคำสั่งซื้อ</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 mb-1">หมายเลขติดตาม</p>
            <p className="text-xl font-mono font-bold text-[#2563eb]">{trackingNumber}</p>
          </div>
          <button
            onClick={copyTrackingNumber}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg transition-colors"
          >
            <HiClipboardCopy className="w-4 h-4" />
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
          </button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>วิธีติดตามคำสั่งซื้อ:</strong><br/>
            1. เก็บเลขติดตามนี้ไว้<br/>
            2. ใช้เลขติดตามเพื่อตรวจสอบสถานะคำสั่งซื้อ<br/>
            3. ติดต่อเราได้ที่ 02-123-4567
          </p>
        </div>
      </div>

      {/* Order Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">สถานะคำสั่งซื้อ</h3>
        <div className="space-y-4">
          {orderSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.completed ? (
                  <HiCheck className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <span className={`text-sm ${
                    step.completed ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.time}
                  </span>
                </div>
                <p className={`text-sm ${
                  step.completed ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">สรุปคำสั่งซื้อ</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">ยอดรวมสินค้า</span>
            <span className="font-semibold">฿{selectedTotal}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">ค่าจัดส่ง</span>
            <span className="font-semibold text-green-600">ฟรี</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-bold text-gray-900">ยอดรวมทั้งหมด</span>
            <span className="text-xl font-bold text-[#2563eb]">฿{selectedTotal}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={onBackToHome}
            className="flex-1 py-3 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}