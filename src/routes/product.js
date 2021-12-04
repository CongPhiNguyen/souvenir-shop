const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.post('/add-product', productController.addProduct)
router.post('/update-product', productController.updateProduct)
router.post('/add-to-cart', productController.addToCart)
router.use('/add-product-view', productController.addProductView)
router.use('/update-product-view', productController.editProductView)
router.use('/', productController.index);

module.exports = router;