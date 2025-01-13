const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');  // For JWT token handling
const router = express.Router();

// Create a new user (Signup)
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password, 
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login (without password hashing for demo)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (password !== user.password) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Generate a JWT token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Token Validation Endpoint
router.get('/session/validate', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_jwt_secret', (err) => {
      if (err) {
        return res.status(401).json({ valid: false });
      }
      res.status(200).json({ valid: true });
    });
  } catch (error) {
    console.error('Error validating session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST route for creating/updating reader profile
router.post('/reader/profile', async (req, res) => {
  const { userId, profileDetails } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profile = profileDetails;
    await user.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update user information
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
