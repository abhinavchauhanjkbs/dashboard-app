import React, { useState } from 'react';
import axios from 'axios';
import SuccessAnimation from './SuccessAnimation'; // 👈 Import at top

function SignupModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
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

    // ✅ Log VITE_API_URL to check if it's working
  console.log(import.meta.env.VITE_API_URL); // Should log backend URL
    
  try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
      });

      if (res.data.token) {
        setMessage('Signup successful ✅');
        setSuccess(true);
        setTimeout(() => {
          document.getElementById('signupModal')?.close();
          setEmail('');
          setPassword('');
          setMessage('');
          setSuccess(false);
        }, 1200);
      } else {
        setMessage('Signup failed ❌ (no token returned)');
        setSuccess(false);
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setMessage(`Signup failed ❌ ${err.response?.data?.error || ''}`);
      setSuccess(false);
    }
  };

  return (
    <dialog id="signupModal" className="modal">
      <div className="modal-box bg-[#1e2a3a] text-white rounded-xl max-w-sm">
        <h3 className="text-2xl font-bold text-center mb-4">Sign Up</h3>

        {message && (
          <p className={`text-sm text-center mb-3 ${success ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <div className="space-y-3">
          {/* Email input */}
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

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
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

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 hover:bg-green-600 mt-5 py-2 rounded-md font-semibold"
        >
          SIGN UP
        </button>

        <div className="text-center mt-4 text-sm text-gray-300">
          Already have an account?
          <button
            className="ml-2 text-blue-400 font-semibold hover:underline"
            onClick={() => {
              document.getElementById('signupModal')?.close();
              document.getElementById('loginModal')?.showModal();
            }}
          >
            Login
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>

      {/* ✅ Success Animation appears here */}
      {success && (
        <SuccessAnimation message="Signup successful!" showConfetti={true} />
      )}
    </dialog>
  );
}

export default SignupModal;
