import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ProductsList from "../components/Products/ProductsList";
import Clerk from "../pages/Clerk/ClerkSignIn";
import Cart from "../pages/Cart/Cart.jsx";
import StripePayment from "../pages/StripePayment/StripePayment.jsx";
import Success from "../pages/StripeSuccess/StripeSuccess.jsx";
import Cancel from "../pages/StripeFailure/StripeFailure.jsx";

function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<Clerk />} />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <ProductsList />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/cart"
        element={
          <>
            <SignedIn>
              <Cart />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/success"
        element={
          <>
            <SignedIn>
              <Success/>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/cancel"
        element={
          <>
            <SignedIn>
              <Cancel/>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/payment"
        element={
          <>
            <SignedIn>
              <StripePayment />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default AppRouters;
