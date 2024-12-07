const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.render('users', { title: 'Users', users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

router.post('/add', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });
    await newUser.save();
    console.log('User added:', newUser);
    res.redirect('/users');
  } catch (err) {
    console.log(req.body);
    console.error('Error adding user:', err);
    res.redirect('/users')
    // res.status(500).send('Error adding user');
  }
});

module.exports = router;
