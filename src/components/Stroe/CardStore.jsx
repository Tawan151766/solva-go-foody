
import Link from "next/link";
import { HiStar } from "react-icons/hi";

export default function CardStore({ address, rating, image, name, id, openingHours, nationality, category }) {
  return (
    <Link
      href={`/store/${id}`}
      className="group flex flex-col bg-gradient-to-br from-[#e0e7ef] to-[#f5f8fa] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden mx-auto w-full max-w-[340px] min-w-[180px] m-1"
    >
      {/* Desktop/Tablet: image on top, info below. Mobile: info left, image right */}
      <div className="flex flex-row md:flex-col lg:flex-col xl:flex-col w-full h-full">
        {/* Image section: left for mobile, top for desktop/tablet */}
        <div
          className="relative w-1/2 md:w-full lg:w-full xl:w-full aspect-square bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('${image}')` }}
        >
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-[#2563eb]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* Info section: right for mobile, below for desktop/tablet */}
        <div className="flex flex-col justify-between p-5 md:p-6 lg:p-6 xl:p-6 w-1/2 md:w-full lg:w-full xl:w-full">
          <div>
            <p className="text-[#2563eb] text-lg font-extrabold leading-tight truncate mb-2 group-hover:text-[#1d4ed8] transition-colors">
              {name}
            </p>
            <p className="text-[#64748b] text-sm font-medium leading-normal truncate mb-2">
              {address}
            </p>
            {/* Modern info row */}
            <div className="flex flex-wrap gap-2 mt-2">
              {category && (
                <span className="inline-block bg-[#e0e7ef] text-[#2563eb] text-xs font-semibold px-2 py-1 rounded-full">
                  {category}
                </span>
              )}
              {nationality && (
                <span className="inline-block bg-[#f5f8fa] text-[#64748b] text-xs font-semibold px-2 py-1 rounded-full">
                  {nationality}
                </span>
              )}
              {openingHours && (
                <span className="inline-block bg-[#2563eb]/10 text-[#2563eb] text-xs font-semibold px-2 py-1 rounded-full">
                  {openingHours}
                </span>
              )}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-white/90 text-[#2563eb] text-xs font-bold px-3 py-1 rounded-full shadow w-fit mt-3">
            <HiStar className="w-4 h-4 text-yellow-400" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
