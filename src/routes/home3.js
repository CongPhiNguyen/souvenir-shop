const express = require('express');
const router = express.Router();

const home3Controller = require('../app/controllers/Home3Controller');

router.use('/', home3Controller.index);

module.exports = router;