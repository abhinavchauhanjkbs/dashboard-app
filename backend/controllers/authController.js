const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

// 🔐 Signup Handler
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    findUserByEmail(email, async (err, existingUser) => {
      if (err) {
        console.error('❌ DB error during lookup:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (existingUser) {
        console.warn('⚠️ User already exists:', email);
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      createUser(email, hashedPassword, (err, userId) => {
        if (err) {
          console.error('❌ Error creating user:', err.message);
          return res.status(500).json({ error: 'User creation failed' });
        }

        const token = jwt.sign(
          { userId, email },
          process.env.JWT_SECRET,
          { expiresIn: '2h' }
        );

        console.log('✅ User registered successfully:', email);
        return res.status(201).json({ message: 'User created', token });
      });
    });
  } catch (err) {
    console.error('❌ Server error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// 🔑 Login Handler
const login = (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login request received:", email);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  findUserByEmail(email, async (err, user) => {
    if (err) {
      console.error('❌ Error during login DB lookup:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      console.warn('❌ Login failed - user not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('❌ Invalid credentials for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login successful for:', email);
    return res.status(200).json({ message: 'Login successful', token });
  });
};

module.exports = { signup, login };
