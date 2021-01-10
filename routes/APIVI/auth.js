const express = require('express');
const router = express.Router();

const { login, register } = require('../../controllers/authController');
const validBody = require('../../middleware/validBody');

router.post('/login',validBody('loginUser'), login);

router.post('/register',validBody('createUser'), register);

module.exports = router;
