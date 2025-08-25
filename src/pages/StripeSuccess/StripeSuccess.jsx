import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Result
        status="success"
        title="Payment Successful 🎉"
        subTitle="Thank you! Your payment has been received and your order is being processed."
        extra={[
          <Link to="/dashboard" key="home">
            <Button type="primary">Back to Home</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
