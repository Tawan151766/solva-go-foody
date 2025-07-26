"use client";
import React from "react";

/**
 * Component สำหรับแสดงเนื้อหาเฉพาะฝั่ง Client เท่านั้น
 * ใช้เพื่อป้องกัน hydration error ที่เกิดจากความแตกต่างระหว่าง server และ client
 * 
 * @param {React.ReactNode} children - เนื้อหาที่จะแสดงหลังจาก client โหลดเสร็จ
 * @param {React.ReactNode} fallback - เนื้อหาที่จะแสดงระหว่างรอ client โหลด (default: null)
 */
export default function ClientOnly({ children, fallback = null }) {
  // ตรวจสอบว่า component ได้ mount บน client แล้วหรือยัง
  const [isClientReady, setIsClientReady] = React.useState(false);

  /**
   * เมื่อ component mount บน client
   * จะเปลี่ยนสถานะเป็นพร้อมใช้งาน
   */
  React.useEffect(() => {
    setIsClientReady(true);
  }, []);

  // ถ้ายังไม่พร้อม ให้แสดง fallback content
  if (!isClientReady) {
    return fallback;
  }

  // ถ้าพร้อมแล้ว ให้แสดงเนื้อหาจริง
  return children;
}
