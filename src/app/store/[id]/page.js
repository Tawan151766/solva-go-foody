"use client";


import StoreDetail from "@/components/Stroe/Detail/StoreDetail";
import MenuList from "@/components/Stroe/Detail/MenuList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { menuCategories } from "@/data/stores";

export default function StoreDetailPage() {
  const params = useParams();
  const [store, setStore] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/stores/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setStore(data?.data?.restaurant || null);
        setMenus(data?.data?.restaurant?.menus || []);
        setLoading(false);
      })
      .catch(() => {
        setStore(null);
        setMenus([]);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!store) return <div className="p-8">ไม่พบข้อมูลร้าน</div>;

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6 md:p-8 space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <StoreDetail store={store} />
        </div>
        <div className="lg:w-1/2 w-full">
          <MenuList
            menuCategories={menuCategories}
            menus={menus}
            store={store}
          />
        </div>
      </div>
    </div>
  );
}
