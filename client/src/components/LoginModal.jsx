import React, { useState, useMemo } from 'react';
import axios from 'axios';
import SuccessAnimation from './SuccessAnimation';
import ReusableModal from './ReusableModal';

function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = useMemo(() => import.meta.env.VITE_API_URL, []);

  const handleLogin = async () => {
    setMessage('');
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

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });

      if (res.data.token) {
        setMessage('Login successful ✅');
        setSuccess(true);
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          document.getElementById('loginModal')?.close();
          setEmail('');
          setPassword('');
          setMessage('');
          setSuccess(false);
        }, 1000);
      } else {
        setMessage('Login failed ❌ (no token returned)');
        setSuccess(false);
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Something went wrong';
      setMessage(`Login failed ❌ ${errMsg}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReusableModal
      id="loginModal"
      title="Sign In"
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      message={message}
      success={success}
      loading={loading}
      onSubmit={handleLogin}
      submitLabel="LOGIN"
      switchText={{
        label: 'Need an account?',
        action: 'Sign Up',
      }}
      onSwitch={() => {
        document.getElementById('loginModal')?.close();
        document.getElementById('signupModal')?.showModal();
      }}
      successAnimation={
        success && <SuccessAnimation message="Login successful!" showConfetti={false} />
      }
    />
  );
}

export default LoginModal;
