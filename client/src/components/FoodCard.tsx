import React from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button"
import { toast } from "sonner";

interface Food {
  _id: string;
  name: string;
  type: string;
  price: number;
  weight: string;
  image: string;
  description: string;
  isAvailable: boolean;
  rating: number;
}

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart, loading } = useCart();
  const { isLoggedIn } = useAuth();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(food);
      toast.success(`${food.name} added to cart`);
    } catch {
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="relative w-full max-w-xs bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
        {/* Availability badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
            food.isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {food.isAvailable ? "Available" : "Out of Stock"}
        </span>
        {/* Rating badge */}
        <span className="absolute top-3 right-3 bg-yellow-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
          ⭐ {food.rating}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold line-clamp-1 text-gray-900 dark:text-gray-100">{food.name}</h3>
        <p className="text-sm line-clamp-2 text-gray-600 dark:text-gray-300">{food.description}</p>

        <div className="flex flex-wrap justify-between gap-2 mt-2 text-sm">
          <div className="flex flex-col text-gray-700 dark:text-gray-200">
            <span className="font-medium">Type</span>
            <span>{food.type}</span>
          </div>
          <div className="flex flex-col text-gray-700 dark:text-gray-200">
            <span className="font-medium">Weight</span>
            <span>{food.weight}</span>
          </div>
          <div className="flex flex-col text-gray-700 dark:text-gray-200">
            <span className="font-medium">Price</span>
            <span>${food.price}</span>
          </div>
        </div>

        {food.isAvailable && (
          <Button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
