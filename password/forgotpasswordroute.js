// routes/users.js
const express = require('express');
const router = express.Router();
const Password = require('../password/forgotpasswordmodel');
const nodemailer = require('nodemailer');


// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  // configure your email provider
});

// Generate a random token for password reset
const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Password.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = generateToken();
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Save the reset token and expiry in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email with reset link
    const resetLink = `http://your-frontend-app/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await Password.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Update the user's password and clear the reset token fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
