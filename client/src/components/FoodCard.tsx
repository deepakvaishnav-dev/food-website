import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-32 object-cover rounded-t-lg mb-2"
        />
        <CardTitle>{food.name}</CardTitle>
        <CardDescription>{food.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Type:</span>
          <span className="text-sm">{food.type}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Price:</span>
          <span className="text-sm">${food.price}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Weight:</span>
          <span className="text-sm">{food.weight}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Rating:</span>
          <span className="text-sm">{food.rating}/5</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Available:</span>
          <span
            className={`text-sm ${
              food.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {food.isAvailable ? "Yes" : "No"}
          </span>
        </div>
        {food.isAvailable && (
          <Button
            className="w-full mt-4"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodCard;
