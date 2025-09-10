// resources/js/components/SuccessModal.jsx
import React from 'react';

export default function SuccessModal({ open, close, message, type = 'success' }) {
  if (!open) return null;
  const colors = {
    success: 'border-green-500 bg-green-50 text-green-700',
    error: 'border-red-500 bg-red-50 text-red-700',
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className={`max-w-sm w-full border-l-4 px-6 py-5 rounded shadow-lg ${colors[type]}`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button onClick={close} className="ml-4 text-xl font-bold focus:outline-none">&times;</button>
        </div>
      </div>
    </div>
  );
}
