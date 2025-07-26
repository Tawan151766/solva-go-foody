"use client";

import StoreDetail from "@/components/Stroe/Detail/StoreDetail";
import MenuList from "@/components/Stroe/Detail/MenuList";
import { useParams } from "next/navigation";
import { stores, menuCategories, menus } from "@/data/stores";

export default function StoreDetailPage() {
  const params = useParams();
  const store = stores.find((s) => String(s.id) === params.id);

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
