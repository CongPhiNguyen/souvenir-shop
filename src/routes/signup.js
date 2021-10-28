const express = require('express');
const SignUpController = require('../app/controllers/SignUpController.js');
const router = express.Router();

router.get('/', SignUpController.index);
router.post('/', SignUpController.signup);

module.exports = router;