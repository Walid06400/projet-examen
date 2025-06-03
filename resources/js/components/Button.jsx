import React from "react";
import clsx from "clsx"; // Optionnel, pour gérer les classes dynamiques

export const Button = ({
  type = "button",
  className = "",
  children,
  ...props
}) => (
  <button
    type={type}
    className={clsx(
      "px-4 py-2 rounded-full font-semibold transition focus:outline-none",
      "bg-indigo-600 text-white hover:bg-indigo-500",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
