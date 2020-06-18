const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Register a user
// @access  Public
router.get('/', (req, res) => {
    res.send('Register a user');
});

module.exports = router;