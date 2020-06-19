const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Same as doing name: name, email: email etc
      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      // Gives us hash version of the password which we are then assigning to user object
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User saved');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')

    }
  }
);

module.exports = router;
