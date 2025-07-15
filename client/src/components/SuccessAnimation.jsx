// src/components/SuccessAnimation.jsx
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

function SuccessAnimation({ message = 'Success!', showConfetti = false }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* ✅ Confetti for signup */}
      {showConfetti && <Confetti />}

      {/* ✅ Slide-in Toast */}
      <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-slide-in">
        ✅ {message}
      </div>

      {/* ✅ Center Checkmark */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="bg-white rounded-full p-6 shadow-lg animate-bounce-in">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SuccessAnimation;
