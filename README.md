# 🍜 Foody - แอปพลิเคชันสั่งอาหาร

แอปพลิเคชันสั่งอาหารออนไลน์ที่สร้างด้วย Next.js และ React

## 📁 โครงสร้างโปรเจค

```
foody/
├── src/
│   ├── app/                    # หน้าต่างๆ ของแอป (Next.js App Router)
│   │   ├── page.js            # หน้าหลัก - แสดงรายการร้านอาหาร
│   │   ├── layout.js          # Layout หลักของแอป
│   │   ├── orders/            # หน้าสั่งซื้อและชำระเงิน
│   │   └── store/[id]/        # หน้ารายละเอียดร้านอาหาร
│   │
│   ├── components/            # Components ต่างๆ
│   │   ├── Cart/             # Components เกี่ยวกับตะกร้าสินค้า
│   │   ├── Order/            # Components เกี่ยวกับการสั่งซื้อ
│   │   ├── Store/            # Components เกี่ยวกับร้านอาหาร
│   │   └── Layout/           # Components เกี่ยวกับ Layout
│   │
│   ├── context/              # React Context สำหรับจัดการ State
│   │   ├── CartContext.js    # จัดการสถานะตะกร้าสินค้า
│   │   ├── ThemeContext.js   # จัดการธีม (สี/โหมด)
│   │   └── LocaleContext.js  # จัดการภาษา
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── useClientNavigation.js    # Hook สำหรับการนำทาง
│   │   └── useHydrationSafeContext.js # Hook ป้องกัน Hydration Error
│   │
│   ├── data/                 # ข้อมูลตัวอย่าง
│   │   └── stores.js         # ข้อมูลร้านอาหารและเมนู
│   │
│   └── types/                # Type definitions
│       └── react.d.ts        # Type สำหรับ React
│
├── public/                   # ไฟล์ Static
├── package.json             # Dependencies และ Scripts
└── README.md               # เอกสารนี้
```

## 🚀 การเริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
```bash
# คัดลอกไฟล์ตัวอย่าง
cp .env.example .env.local

# แก้ไขไฟล์ .env.local และใส่ Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. รันแอปพลิเคชัน
```bash
npm run dev
```

### 4. เปิดเบราว์เซอร์
ไปที่ `http://localhost:3000`

## 🗺️ การตั้งค่า Google Maps

### วิธีการได้ Google Maps API Key:

1. **ไปที่ Google Cloud Console**
   - เข้าไปที่ https://console.cloud.google.com/

2. **สร้างโปรเจคใหม่หรือเลือกโปรเจคที่มีอยู่**

3. **เปิดใช้งาน APIs**
   - Maps JavaScript API
   - Places API (ถ้าต้องการ)

4. **สร้าง API Key**
   - ไปที่ Credentials → Create Credentials → API Key

5. **จำกัดการใช้งาน API Key (แนะนำ)**
   - Application restrictions: HTTP referrers
   - API restrictions: เลือกเฉพาะ APIs ที่ใช้

6. **ใส่ API Key ในไฟล์ .env.local**

### หมายเหตุ:
- หากไม่มี API Key แอปจะใช้ Static Map แทน
- Static Map ไม่ต้องใช้ API Key แต่ฟีเจอร์จำกัด

## 🎯 ฟีเจอร์หลัก

### 🏠 หน้าหลัก (Home Page)
- แสดงรายการร้านอาหารทั้งหมด
- ค้นหาร้านอาหารตามชื่อ
- กรองตามหมวดหมู่อาหาร
- กรองตามที่อยู่

### 🏪 หน้ารายละเอียดร้าน
- แสดงข้อมูลร้านอาหาร
- แสดงแผนที่ตั้งร้าน
- รายการเมนูอาหารแยกตามหมวดหมู่
- เพิ่มสินค้าลงตะกร้า

### 🛒 ระบบตะกร้าสินค้า
- เพิ่ม/ลบ/แก้ไขจำนวนสินค้า
- จัดกลุ่มสินค้าตามร้าน
- คำนวณราคารวม
- บันทึกข้อมูลสำหรับการสั่งซื้อ

### 💳 ระบบสั่งซื้อและชำระเงิน
- เลือกร้านที่ต้องการสั่งซื้อ
- เลือกวิธีการชำระเงิน
- ยืนยันคำสั่งซื้อ

## 🛠️ เทคโนโลยีที่ใช้

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Language**: JavaScript
- **Package Manager**: npm

## 📝 การจัดการ State

### CartContext
จัดการสถานะตะกร้าสินค้า:
- `cart`: รายการสินค้าในตะกร้า
- `addToCart()`: เพิ่มสินค้าลงตะกร้า
- `removeFromCart()`: ลบสินค้าออกจากตะกร้า
- `clearCart()`: ล้างตะกร้าทั้งหมด

### ThemeContext
จัดการธีมของแอป:
- `theme`: ธีมปัจจุบัน (light/dark)
- `toggleTheme()`: เปลี่ยนธีม

### LocaleContext
จัดการภาษา:
- `locale`: ภาษาปัจจุบัน
- `changeLocale()`: เปลี่ยนภาษา

## 🔧 Custom Hooks

### useClientNavigation
Hook สำหรับการนำทางที่ปลอดภัยจาก Hydration Error

### useHydrationSafeContext
Hook สำหรับใช้ Context ที่ปลอดภัยจาก Hydration Error

## 🎨 การออกแบบ UI

- **สีหลัก**: Blue (#2563eb)
- **สีรอง**: Gray tones
- **Typography**: Geist Sans
- **Design System**: Modern, Clean, Responsive
- **Components**: Reusable และ Accessible

## 📱 Responsive Design

แอปรองรับการใช้งานบนอุปกรณ์ต่างๆ:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🚫 การป้องกัน Hydration Error

โปรเจคนี้ใช้เทคนิคต่างๆ เพื่อป้องกัน Hydration Error:

1. **ClientOnly Component**: แสดงเนื้อหาเฉพาะฝั่ง Client
2. **Safe Context**: ใช้ default values ที่สม่ำเสมอ
3. **useEffect Pattern**: อ่านข้อมูลจาก localStorage หลัง mount
4. **Conditional Rendering**: ตรวจสอบ client-side ก่อนแสดงผล

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 การพัฒนา

หากต้องการพัฒนาต่อ:

1. Fork repository นี้
2. สร้าง feature branch
3. Commit การเปลี่ยนแปลง
4. Push ไปยัง branch
5. สร้าง Pull Request

---

สร้างด้วย ❤️ โดยใช้ Next.js และ React