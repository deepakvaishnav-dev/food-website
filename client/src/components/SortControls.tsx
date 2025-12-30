import React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SortControlsProps {
  priceSort: string;
  ratingSort: string;
  onSortChange: (priceSort: string, ratingSort: string) => void;
  onClearSorts: () => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  priceSort,
  ratingSort,
  onSortChange,
  onClearSorts,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sort by Price:</label>
        <Select
          value={priceSort}
          onValueChange={(value) => onSortChange(value, ratingSort)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="high-to-low">High to Low</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sort by Rating:</label>
        <Select
          value={ratingSort}
          onValueChange={(value) => onSortChange(priceSort, value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="high-to-low">High to Low</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onClearSorts} variant="outline">
        Clear Sorts
      </Button>
    </div>
  );
};

export default SortControls;
