import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import useCartStore from "../../store/CartStore";
import { useUser } from "@clerk/clerk-react";
import Loader from "../../components/Loader/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;

      // Request checkout session from backend
      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            email: user.primaryEmailAddress?.emailAddress || "",
            userId: user.id,
          }),
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        alert("Something went wrong with Stripe session.");
      }
    } catch (err) {
      console.error("Checkout error", err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => handleCheckout(), []);
  if (loading) return <Loader />;
}
