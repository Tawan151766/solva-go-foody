import { useState } from 'react';
import { HiUpload, HiX, HiCheck, HiClock, HiEye } from 'react-icons/hi';

export default function PaymentUpload({ 
  paymentMethod, 
  selectedTotal, 
  onBack, 
  onPaymentComplete 
}) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const paymentMethodNames = {
    'cash': 'เงินสด',
    'promptpay': 'พร้อมเพย์',
    'credit': 'บัตรเครดิต/เดบิต',
    'wallet': 'กระเป๋าเงินดิจิทัล'
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      
      // สร้าง preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleSubmitPayment = async () => {
    if (!uploadedImage) return;
    
    setIsUploading(true);
    
    // จำลองการอัปโหลดและประมวลผล
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsUploading(false);
    
    // สร้างเลขติดตาม
    const trackingNumber = `TRK${Date.now().toString().slice(-8)}`;
    
    onPaymentComplete(trackingNumber);
  };

  const getQRCodeForPayment = () => {
    // QR Code ตัวอย่างสำหรับพร้อมเพย์
    return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021129370016A000000677010111011300668123456780208TESTQR0303THB5406" + selectedTotal + "6304";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Payment Method Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          ชำระเงินด้วย{paymentMethodNames[paymentMethod]}
        </h3>
        
        {paymentMethod === 'promptpay' && (
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-gray-50 rounded-xl">
              <img 
                src={getQRCodeForPayment()} 
                alt="QR Code สำหรับชำระเงิน" 
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              สแกน QR Code เพื่อชำระเงิน ฿{selectedTotal}
            </p>
          </div>
        )}

        {paymentMethod === 'credit' && (
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">ข้อมูลการโอนเงิน</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>ธนาคาร:</strong> กสิกรไทย</p>
              <p><strong>เลขที่บัญชี:</strong> 123-4-56789-0</p>
              <p><strong>ชื่อบัญชี:</strong> บริษัท โซลวา จำกัด</p>
              <p><strong>จำนวนเงิน:</strong> ฿{selectedTotal}</p>
            </div>
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div className="bg-purple-50 p-4 rounded-xl mb-6">
            <h4 className="font-semibold text-purple-900 mb-2">กระเป๋าเงินดิจิทัล</h4>
            <p className="text-sm text-purple-800">
              โอนเงินผ่าน TrueMoney, ShopeePay หรือ LINE Pay<br/>
              หมายเลข: 081-234-5678<br/>
              จำนวนเงิน: ฿{selectedTotal}
            </p>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-xl">
          <p className="text-sm text-yellow-800">
            <strong>หมายเหตุ:</strong> กรุณาอัปโหลดหลักฐานการชำระเงินเพื่อยืนยันคำสั่งซื้อ
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">อัปโหลดหลักฐานการชำระเงิน</h3>
          <button
            onClick={() => setShowExample(!showExample)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            <HiEye className="w-4 h-4" />
            ดูตัวอย่าง
          </button>
        </div>

        {showExample && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3">ตัวอย่างหลักฐานการชำระเงิน</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=300&fit=crop" 
                  alt="ตัวอย่างใบเสร็จ" 
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-blue-800">ใบเสร็จธนาคาร</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=300&fit=crop" 
                  alt="ตัวอย่างสลิป" 
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-blue-800">สลิปโอนเงิน</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-blue-700">
              <p>✓ รูปภาพชัดเจน อ่านได้</p>
              <p>✓ แสดงจำนวนเงินและวันที่</p>
              <p>✓ ไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
            </div>
          </div>
        )}

        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="receipt-upload"
            />
            <label htmlFor="receipt-upload" className="cursor-pointer">
              <HiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                คลิกเพื่ือเลือกรูปภาพ
              </p>
              <p className="text-sm text-gray-500">
                รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB
              </p>
            </label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="หลักฐานการชำระเงิน"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <HiCheck className="w-4 h-4" />
                อัปโหลดรูปภาพเรียบร้อยแล้ว
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={onBack}
            disabled={isUploading}
            className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleSubmitPayment}
            disabled={!uploadedImage || isUploading}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
              !uploadedImage || isUploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                กำลังตรวจสอบ...
              </div>
            ) : (
              'ยืนยันการชำระเงิน'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}