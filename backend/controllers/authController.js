const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const { email, password } = req.body;

  // ✅ 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // ✅ 2. Check if user already exists
    findUserByEmail(email, async (err, existingUser) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (existingUser) return res.status(400).json({ error: 'User already exists' });

      // ✅ 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ 4. Save new user
      createUser(email, hashedPassword, (err, userId) => {
        if (err) return res.status(500).json({ error: 'User creation failed' });

        // ✅ 5. Generate token
        const token = jwt.sign(
          { userId, email },
          process.env.JWT_SECRET, // Make sure .env has this key!
          { expiresIn: '2h' }
        );

        return res.status(201).json({ message: 'User created', token });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  findUserByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ message: 'Login successful', token });
  });
};

module.exports = { signup, login };
