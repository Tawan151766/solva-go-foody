/**
 * ข้อมูลร้านอาหารและเมนูทั้งหมด
 * ไฟล์นี้เก็บข้อมูลตัวอย่างสำหรับแอปพลิเคชัน
 */

// รายการร้านอาหารทั้งหมด
export const stores = [
  {
    "id": 1,
    "name": "Bang Sue Thai Noodles",
    "address": "101/2 ถนนเตชะวณิช แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ",
    "rating": 4.5,
    "image": "https://lh5.googleusercontent.com/p/AF1QipPGfCg_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0=w400-h300-k-no",
    "lat": 13.8131,
    "lng": 100.5372,
    "category": "ก๋วยเตี๋ยว",
    "nationality": "ไทย",
    "openingHours": "08:00 - 20:00"
  },
  {
    "id": 2,
    "name": "Siam Square Café",
    "address": "258/1-3 ซอยจุฬา 42 แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ",
    "rating": 4.2,
    "image": "https://lh5.googleusercontent.com/p/AF1QipMs-fV7x_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2_2=w400-h300-k-no",
    "lat": 13.7447,
    "lng": 100.5348,
    "category": "คาเฟ่",
    "nationality": "นานาชาติ",
    "openingHours": "07:00 - 22:00"
  },
  {
    "id": 3,
    "name": "Sukhumvit Japanese Restaurant",
    "address": "88/8 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ",
    "rating": 4.7,
    "image": "https://lh5.googleusercontent.com/p/AF1QipOYj_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9=w400-h300-k-no",
    "lat": 13.7371,
    "lng": 100.5630,
    "category": "อาหารญี่ปุ่น",
    "nationality": "ญี่ปุ่น",
    "openingHours": "11:00 - 14:00, 17:00 - 22:00"
  },
  {
    "id": 4,
    "name": "Chinatown Dim Sum",
    "address": "123 ถนนเยาวราช แขวงจักรวรรดิ เขตสัมพันธวงศ์ กรุงเทพฯ",
    "rating": 4.0,
    "image": "https://lh5.googleusercontent.com/p/AF1QipPk_hZ1z_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1=w400-h300-k-no",
    "lat": 13.7408,
    "lng": 100.5049,
    "category": "ติ่มซำ",
    "nationality": "จีน",
    "openingHours": "09:00 - 18:00"
  },
  {
    "id": 5,
    "name": "Riverside Seafood",
    "address": "77/4 ซอยเจริญนคร 10 แขวงคลองต้นไทร เขตคลองสาน กรุงเทพฯ",
    "rating": 4.6,
    "image": "https://lh5.googleusercontent.com/p/AF1QipRj_oW_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o_o=w400-h300-k-no",
    "lat": 13.7225,
    "lng": 100.4920,
    "category": "อาหารทะเล",
    "nationality": "ไทย",
    "openingHours": "16:00 - 23:00"
  }
]

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