import React from "react";

const Button = ({ text, properties, onClick,disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${properties}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
