const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');
router.get('/:id',homeController.get404);
router.get('/home', homeController.index);
router.get('/', homeController.renderHome);
module.exports = router;