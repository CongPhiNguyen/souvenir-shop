const res = require("express/lib/response");
const { json } = require("express/lib/response");
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Receipt = require('../models/receipt');

module.exports.profile_get = (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            // res.render('adminProfile');
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
                var updateUser = await User.findById(req.session.user._id);
                updateUser.name = newName;
                updateUser.phone = newPhone;
                updateUser.mail = newEmail;
                updateUser.address = newAddress;
                updateUser.save().then(result => {
                    res.locals.user = updateUser;
                    req.session.user = updateUser;
                    res.json({ info: { newName, newEmail, newPhone, newAddress } });
                });
            }
            else {
                console.log('update user with updating password');
                var updateUser = await User.findById(req.session.user._id);
                const auth = await bcrypt.compare(oldPassword, updateUser.password);
                if (auth) {
                    updateUser.name = newName;
                    updateUser.phone = newPhone;
                    updateUser.mail = newEmail;
                    updateUser.address = newAddress;
                    const salt = await bcrypt.genSalt();
                    updateUser.password = await bcrypt.hash(newPassword, salt);
                    updateUser.save().then(result => {
                        res.locals.user = updateUser;
                        req.session.user = updateUser;
                        res.json({ info: { newName, newEmail, newPhone, newAddress } });
                    });
                }
                else {
                    res.json({ error: { password: 'Incorrect Password' } });
                }
            }
        }
        catch(err) {
            console.log('account post profile error');
            console.log(err);
        }
    }
    else {
        console.log('req.session.user null');
        res.render('404NotFound');
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
            catch(err) {
                console.log('account get receipt error');
                console.log(err);
            }
        }
    }
    else res.render('404NotFound');
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
    catch(err) {
        console.log('account receipt detail error');
        console.log(err);
    }
}