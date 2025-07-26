/**
 * ข้อมูลร้านอาหารและเมนูทั้งหมด
 * ไฟล์นี้เก็บข้อมูลตัวอย่างสำหรับแอปพลิเคชัน
 */

// รายการร้านอาหารทั้งหมด
export const stores = [
  {
    id: 1,
    name: "Bang Sue Thai Noodles",
    address: "101/2 ถนนเตชะวณิช แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwp1GvQB3J0KABfdKjrYaPmoSqoogXithiGJ-ISvyCUqTsdK3LCQs0mtjp627s3sI8iKdKtjZYZXKYTRAv6ugFeClcV5ExaiTroURdi1VD9roLlNadVX8otken93hDJiT7Vr4GWN3Ff4K3nebO43zsrfN0kUqaYApR7CqBBhaO6T7zip7pU21oNikO4wuncPldf431Szy0wR5DOScW2AyimrPukU9Dngudwa9Pce7iuwcj3f7kVpacT3zT4CtLSJaILgmHSAATxPtp",
    lat: 13.8131,    // พิกัดละติจูด
    lng: 100.5372,   // พิกัดลองจิจูด
    category: "ก๋วยเตี๋ยว",
  },
  {
    id: 2,
    name: "Roti Bang Sue",
    address: "88/9 ซอยประชาชื่น 27 เขตบางซื่อ กรุงเทพฯ",
    rating: 4.2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwp1GvQB3J0KABfdKjrYaPmoSqoogXithiGJ-ISvyCUqTsdK3LCQs0mtjp627s3sI8iKdKtjZYZXKYTRAv6ugFeClcV5ExaiTroURdi1VD9roLlNadVX8otken93hDJiT7Vr4GWN3Ff4K3nebO43zsrfN0kUqaYApR7CqBBhaO6T7zip7pU21oNikO4wuncPldf431Szy0wR5DOScW2AyimrPukU9Dngudwa9Pce7iuwcj3f7kVpacT3zT4CtLSJaILgmHSAATxPtp",
    lat: 13.8178,
    lng: 100.5325,
    category: "โรตี",
  },
  {
    id: 3,
    name: "Kao Ka Moo Express",
    address: "ใต้สถานี MRT บางซื่อ ทางออก 3",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwp1GvQB3J0KABfdKjrYaPmoSqoogXithiGJ-ISvyCUqTsdK3LCQs0mtjp627s3sI8iKdKtjZYZXKYTRAv6ugFeClcV5ExaiTroURdi1VD9roLlNadVX8otken93hDJiT7Vr4GWN3Ff4K3nebO43zsrfN0kUqaYApR7CqBBhaO6T7zip7pU21oNikO4wuncPldf431Szy0wR5DOScW2AyimrPukU9Dngudwa9Pce7iuwcj3f7kVpacT3zT4CtLSJaILgmHSAATxPtp",
    lat: 13.8149,
    lng: 100.537,
    category: "ข้าวขาหมู",
  },
];

// หมวดหมู่ร้านอาหารสำหรับการกรอง
export const categories = [
  "ทั้งหมด",      // แสดงร้านทั้งหมด
  "ก๋วยเตี๋ยว",   // ร้านก๋วยเตี๋ยว
  "โรตี",        // ร้านโรตี
  "ข้าวขาหมู"     // ร้านข้าวขาหมู
];

// หมวดหมู่เมนูอาหาร
export const menuCategories = [
  { id: 1, name: "ก๋วยเตี๋ยว" },
  { id: 2, name: "ข้าว" },
  { id: 3, name: "ของหวาน" },
];

// รายการเมนูอาหารทั้งหมด
export const menus = [
  // เมนูก๋วยเตี๋ยว (categoryId: 1) - มีตัวเลือกเนื้อสัตว์และระดับ
  { 
    id: 1, 
    name: "ก๋วยเตี๋ยวหมูน้ำใส", 
    price: 55, 
    categoryId: 1,
    // ตัวเลือกเนื้อสัตว์ (หากไม่มีจะไม่แสดง)
    meatOptions: [
      { value: "หมู", label: "หมู", priceAdd: 0 },
      { value: "เนื้อ", label: "เนื้อ", priceAdd: 10 },
      { value: "ไก่", label: "ไก่", priceAdd: 5 }
    ],
    // ตัวเลือกระดับ (หากไม่มีจะไม่แสดง)
    levelOptions: [
      { value: "ธรรมดา", label: "ธรรมดา", priceAdd: 0 },
      { value: "พิเศษ", label: "พิเศษ (เพิ่มเนื้อ)", priceAdd: 15 }
    ]
  },
  { 
    id: 2, 
    name: "ก๋วยเตี๋ยวเนื้อ", 
    price: 65, 
    categoryId: 1,
    // เมนูนี้มีแค่ตัวเลือกระดับ ไม่มีตัวเลือกเนื้อสัตว์
    levelOptions: [
      { value: "ธรรมดา", label: "ธรรมดา", priceAdd: 0 },
      { value: "พิเศษ", label: "พิเศษ (เพิ่มเนื้อ)", priceAdd: 20 }
    ]
  },
  
  // เมนูข้าว (categoryId: 2) - ไม่มีตัวเลือกพิเศษ
  { 
    id: 3, 
    name: "ข้าวขาหมู", 
    price: 50, 
    categoryId: 2
    // ไม่มี meatOptions และ levelOptions = ไม่แสดงตัวเลือกใดๆ
  },
  { 
    id: 4, 
    name: "ข้าวมันไก่", 
    price: 45, 
    categoryId: 2,
    // เมนูนี้มีแค่ตัวเลือกระดับ
    levelOptions: [
      { value: "ธรรมดา", label: "ธรรมดา", priceAdd: 0 },
      { value: "พิเศษ", label: "พิเศษ (เพิ่มไก่)", priceAdd: 10 }
    ]
  },
  
  // เมนูของหวาน (categoryId: 3) - ไม่มีตัวเลือกพิเศษ
  { 
    id: 5, 
    name: "โรตีธรรมดา", 
    price: 25, 
    categoryId: 3
    // ไม่มีตัวเลือกใดๆ
  },
  { 
    id: 6, 
    name: "โรตีใส่ไข่", 
    price: 35, 
    categoryId: 3,
    // เมนูนี้มีตัวเลือกเพิ่มเติม
    levelOptions: [
      { value: "ธรรมดา", label: "ธรรมดา", priceAdd: 0 },
      { value: "พิเศษ", label: "พิเศษ (เพิ่มกล้วย)", priceAdd: 10 },
      { value: "ดีลักซ์", label: "ดีลักซ์ (เพิ่มไอศกรีม)", priceAdd: 20 }
    ]
  },
];