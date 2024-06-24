const express = require('express');
const product = require('../model/productModel');
const config = require('../common/config.json');
const jwt = require('jsonwebtoken');
// const Authorize = require('../common/tokenValidator');
const enums = require('../common/enum');
const log = require('../model/logModel');
var router = express.Router();
// router.use(Authorize); // check is validate token

var fileName = __filename.slice(__dirname.length + 1);
// fileName = fileName.slice(0, -3);

// add new product
router.post('/', async (req, res) => {
    // const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var result = await product.Product_Save(req.body);
        res.status(200).json("OK");
        log.logInfo(enums.logLevel.Info, 'Product Save', JSON.stringify(req.body), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product Save', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

// get all products
router.get('/all', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var result = await product.productAll_Get();
        res.json(result);
        log.logInfo(enums.logLevel.Info, 'Product All Get', '', fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product All Get', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

// get product by id
router.get('/:productId', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var result = await product.singleProduct_Get(req.params.productId);
        res.json(result);
        log.logInfo(enums.logLevel.Info, 'Product Get By ID', JSON.stringify(req.params), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product Get By ID', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

// update new product
router.put('', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        var result = await product.Product_update(req.body);
        res.status(200).json("OK");
        log.logInfo(enums.logLevel.Info, 'Product Update', JSON.stringify(req.body), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product Update', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

// get product by id
router.delete('/:productId', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var result = await product.Product_Delete(req.params.productId);
        res.json(result);
        log.logInfo(enums.logLevel.Info, 'Product Delete', JSON.stringify(req.params), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Product Delete', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});
module.exports = router;