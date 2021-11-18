const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');

router.post('/raise-quantity', CartController.raiseQuantity);
router.post('/delete-product-from-cart' , CartController.deleteProductFromCart)
router.get('/return-policy', CartController.getReturnPolicy)
router.get('/', CartController.getCart);

module.exports = router;