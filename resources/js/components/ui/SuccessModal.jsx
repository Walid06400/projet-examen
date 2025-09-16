import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function SuccessModal({ open, message, redirectTo = "/" }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open, redirectTo]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-lg font-semibold text-gray-800">{message}</p>
      </div>
    </div>,
    document.body
  );
}
