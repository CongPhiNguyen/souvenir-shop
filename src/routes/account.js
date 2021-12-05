const express = require('express');
const router = express.Router();
const { requireAuth } = require('../app/middleware/AuthMiddleware');

const accountController = require('../app/controllers/AccountController');

router.get('/profile', requireAuth, accountController.profile_get);
router.post('/profile', requireAuth, accountController.profile_post);
// router.get('/customer', requireAuth, accountController.customer_get);
// router.post('/admin-get-customer', requireAuth, accountController.adminCustomerList_post);
// router.post('/admin-delete-customer', requireAuth, accountController.adminDeleteCustomer_post);
router.get('/receipt', requireAuth, accountController.receipt_get);
router.get('/get-order/:code', requireAuth, accountController.receiptDetail_get);
// router.post('/admin-get-order', requireAuth, accountController.adminOrderList_post);
// router.get('/make-order', requireAuth, accountController.makeOrder_get);
// router.get('/voucher', requireAuth, accountController.voucher_get);
router.get('/', requireAuth, accountController.profile_get);

module.exports = router;