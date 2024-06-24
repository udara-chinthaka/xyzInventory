const express = require('express');
const login = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const config = require('../common/config.json');
const session = require('../common/session');
const log = require('../model/logModel');
const enums = require('../common/enum');
const router = express.Router();

var fileName = __filename.slice(__dirname.length + 1);
// fileName = fileName.slice(0, -3);

router.post('', async (req, res) => {
    const { username, password } = req.body;
    const userModel = {
        username,
        password
    }

    try {
        const userID = await login.getUser(userModel);
        var userModelForToken = {
            username,
            userID
        }
        if (userID != "") {
            const token = jwt.sign(userModelForToken, config.secret, { expiresIn: config.tokenLife });
            const response = {
                "token": token,
                "tokenLife": config.tokenLife
            }
            session.updateSessionToken(userModel.username, token); // update session token
            res.status(200).json(response);
            log.logInfo(enums.logLevel.Info, 'Login', JSON.stringify(req.body), fileName, userModel.username);
        } else {
            res.status(401).json("Invalid token");
        }
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product Save', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

module.exports = router;