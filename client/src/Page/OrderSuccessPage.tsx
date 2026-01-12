import React from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderDetails {
  orderId: string;
  deliveryTime: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails: OrderDetails = location.state?.orderDetails;

  const orderDate = new Date();
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString();

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No order details found. Please place an order first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🎉 CONFETTI */}
      <Confetti numberOfPieces={250} recycle={false} />

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-green-600">
                🎉 Order Placed Successfully
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Thank you for ordering with us 🍔
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ORDER INFO */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-1"
              >
                <p className="font-semibold">
                  🧾 Order ID: {orderDetails.orderId}
                </p>
                <p>📅 Date: {formattedDate}</p>
                <p>⏰ Time: {formattedTime}</p>
                <p className="font-medium">
                  🚚 Delivery in: {orderDetails.deliveryTime}
                </p>
                <p className="text-sm text-gray-600">
                  📍 {orderDetails.address}
                </p>
              </motion.div>

              {/* ITEMS */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  🍽 Ordered Items
                </h3>

                <div className="space-y-2 text-sm">
                  {orderDetails.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex justify-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Button
                  className="w-full"
                  onClick={() => navigate("/track-order")}
                >
                  Track Order 🚴
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Order More Food 🍕
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
