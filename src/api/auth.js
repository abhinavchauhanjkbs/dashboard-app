const BASE_URL = 'https://dashboard-backend-7z7f1.onrender.com'; // ✅ Correct deployed backend

export const signup = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Signup failed: ${error}`);
  }

  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Login failed: ${error}`);
  }

  return res.json();
};
