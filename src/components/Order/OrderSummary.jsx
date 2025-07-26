import { HiStar } from "react-icons/hi";

export default function OrderSummary({ 
  grouped, 
  selectedStores, 
  onStoreSelection, 
  onSelectAll, 
  onProceedToDelivery, 
  selectedTotal 
}) {
  const storeEntries = Object.entries(grouped);
  const allSelected = selectedStores.size === storeEntries.length;

  // ✅ แก้ไข className สำหรับปุ่มเพื่อหลีกเลี่ยง hydration error
  const getButtonClassName = (isDisabled) => {
    const baseClass = 'w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200';
    const stateClass = isDisabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]';
    return `${baseClass} ${stateClass}`;
  };

  return (
    <div className="space-y-6">
      {/* Select All Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="select-all"
              checked={allSelected}
              onChange={onSelectAll}
              className="w-5 h-5 text-[#2563eb] bg-gray-100 border-gray-300 rounded focus:ring-[#2563eb] focus:ring-2"
            />
            <label htmlFor="select-all" className="text-lg font-bold text-gray-900">
              เลือกทั้งหมด ({storeEntries.length} ร้าน)
            </label>
          </div>
          <span className="text-sm text-gray-500">
            เลือกแล้ว {selectedStores.size} ร้าน
          </span>
        </div>
      </div>

      {/* Store Orders */}
      <div className="space-y-4">
        {storeEntries.map(([storeId, storeData]) => {
          const isSelected = selectedStores.has(storeId);
          
          // ✅ แก้ไข className เพื่อหลีกเลี่ยง hydration error
          const getStoreCardClassName = (selected) => {
            const baseClass = 'bg-white rounded-2xl shadow-lg border-2 transition-all duration-200';
            const selectedClass = selected 
              ? 'border-[#2563eb] ring-2 ring-[#2563eb]/20' 
              : 'border-gray-100 hover:border-gray-200';
            return `${baseClass} ${selectedClass}`;
          };
          
          return (
            <div 
              key={storeId} 
              className={getStoreCardClassName(isSelected)}
            >
              {/* Store Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id={`store-${storeId}`}
                      checked={isSelected}
                      onChange={() => onStoreSelection(storeId)}
                      className="w-5 h-5 text-[#2563eb] bg-gray-100 border-gray-300 rounded focus:ring-[#2563eb] focus:ring-2"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center">
                        <HiStar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{storeData.storeName}</h3>
                        <p className="text-sm text-gray-500">{storeData.items.length} รายการ</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">ยอดรวม</p>
                    <p className="text-2xl font-bold text-[#2563eb]">฿{storeData.total}</p>
                  </div>
                </div>
              </div>

              {/* Store Items */}
              <div className="p-6 space-y-4">
                {storeData.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100 text-[#2563eb] px-2 py-1 rounded-full font-medium">
                            {item.option}
                          </span>
                          <span className="text-xs bg-blue-100 text-[#2563eb] px-2 py-1 rounded-full font-medium">
                            {item.meat}
                          </span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">
                            จำนวน {item.quantity}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-sm text-gray-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                            📝 {item.note}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-500">฿{item.price} × {item.quantity}</p>
                        <p className="text-lg font-bold text-gray-900">฿{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky bottom-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">ร้านที่เลือก: {selectedStores.size} ร้าน</p>
            <p className="text-2xl font-bold text-gray-900">ยอดรวมทั้งหมด</p>
          </div>
          <p className="text-3xl font-bold text-[#2563eb]">฿{selectedTotal}</p>
        </div>
        
        <button
          onClick={onProceedToDelivery}
          disabled={selectedStores.size === 0}
          className={getButtonClassName(selectedStores.size === 0)}
        >
          {selectedStores.size === 0 
            ? 'เลือกร้านเพื่อดำเนินการต่อ' 
            : `ดำเนินการชำระเงิน (${selectedStores.size} ร้าน)`
          }
        </button>
      </div>
    </div>
  );
}