import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Clerk = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
};

export default Clerk;
