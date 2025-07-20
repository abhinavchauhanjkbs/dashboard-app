import React, { useState, useMemo } from 'react';
import axios from 'axios';
import SuccessAnimation from './SuccessAnimation';
import ReusableModal from './ReusableModal';

function SignupModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = useMemo(() => import.meta.env.VITE_API_URL, []);

  const handleSignup = async () => {
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
      const res = await axios.post(`${API_URL}/auth/signup`, {
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
        }, 1500);
      } else {
        setMessage('Signup failed ❌ (no token returned)');
        setSuccess(false);
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Try again';
      setMessage(`Signup failed ❌ ${errMsg}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReusableModal
      id="signupModal"
      title="Sign Up"
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      message={message}
      success={success}
      loading={loading}
      onSubmit={handleSignup}
      submitLabel="SIGN UP"
      switchText={{
        label: 'Already have an account?',
        action: 'Login',
      }}
      onSwitch={() => {
        document.getElementById('signupModal')?.close();
        document.getElementById('loginModal')?.showModal();
      }}
      successAnimation={
        success && <SuccessAnimation message="Signup successful!" showConfetti={true} />
      }
    />
  );
}

export default SignupModal;
