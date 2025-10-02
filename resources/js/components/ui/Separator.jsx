import React from 'react';

export default function Separator({ className = '' }) {
  // Ligne horizontale fine grise
  return (
    <hr
      className={
        `border-t border-gray-200 my-6 ${className}`
      }
    />
  );
}
