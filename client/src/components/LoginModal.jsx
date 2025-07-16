import React, { useState } from 'react';
import axios from 'axios';
import SuccessAnimation from './SuccessAnimation'; // ✅ Import animation

function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Email and password are required ❗');
      setSuccess(false);
      return;
    }

    const isValidGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    if (!isValidGmail) {
      setMessage('Enter a valid Gmail address ❌');
      setSuccess(false);
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { email, password });
      if (res.data.token) {
        setMessage('Login successful ✅');
        setSuccess(true);
        setTimeout(() => {
          document.getElementById('loginModal')?.close();
          setEmail('');
          setPassword('');
          setMessage('');
          setSuccess(false);
        }, 1000);
      }
    } catch (err) {
      setMessage('Login failed ❌');
      setSuccess(false);
    }
  };

  return (
    <dialog id="loginModal" className="modal">
      <div className="modal-box bg-[#1e2a3a] text-white rounded-xl max-w-sm">
        <h3 className="text-2xl font-bold text-center mb-4">Sign In</h3>

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
              placeholder="User Name Or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 pl-10 bg-[#273142] border border-gray-600 rounded-md text-white focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 pl-10 pr-10 bg-[#273142] border border-gray-600 rounded-md text-white focus:outline-none [&::-ms-reveal]:hidden"
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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 mt-4 py-2 rounded-md font-semibold"
        >
          LOGIN
        </button>

        {/* Switch to Signup */}
        <div className="text-center mt-4 text-sm text-gray-300">
          Need new account?
          <button
            className="ml-2 text-green-400 font-semibold hover:underline"
            onClick={() => {
              document.getElementById('loginModal')?.close();
              document.getElementById('signupModal')?.showModal();
            }}
          >
            Sign Up
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>

      {/* ✅ Success Animation (without confetti) */}
      {success && <SuccessAnimation message="Login successful!" showConfetti={false} />}
    </dialog>
  );
}

export default LoginModal;
