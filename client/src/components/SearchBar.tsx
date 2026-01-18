import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react"; // icon
import { Button } from "./ui/button";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempSearch, setTempSearch] = useState(search);

  const handleSearchClick = () => {
    onSearchChange(tempSearch); 
    inputRef.current?.focus();
  };

  return (
    <div className="flex">
      <div className="relative w-64">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search foods..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          className="pr-10"
        />

        {/* Search Icon */}
        <Button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
        >
          <Search size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
