const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/login', userController.login);
router.get('/auth', userController.auth);

module.exports = router;