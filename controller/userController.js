const express = require('express');
const user = require('../model/userModel');
const bcryptjs = require('bcryptjs');
const log = require('../model/logModel');
const enums = require('../common/enum');
const email = require('../common/email');
const config = require('../common/config.json');
const router = express.Router();

var fileName = __filename.slice(__dirname.length + 1);

router.post('', async (req, res) => {
    try {
        var salt = bcryptjs.genSaltSync(10);
        var password = req.body.password; // for sending email
        req.body.password = bcryptjs.hashSync(req.body.password, salt); //10
        await user.addUser(req.body);
        await email.sendEmail(req.body.username, 'User Created', '<h4><u>User Account Created</u></h4><p>Username: ' + '<b>' + req.body.username + '</b><br>Password: ' + '<b>' + password + '</b></p><p>' + config.emailFooter + '</p>');
        res.status(200).json("OK");
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in User Save', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

module.exports = router;
