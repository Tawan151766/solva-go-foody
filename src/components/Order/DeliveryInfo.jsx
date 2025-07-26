import { useState } from 'react';
import { HiPhone, HiLocationMarker, HiUser, HiHome, HiOfficeBuilding, HiPlus } from 'react-icons/hi';

export default function DeliveryInfo({ 
  onBack, 
  onContinue, 
  selectedTotal,
  selectedStores,
  grouped 
}) {
  const [phone, setPhone] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [showCustomAddress, setShowCustomAddress] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [note, setNote] = useState('');

  // ที่อยู่ที่บันทึกไว้
  const savedAddresses = [
    {
      id: 'home',
      type: 'บ้าน',
      icon: <HiHome className="w-5 h-5" />,
      address: '123/45 ซอยลาดพร้าว 15 แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900',
      name: 'บ้าน',
      phone: '081-234-5678'
    },
    {
      id: 'office',
      type: 'ออฟฟิศ',
      icon: <HiOfficeBuilding className="w-5 h-5" />,
      address: '999 อาคารเอ็มไพร์ทาวเวอร์ ชั้น 25 ถนนสาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120',
      name: 'บริษัท ABC จำกัด',
      phone: '02-123-4567'
    }
  ];

  const handleAddressSelect = (addressId) => {
    if (addressId === 'custom') {
      setShowCustomAddress(true);
      setSelectedAddress('custom');
    } else {
      setShowCustomAddress(false);
      setSelectedAddress(addressId);
      const address = savedAddresses.find(addr => addr.id === addressId);
      if (address) {
        setCustomerName(address.name);
        setPhone(address.phone);
      }
    }
  };

  const validateForm = () => {
    if (!customerName.trim()) return false;
    if (!phone.trim()) return false;
    if (!selectedAddress) return false;
    if (selectedAddress === 'custom' && !customAddress.trim()) return false;
    
    // ตรวจสอบรูปแบบเบอร์โทร
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/[-\s]/g, '');
    if (!phoneRegex.test(cleanPhone)) return false;
    
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
      return;
    }

    const deliveryInfo = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: selectedAddress === 'custom' 
        ? customAddress.trim() 
        : savedAddresses.find(addr => addr.id === selectedAddress)?.address,
      addressType: selectedAddress === 'custom' 
        ? 'อื่นๆ' 
        : savedAddresses.find(addr => addr.id === selectedAddress)?.type,
      note: note.trim()
    };

    onContinue(deliveryInfo);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
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
                    <HiLocationMarker className="w-4 h-4 text-white" />
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

      {/* Customer Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HiUser className="w-5 h-5 text-[#2563eb]" />
          ข้อมูลผู้สั่ง
        </h3>
        
        <div className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ชื่อผู้รับ *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="กรอกชื่อผู้รับอาหาร"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              เบอร์โทรศัพท์ *
            </label>
            <div className="relative">
              <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="081-234-5678"
                maxLength="12"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              รูปแบบ: 081-234-5678
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HiLocationMarker className="w-5 h-5 text-[#2563eb]" />
          ที่อยู่จัดส่ง
        </h3>

        <div className="space-y-3">
          {/* Saved Addresses */}
          {savedAddresses.map((address) => (
            <label
              key={address.id}
              className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedAddress === address.id
                  ? 'border-[#2563eb] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="address"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => handleAddressSelect(address.id)}
                className="sr-only"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedAddress === address.id ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {address.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{address.type}</h4>
                  <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{address.name} • {address.phone}</p>
                </div>
              </div>
            </label>
          ))}

          {/* Custom Address Option */}
          <label
            className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedAddress === 'custom'
                ? 'border-[#2563eb] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="address"
              value="custom"
              checked={selectedAddress === 'custom'}
              onChange={() => handleAddressSelect('custom')}
              className="sr-only"
            />
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedAddress === 'custom' ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <HiPlus className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">ที่อยู่อื่น</h4>
                <p className="text-sm text-gray-600">กรอกที่อยู่ใหม่</p>
              </div>
            </div>
          </label>

          {/* Custom Address Input */}
          {showCustomAddress && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ที่อยู่จัดส่ง *
              </label>
              <textarea
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="กรอกที่อยู่จัดส่งแบบละเอียด เช่น บ้านเลขที่ ซอย ถนน แขวง เขต จังหวัด รหัสไปรษณีย์"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Additional Note */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">หมายเหตุเพิ่มเติม</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="หมายเหตุสำหรับร้านอาหารหรือผู้ส่ง (ไม่บังคับ)"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
        />
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
            onClick={handleContinue}
            disabled={!validateForm()}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
              !validateForm()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    </div>
  );
}