const express = require('express');
const router = express.Router();

const { login, register } = require('../../controllers/authController');
const validBody = require('../../middleware/validBody');


// POST /login
router.post('/login',validBody('loginUser'), login);

// POST /register
router.post('/register',validBody('createUser'), register);

module.exports = router;
