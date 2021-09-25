const express = require('express');
const router = express.Router();

const home1Controller = require('../app/controllers/Home1Controller');

router.use('/', home1Controller.index);

module.exports = router;