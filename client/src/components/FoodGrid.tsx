import React from "react";
import FoodCard from "./FoodCard";
import type { Food } from "../types/food";

interface FoodGridProps {
  foods: Food[];
}

const FoodGrid: React.FC<FoodGridProps> = ({ foods }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  );
};

export default FoodGrid;
