// routes/users-routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/');

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// app.get('/register', (req, res) => {
//   res.render('register')
// })

router.get('/register', (req, res) => {
  res.render('register');
})

router.get('/profile/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  });

  router.put('/update/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        // Update fields
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = await bcrypt.hash(req.body.password, 10);
        }
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to update user' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

module.exports = router;