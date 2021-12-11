const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');
const { requireAuth, requireAuth1 } = require('../app/middleware/AuthMiddleware');
router.get('/home', homeController.index);
router.get('/', homeController.renderHome);
module.exports = router;