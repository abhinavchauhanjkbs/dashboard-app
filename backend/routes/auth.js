const BASE_URL = 'https://dashboard-backend-7z7f1.onrender.com'; // ✅ Render backend URL

// Signup API
export const signup = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Signup API error:', error);
    return { success: false, message: 'Unable to connect to the server.' };
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, message: 'Unable to connect to the server.' };
  }
};
