import React, { useState } from 'react';
import { login } from '../api/auth'; // Ensure path is correct

const LoginForm = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(email.trim(), password);

      if (response.token) {
        alert('Login successful!');
        onClose(); // Close modal
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials or sign up first.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
        >
          Login
        </button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={onSwitchToSignup}
        >
          Sign up first
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

export default LoginForm;
