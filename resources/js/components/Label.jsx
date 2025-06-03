import React from "react";

const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

export default Label;
