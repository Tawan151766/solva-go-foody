export default function CartList({ grouped, handleQty, removeFromCart }) {
  const calculateStoreTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
      {Object.entries(grouped).map(([storeId, items], idx) => (
        <div key={storeId} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          {/* Store Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {items[0].storeName || "ร้านอาหาร"}
              </span>
            </div>
            <span className="text-sm font-semibold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full">
              ฿{calculateStoreTotal(items)}
            </span>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {/* แสดงตัวเลือกระดับ หากมี */}
                      {item.selectedLevel && (
                        <span className="text-xs bg-blue-100 text-[#2563eb] px-2 py-1 rounded-full font-medium">
                          {item.selectedLevel}
                        </span>
                      )}
                      
                      {/* แสดงตัวเลือกเนื้อสัตว์ หากมี */}
                      {item.selectedMeat && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {item.selectedMeat}
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <p className="text-xs text-gray-500 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                      {item.note}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center transition-colors ml-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQty(item, -1)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQty(item, 1)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">฿{item.price} × {item.quantity}</div>
                    <div className="text-lg font-bold text-[#2563eb]">
                      ฿{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
