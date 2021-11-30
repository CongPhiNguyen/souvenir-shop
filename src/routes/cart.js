const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');

router.post('/raise-quantity', CartController.raiseQuantity);
router.post('/delete-product-from-cart' , CartController.deleteProductFromCart)
router.post('/add-product-to-cart', CartController.addProductToCart)
router.post('/get-cart-user', CartController.getCartUser)
router.post('/get-coupon', CartController.getCoupon)
router.get('/return-policy', CartController.getReturnPolicy)
router.get('/', CartController.getCart);

module.exports = router;