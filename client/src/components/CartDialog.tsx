import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ open, onOpenChange }) => {
  const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-425px">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review your items and proceed to checkout.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.foodId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground cursor-pointer">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.foodId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <Badge variant="secondary">{item.quantity}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.foodId, item.quantity + 1)
                    }
                    className="cursor-pointer"
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.foodId)}
                    className="cursor-pointer"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <DialogFooter>
            <div className="flex justify-between w-full">
              <p className="font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  navigate("/checkout");
                }}
                className="cursor-pointer"
              >
                Checkout
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
