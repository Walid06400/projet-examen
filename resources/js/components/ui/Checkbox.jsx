import React, { forwardRef } from 'react';

const Checkbox = forwardRef(function Checkbox({
  className = '',
  ...props
}, ref) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors duration-200 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export default Checkbox;
