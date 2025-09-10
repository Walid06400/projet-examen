// resources/js/components/ui/Label.jsx
import React from 'react';

export default function Label({ children, htmlFor, className = '', required = false }) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-900 mb-1 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
