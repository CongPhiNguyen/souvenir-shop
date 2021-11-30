const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');

router.post('/update-cart-user', CartController.updateCartUser);
router.post('/delete-product-from-cart' , CartController.deleteProductFromCart)
router.post('/add-product-to-cart', CartController.addProductToCart)
router.post('/get-cart-user', CartController.getCartUser)
router.post('/get-coupon', CartController.getCoupon)
router.post('/create-receipt', CartController.createReceipt)
router.get('/return-policy', CartController.getReturnPolicy)
router.get('/', CartController.getCart);

module.exports = router;