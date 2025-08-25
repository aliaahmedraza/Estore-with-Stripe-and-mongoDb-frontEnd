import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouters from "./routes/Route";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import "@ant-design/v5-patch-for-react-19";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!window.Buffer) {
  window.Buffer = Buffer;
}

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <ToastContainer />
        <AppRouters />
      </Router>
    </ClerkProvider>
  </StrictMode>
);
