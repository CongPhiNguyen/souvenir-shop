const res = require("express/lib/response");
const { json } = require("express/lib/response");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Receipt = require('../models/receipt');

module.exports.profile_get = (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            res.render('adminProfile');
        }
        else {
            res.render('accountProfile');
        }
    }
    else res.render('404NotFound');
}

module.exports.profile_post = async (req, res) => {
    const { newName, newEmail, newPhone, newAddress, oldPassword, newPassword } = req.body;
    if (req.session.user) {
        try {
            if (oldPassword === '' || newPassword === '') {
                console.log('update user without updating password');
                // var updateUser = await User.findById(req.session.user._id);
                // updateUser.name = newName;
                // updateUser.phone = newPhone;
                // updateUser.mail = newEmail;
                // updateUser.address = newAddress;
                // updateUser.save({ runValidators: true, context: 'query' }).then(result => {
                //     res.locals.user = updateUser;
                //     req.session.user = updateUser;
                //     res.json({ info: { newName, newEmail, newPhone, newAddress } });
                // });

                await User.findOneAndUpdate(
                    { userCode: req.session.user.userCode },
                    { name: newName, phone: newPhone, mail: newEmail, address: newAddress },
                    { runValidators: true, context: 'query' },
                ).then(result => {
                    res.locals.user = result;
                    req.session.user = result;
                    res.json({ info: { newName, newEmail, newPhone, newAddress } });
                });
            }
            else {
                console.log('update user with updating password');
                // var updateUser = await User.findById(req.session.user._id);
                const auth = await bcrypt.compare(oldPassword, req.session.user.password);
                if (auth) {
                    // updateUser.name = newName;
                    // updateUser.phone = newPhone;
                    // updateUser.mail = newEmail;
                    // updateUser.address = newAddress;
                    // const salt = await bcrypt.genSalt();
                    // updateUser.password = await bcrypt.hash(newPassword, salt);
                    // updateUser.save().then(result => {
                    //     res.locals.user = updateUser;
                    //     req.session.user = updateUser;
                    //     res.json({ info: { newName, newEmail, newPhone, newAddress } });
                    // });
                    const salt = await bcrypt.genSalt();
                    const encryptedPassword = await bcrypt.hash(newPassword, salt);
                    await User.findOneAndUpdate(
                        { userCode: req.session.user.userCode },
                        { name: newName, phone: newPhone, mail: newEmail, address: newAddress, password: encryptedPassword },
                        { runValidators: true, context: 'query' },
                    ).then(result => {
                        res.locals.user = result;
                        req.session.user = result;
                        res.json({ info: { newName, newEmail, newPhone, newAddress } });
                    });

                }
                else {
                    res.json({ error: { password: 'Incorrect Password' } });
                }
            }
        }
        catch (err) {
            console.log('account post profile error');
            console.log(err);
        }
    }
    else {
        console.log('req.session.user null');
        res.render('404NotFound');
    }
}

module.exports.customer_get = (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            res.render('adminCustomer');
        }
        else {
            res.render('404NotFound');
        }
    }
    else res.render('404NotFound');
}

module.exports.adminCustomerList_post = async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            try {
                const { customerCodeSearch, customerNameSearch, customerPhoneSearch, customerMailSearch } = req.body;
                console.log(customerCodeSearch);
                console.log(customerNameSearch);
                console.log(customerPhoneSearch);
                console.log(customerMailSearch);

                var customerList = [];
                if (customerCodeSearch === '' && customerNameSearch === '' && customerPhoneSearch === '' && customerMailSearch === '') {
                    console.log('get all customers');
                    customerList = await User.find({ role: 'customer' });
                }
                else if (customerCodeSearch !== '') {
                    console.log('search by customer code');
                    customerList = await User.find({ role: 'customer', userCode: customerCodeSearch });
                }
                else if (customerNameSearch !== '') {
                    console.log('search by customer name');
                    customerList = await User.find({ role: 'customer', name: customerNameSearch });
                }
                else if (customerPhoneSearch !== '') {
                    console.log('search by customer phone');
                    customerList = await User.find({ role: 'customer', phone: customerPhoneSearch });
                }
                else if (customerMailSearch !== '') {
                    console.log('search by customer mail');
                    customerList = await User.find({ role: 'customer', mail: customerMailSearch });
                }

                if (customerList) {
                    console.log(customerList);
                    res.json({ customerList: customerList });
                }
                else {
                    console.log('admin customerList null');
                }
            }
            catch(err) {
                console.log('admin customer list post error');
                console.log(err);
            }
        }
        else {
            console.log('customerList post not authorized');
        }
    }
    else {
        console.log('user not log in');
    }
}

module.exports.adminDeleteCustomer_post = async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            try {
                const { userCodeToDelete } = req.body;
                const result = await User.deleteOne({ userCode: userCodeToDelete });
                if (result) {
                    console.log('delete successful');
                    console.log(result);
                    res.json({ status: 200 });
                }
                else {
                    console.log('delete fail');
                    res.json({ status: 400, error: 'delete return null' });
                }
            }
            catch(err) {
                console.log('admin customer delete post error');
                console.log(err);
                res.json({ status: 400, error: 'delete customer error' });
            }
        }
        else {
            console.log('customer delete post not authorized');
            res.json({ status: 400, error: 'user not authorized' });
        }
    }
    else {
        console.log('user not log in');
        res.json({ status: 400, error: 'user not log in' });
    }
}

module.exports.receipt_get = async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            res.render('adminReceipt');
        }
        else {
            try {
                const receiptList = await Receipt.find({ userCode: req.session.user.userCode }).sort({ createdAt: -1 }).lean();
                if (receiptList) {
                    console.log(receiptList);
                    res.render('accountReceipt', { receipts: receiptList });
                }
                else {
                    console.log('account receiptList null');
                }
            }
            catch (err) {
                console.log('account get receipt error');
                console.log(err);
            }
        }
    }
    else res.render('404NotFound');
}

module.exports.adminOrderList_post = async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            try {
                const { orderCodeSearch, orderCustomerCodeSearch, orderCustomerNameSearch, orderStatusSearch, orderFromDaySearch, orderToDaySearch } = req.body;
                console.log(orderCodeSearch);
                console.log(orderCustomerCodeSearch);
                console.log(orderCustomerNameSearch);
                console.log(orderStatusSearch);
                console.log(orderFromDaySearch);
                console.log(orderToDaySearch);
                var orderList = [];
                if (orderCodeSearch === '' && orderCustomerCodeSearch === '' && orderCustomerNameSearch === '' && orderStatusSearch === 'Tất cả' && orderFromDaySearch === '' && orderToDaySearch === '') {
                    console.log('get all orders');
                    // console.log('get all orders in last 30 days');
                    // var currentDate = Date.now();
                    // currentDate = new Date(currentDate);
                    // console.log(currentDate);
                    // var fromDate = currentDate;
                    // fromDate.setDate(fromDate.getDate() - 29);
                    // fromDate.setHours(0, 0, 0);
                    // fromDate = new Date(fromDate);
                    // console.log(fromDate);
                    orderList = await Receipt.find({ }).sort({ createdAt: -1 });
                }
                else if (orderCodeSearch !== '') {
                    console.log('search by order code');
                    orderList = await Receipt.find({ orderCode: orderCodeSearch }).sort({ createdAt: -1 });
                }
                else if (orderCustomerCodeSearch !== '') {
                    if (orderStatusSearch !== 'Tất cả') {
                        if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                            console.log('search by customer code, order status, from date and to date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderFromDaySearch !== '') {
                            console.log('search by customer code, order status, from date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderToDaySearch !== '') {
                            console.log('search by customer code, order status, to date');
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, deliveryStatus: orderStatusSearch, createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else {
                            console.log('search by customer code, order status');
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, deliveryStatus: orderStatusSearch }).sort({ createdAt: -1 });
                        }
                    }
                    else {
                        if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                            console.log('search by customer code, from date and to date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderFromDaySearch !== '') {
                            console.log('search by customer code, from date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderToDaySearch !== '') {
                            console.log('search by customer code, to date');
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch, createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else {
                            console.log('search by customer code');
                            orderList = await Receipt.find({ userCode: orderCustomerCodeSearch }).sort({ createdAt: -1 });
                        }
                    }
                }
                else if (orderCustomerNameSearch !== '') {
                    if (orderStatusSearch !== 'Tất cả') {
                        if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                            console.log('search by customer name, order status, from date and to date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderFromDaySearch !== '') {
                            console.log('search by customer name, order status, from date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderToDaySearch !== '') {
                            console.log('search by customer name, order status, to date');
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, deliveryStatus: orderStatusSearch, createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else {
                            console.log('search by customer name, order status');
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, deliveryStatus: orderStatusSearch }).sort({ createdAt: -1 });
                        }
                    }
                    else {
                        if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                            console.log('search by customer name, from date and to date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderFromDaySearch !== '') {
                            console.log('search by customer name, from date');
                            var fromDate = new Date(orderFromDaySearch);
                            fromDate = fromDate.setHours(fromDate.getHours() - 7);
                            fromDate = new Date(fromDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                        }
                        else if (orderToDaySearch !== '') {
                            console.log('search by customer name, to date');
                            var toDate = new Date(orderToDaySearch);
                            toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                            toDate = new Date(toDate);
                            orderList = await Receipt.find({ name: orderCustomerNameSearch, createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                        }
                        else {
                            console.log('search by customer name');
                            orderList = await Receipt.find({ name: orderCustomerNameSearch }).sort({ createdAt: -1 });
                        }
                    }
                }
                else if (orderStatusSearch !== 'Tất cả') {
                    if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                        console.log('search by order status, from date and to date');
                        var fromDate = new Date(orderFromDaySearch);
                        fromDate = fromDate.setHours(fromDate.getHours() - 7);
                        fromDate = new Date(fromDate);
                        var toDate = new Date(orderToDaySearch);
                        toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                        toDate = new Date(toDate);
                        orderList = await Receipt.find({ deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                    }
                    else if (orderFromDaySearch !== '') {
                        console.log('search by order status, from date');
                        var fromDate = new Date(orderFromDaySearch);
                        fromDate = fromDate.setHours(fromDate.getHours() - 7);
                        fromDate = new Date(fromDate);
                        orderList = await Receipt.find({ deliveryStatus: orderStatusSearch, createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                    }
                    else if (orderToDaySearch !== '') {
                        console.log('search by order status, to date');
                        var toDate = new Date(orderToDaySearch);
                        toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                        toDate = new Date(toDate);
                        orderList = await Receipt.find({ deliveryStatus: orderStatusSearch, createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                    }
                    else {
                        console.log('search by order status');
                        orderList = await Receipt.find({ deliveryStatus: orderStatusSearch }).sort({ createdAt: -1 });
                    }
                }
                else if (orderFromDaySearch !== '' && orderToDaySearch !== '') {
                    console.log('search by from date and to date');
                    var fromDate = new Date(orderFromDaySearch);
                    fromDate = fromDate.setHours(fromDate.getHours() - 7);
                    fromDate = new Date(fromDate);
                    var toDate = new Date(orderToDaySearch);
                    toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                    toDate = new Date(toDate);
                    console.log(fromDate);
                    console.log(toDate);
                    orderList = await Receipt.find({ createdAt: { $gte: fromDate, $lte: toDate } }).sort({ createdAt: -1 });
                }
                else if (orderFromDaySearch !== '') {
                    console.log('search by from date');
                    var fromDate = new Date(orderFromDaySearch);
                    fromDate = fromDate.setHours(fromDate.getHours() - 7);
                    fromDate = new Date(fromDate);
                    orderList = await Receipt.find({ createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
                }
                else if (orderToDaySearch !== '') {
                    console.log('search by to date');
                    var toDate = new Date(orderToDaySearch);
                    toDate = toDate.setHours(toDate.getHours() - 7 + 24);
                    toDate = new Date(toDate);
                    orderList = await Receipt.find({ createdAt: { $lte: toDate } }).sort({ createdAt: -1 });
                }

                if (orderList) {
                    console.log(orderList);
                    res.status(200).json({ orderList: orderList });
                }
                else {
                    console.log('admin orderList null');
                    res.status(400).json({ error: 'orderList null' });
                }
            }
            catch(err) {
                console.log('admin post orderList error');
                console.log(err);
                res.status(400).json({ error: err });
            }
        }
        else {
            console.log('orderList post not authorized');
            res.status(400).json({ error: 'user not authorized' });
        }
    }
    else {
        console.log('user not log in');
        res.status(400).json({ error: 'user not log in' });
    }
}

module.exports.adminUpdateOrderStatus_post = async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            try {
                const { orderCode, orderStatus } = req.body;
                await Receipt.findOneAndUpdate(
                    { receiptId: orderCode },
                    { deliveryStatus: orderStatus },
                    { runValidators: true, context: 'query' },
                ).then(result => {
                    console.log('update order status successful');
                    res.status(200).json({ updatedOrder: { orderCode, orderStatus } });
                });
            }
            catch(err) {
                console.log('admin update order status error');
                console.log(err);
                res.status(400).json({ error: err });
            }
        }
        else {
            console.log('update order status post not authorized');
            res.status(400).json({ error: 'user not authorized' });
        }
    }
    else {
        console.log('user not log in');
        res.status(400).json({ error: 'user not log in' });
    }
}

module.exports.receiptDetail_get = async (req, res) => {
    console.log('receipt code: ', req.params.code);
    try {
        const receipt = await Receipt.findOne({ receiptId: req.params.code }).lean();
        if (receipt) {
            console.log(receipt);
            if (receipt.userCode === req.session.user.userCode) {
                res.render('accountReceiptDetail', { receipt: receipt });
            }
            else {
                res.render('404NotFound');
            }
        }
        else {
            console.log('account receipt detail null');
        }
    }
    catch (err) {
        console.log('account receipt detail error');
        console.log(err);
    }
}

module.exports.profileStatistic = async (req, res) => {
    try {
        console.log(req.session.user);
        res.render('adminStatistic', { user: req.session.user })
    }
    catch (err) {
        console.log('account receipt detail error');
        console.log(err);
    }
}

module.exports.getAllReceipt = async (req, res) => {
    try {
        const receipts = await  Receipt.find({}).lean();
        if(receipts) {
            console.log(receipts)
            res.status(201).send(
                JSON.stringify({
                    status: 201,
                    receipts: receipts,
                })
            );
        } else {
            res.status(401).send(
                JSON.stringify({
                    message: "Lỗi kết nối",
                })
            );
        }
    }
    catch (err) {
        console.log('account receipt detail error');
        console.log(err);
    }
}