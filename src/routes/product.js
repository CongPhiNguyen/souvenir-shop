const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/search', productController.searchProduct);
router.post('/add-product', productController.addProduct)
router.get('/get-product', productController.getProduct)
router.post('/update-product', productController.updateProduct)
router.post('/add-to-cart', productController.addToCart)
router.use('/add-product-view', productController.addProductView)
router.use('/update-product-view/', productController.editProductView)
router.use('/update-product-view', productController.editProductView)
router.use('/manager-view', productController.viewProductView)
router.use('/view-product/', productController.viewProductCustomer)
router.post('/location', productController.addLocation);
router.get('/location', productController.getLocation);
router.use('/', productController.index);

module.exports = router;