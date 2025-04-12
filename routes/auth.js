const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');

// Route đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra xem người dùng đã tồn tại chưa
  const userExists = await User.findOne({ email });
  if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
  }

  try {
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Lưu người dùng vào cơ sở dữ liệu
      const user = new User({
          username,
          email,
          password: hashedPassword
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

// Route đăng nhập người dùng
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // So sánh mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Tạo JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;