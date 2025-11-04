const express = require('express');
const router = express.Router();

const authcontroller = require('../controller/authcontroller');
const { authuser, authorizeRoles } = require('../middlewear/auth');

// Register
router.post('/register', authcontroller.createuser);

// Login
router.post('/login', authcontroller.loginUser);

// Logout
router.post('/logout', authcontroller.logoutuser);

module.exports = router;