const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');
const { requireAuth, requireAuth1 } = require('../app/middleware/AuthMiddleware');


router.get('/get-data-user', requireAuth1 ,CartController.getDataUser);
router.post('/update-cart-user', CartController.updateCartUser);
router.post('/delete-product-from-cart' , CartController.deleteProductFromCart)
router.post('/add-product-to-cart', CartController.addProductToCart)
router.post('/get-cart-user', CartController.getCartUser)
router.post('/get-coupon',CartController.getCoupon)
router.post('/create-receipt', requireAuth ,CartController.createReceipt)
router.post('/check-voucher', CartController.checkVoucher)
router.get('/return-policy', CartController.getReturnPolicy)
router.get('/:id', CartController.get404)
router.get('/' , requireAuth ,CartController.getCart);

module.exports = router;