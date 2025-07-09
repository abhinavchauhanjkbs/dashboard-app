const BASE_URL = 'https://dashboard-backend-7z7f1.onrender.com'; // ✅ Use your backend Render URL

export const signup = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  } catch (err) {
    console.error('Signup API error:', err);
    return { success: false, message: 'Network error.' };
  }
};

export const login = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  } catch (err) {
    console.error('Login API error:', err);
    return { success: false, message: 'Network error.' };
  }
};
