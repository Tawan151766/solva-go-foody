export default function EmptyState({ value = "ไม่พบข้อมูล" }) {
  return (
    <div className="col-span-full text-center text-[#64748b] py-12 text-lg">
      {value}
    </div>
  );
}
