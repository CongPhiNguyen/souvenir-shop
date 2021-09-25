const express = require('express');
const router = express.Router();

const home2Controller = require('../app/controllers/Home2Controller');

router.use('/', home2Controller.index);

module.exports = router;