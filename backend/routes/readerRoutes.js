const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Reader Profile Creation Endpoint
router.post('/profile', async (req, res) => {
    const { userId, profileDetails } = req.body;
  
    try {
      if (!userId || !profileDetails) {
        return res.status(400).json({ message: 'Missing required fields: userId or profileDetails' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.profile = profileDetails;
      await user.save();
  
      res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;