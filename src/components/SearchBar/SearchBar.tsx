import SearchIcon from "@/assets/icons/search.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={cn(
        "border-border-solid flex flex-1 items-center gap-2 rounded-full border-[2px] border-[#0373F3] bg-white py-2 pr-2 pl-5",
        className,
      )}
    >
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="flex-1 outline-none"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex items-center gap-6">
        <img
          className="drag-none h-3 w-3 md:h-4 md:w-4 xl:h-6 xl:w-6"
          src={CameraIcon}
          alt="Camera"
        />
        <div className="flex shrink-0 rounded-full bg-[#0373F3] px-3 py-2 xl:px-6 xl:py-2.5">
          <img
            className="drag-none h-3 w-3 md:h-4 md:w-4 xl:h-6 xl:w-6"
            src={SearchIcon}
            alt="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
