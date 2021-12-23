const express = require('express');
const router = express.Router();
const { requireAuth } = require('../app/middleware/AuthMiddleware');

const accountController = require('../app/controllers/AccountController');

router.get('/profile', requireAuth, accountController.profile_get);
router.post('/profile', requireAuth, accountController.profile_post);
router.post('/get-user-info', requireAuth, accountController.accountProfileInfo_post);
router.get('/customer', requireAuth, accountController.customer_get);
router.post('/admin-get-customer', requireAuth, accountController.adminCustomerList_post);
router.post('/admin-delete-customer', requireAuth, accountController.adminDeleteCustomer_post);
router.get('/receipt', requireAuth, accountController.receipt_get);
router.get('/get-order/:code', requireAuth, accountController.receiptDetail_get);
router.post('/admin-get-order', requireAuth, accountController.adminOrderList_post);
router.post('/admin-update-order-status', requireAuth, accountController.adminUpdateOrderStatus_post);
router.post('/admin-delete-order', requireAuth, accountController.adminDeleteOrder_post);
router.get('/contact', requireAuth, accountController.contact_get);
router.get('/voucher', requireAuth, accountController.voucher_get);
router.post('/admin-get-voucher', requireAuth, accountController.adminVoucherList_post);
router.post('/admin-create-voucher', requireAuth, accountController.adminCreateVoucher_post);
router.post('/admin-delete-voucher', requireAuth, accountController.adminDeleteVoucher_post);
router.get('/statistic', requireAuth, accountController.adminStatistic_get);
router.get('/get-all-receipt', requireAuth, accountController.getAllReceipt_get);
router.get('/', requireAuth, accountController.profile_get);
router.use('/', (req, res) => {
    res.render('404NotFound');
})

module.exports = router;