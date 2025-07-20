// components/ReusableModal.jsx
import React, { useEffect, useRef } from 'react';

function ReusableModal({
  id,
  title,
  email,
  password,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  message,
  success,
  loading,
  onSubmit,
  submitLabel,
  switchText,
  onSwitch,
  successAnimation = null,
}) {
  const modalRef = useRef(null);

  // ✅ Clear inputs when modal opens
  useEffect(() => {
    const modal = document.getElementById(id);
    if (!modal) return;

    const handleOpen = () => {
      setEmail('');
      setPassword('');
      // Optional: clear messages
    };

    modal.addEventListener('click', handleBackdropClick);
    modal.addEventListener('close', handleOpen);

    return () => {
      modal.removeEventListener('click', handleBackdropClick);
      modal.removeEventListener('close', handleOpen);
    };
  }, [id, setEmail, setPassword]);

  // ✅ Close modal when clicking outside the box
  const handleBackdropClick = (e) => {
    if (e.target?.id === id) {
      document.getElementById(id)?.close();
    }
  };

  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className="modal-box bg-[#1e2a3a] text-white rounded-xl max-w-sm">
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>

        {message && (
          <p className={`text-sm text-center mb-3 ${success ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <div className="space-y-3">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 pl-10 bg-[#273142] border border-gray-600 rounded-md text-white focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 pl-10 pr-10 bg-[#273142] border border-gray-600 rounded-md text-white focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            <span
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className={`w-full mt-5 py-2 rounded-md font-semibold ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? `${submitLabel}...` : submitLabel}
        </button>

        {/* Switch */}
        <div className="text-center mt-4 text-sm text-gray-300">
          {switchText.label}
          <button
            className="ml-2 text-blue-400 font-semibold hover:underline"
            onClick={onSwitch}
          >
            {switchText.action}
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>

      {/* Optional Success Animation */}
      {successAnimation}
    </dialog>
  );
}

export default ReusableModal;
