import React, { useState } from 'react';
import { signup } from '../api/auth';

const SignupForm = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await signup(email, password);
      if (response.success) {
        setMessage('Signup successful. You can now login.');
      } else {
        setError(response.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong during signup.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

      {message && <div className="text-green-600 text-sm mb-4 text-center">{message}</div>}
      {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
        >
          Signup
        </button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={onSwitchToLogin}
        >
          Login here
        </span>
      </div>

      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 hover:underline w-full text-center"
      >
        Close
      </button>
    </>
  );
};

export default SignupForm;
