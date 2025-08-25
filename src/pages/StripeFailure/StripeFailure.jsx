import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Result
        status="error"
        title="Payment Cancelled ❌"
        subTitle="Looks like the payment didn’t go through. You can try again anytime."
        extra={[
          <Link to="/cart" key="cart">
            <Button type="primary" danger>
              Back to Cart
            </Button>
          </Link>,
        ]}
      />
    </div>
  );
}
