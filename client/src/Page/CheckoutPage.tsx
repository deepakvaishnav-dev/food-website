import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    houseFlatNo: "",
    areaStreet: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) return;

    setIsPlacingOrder(true);

    const orderDetails = {
      orderId: `ORD${Date.now()}`,
      paymentMethod,
      total: totalPrice,
      items: cart,
      address: `${formData.houseFlatNo}, ${formData.areaStreet}, ${formData.city}`,
      deliveryTime: "30–40 mins",
    };

    await clearCart();

    setIsDialogOpen(true);

    setTimeout(() => {
      setIsDialogOpen(false);
      setIsPlacingOrder(false);
      navigate("/order-success", { state: { orderDetails } });
    }, 2000);
  };

  return (
    <>
      {/* SUCCESS DIALOG */}
      <Dialog open={isDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-600">
              🎉 Order Placed Successfully
            </DialogTitle>
            <DialogDescription>
              Your order has been placed successfully.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-2">
            Payment Mode: {paymentMethod}
          </p>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen  py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DELIVERY DETAILS */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="houseFlatNo"
                    placeholder="House / Flat No"
                    value={formData.houseFlatNo}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="areaStreet"
                    placeholder="Area / Street"
                    value={formData.areaStreet}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* PAYMENT SECTION */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">
                      Select Payment Method
                    </h3>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer  ${
                        paymentMethod === "Cash on Delivery"
                          ? "border-green-500 "
                          : ""
                      }`}
                      onClick={() => setPaymentMethod("Cash on Delivery")}
                    >
                      💵 Cash on Delivery
                    </div>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        paymentMethod === "Online Payment"
                          ? "border-blue-500 "
                          : ""
                      }`}
                      onClick={() => setPaymentMethod("Online Payment")}
                    >
                      💳 Online Payment (UPI / Card)
                    </div>
                  </div>

                  <Button
                    className="w-full text-lg cursor-pointer"
                    disabled={!paymentMethod || isPlacingOrder}
                  >
                    {isPlacingOrder ? "Processing..." : "Place Order"}
                  </Button>

                  {!paymentMethod && (
                    <p className="text-xs text-red-500 text-center">
                      Please select a payment method to continue
                    </p>
                  )}

                  <p className="text-xs text-gray-500 text-center">
                    🔒 100% Secure Payments
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* ORDER SUMMARY */}
            <Card className="h-fit sticky top-24 hidden lg:block">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {cart.map((item) => (
                  <div key={item.foodId} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
