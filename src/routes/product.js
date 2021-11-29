const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.post('/add-product', productController.addProduct)
router.post('/add-to-cart', productController.addToCart)
router.use('/', productController.index);

module.exports = router;