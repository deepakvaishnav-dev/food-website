import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface StripeCheckoutFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = data;

      // Confirm payment
      const cardElement = elements.getElement(CardElement) as StripeCardElement;
      if (!cardElement) {
        throw new Error("Card element not found");
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        onPaymentError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        onPaymentSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onPaymentError(error.response?.data?.error || "Payment failed");
      } else {
        onPaymentError("Payment failed");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

export default StripeCheckoutForm;
