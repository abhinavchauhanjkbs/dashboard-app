const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  findUserByEmail(email, (err, user) => {
    if (user) return res.status(400).json({ message: 'User already exists' });

    createUser(email, hashedPassword, (err, userId) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User created', userId });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, user) => {
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.status(200).json({ message: 'Login successful', token });
  });
};

module.exports = { signup, login };