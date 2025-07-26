import Link from "next/link";

export default function Tabs({ active = "home" }) {
  // ✅ สร้าง function สำหรับ className เพื่อหลีกเลี่ยง hydration error
  const getTabClassName = (tabName) => {
    const baseClass = "flex flex-1 flex-col items-center justify-end gap-1 rounded-full";
    const activeClass = active === tabName ? "text-[#181111]" : "text-[#886364]";
    return `${baseClass} ${activeClass}`;
  };

  const getIconClassName = (tabName) => {
    const baseClass = "flex h-8 items-center justify-center";
    const activeClass = active === tabName ? "text-[#181111]" : "text-[#886364]";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#f4f0f0] bg-white px-4 pb-3 pt-2 flex gap-2">
      <Link href="/" className={getTabClassName("home")}>
        <div className={getIconClassName("home")}>
          {/* Home Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
          </svg>
        </div>
        <p className="text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
      </Link>
      <Link href="/orders" className={getTabClassName("orders")}>
        <div className={getIconClassName("orders")}>
          {/* Orders Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z"></path>
          </svg>
        </div>
        <p className="text-xs font-medium leading-normal tracking-[0.015em]">Orders</p>
      </Link>
      <Link href="/chat" className={getTabClassName("chat")}>
        <div className={getIconClassName("chat")}>
          {/* Chat Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
          </svg>
        </div>
        <p className="text-xs font-medium leading-normal tracking-[0.015em]">Chat</p>
      </Link>
      <Link href="/profile" className={getTabClassName("profile")}>
        <div className={getIconClassName("profile")}>
          {/* Profile Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </div>
        <p className="text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
      </Link>
    </div>
  );
}
