const express = require('express');
const order = require('../model/orderModel');
const config = require('../common/config.json');
const jwt = require('jsonwebtoken');
const Authorize = require('../common/tokenValidator');
const asyncForEach = require('async-await-foreach');
const log = require('../model/logModel');
const enums = require('../common/enum');
var router = express.Router();
router.use(Authorize); // check is validate token

var fileName = __filename.slice(__dirname.length + 1);
fileName = fileName.slice(0, -3);

// save order
router.post('', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var { userId, note, status, orderDetail } = req.body;
        const orderModel = {
            userId,
            note,
            status,
            orderDetail
        }
        var result = await order.orderSave(orderModel);
        // async for each loop
        await asyncForEach(orderModel.orderDetail, async orderDetail => {
            var orderDetailId = await order.orderDetailSave(result.OrderId, orderDetail);
            await asyncForEach(orderDetail.orderDeliveryDetail, async deliveryDetail => {
                await order.orderDeliveryDetailSave(orderDetailId.orderDetailId, deliveryDetail);
            });
        })
        res.status(200).json("OK");
        log.logInfo(enums.logLevel.Info, 'Order Save', JSON.stringify(req.body), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Order Save', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});

// get order by order id
router.get('/:orderId', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret); // get logged in user details
    try {
        var orderID = req.params.orderId;
        var orderInfo = await order.orderGet(orderID);
        var orderDetailInfo = await order.orderDetailGet(orderID);
        var orderPayLoad = {
            orderId: orderInfo.orderId,
            fullName: orderInfo.fullName,
            note: orderInfo.note,
            status: orderInfo.status,
            orderDetail: orderDetailInfo
        }
        await asyncForEach(orderDetailInfo, async element => {
            var deliveryInfo = await order.orderDeliveryGet(element.orderDetailId);
            element.orderDeliveryDetail = deliveryInfo;
        })
        res.json(orderPayLoad);
        log.logInfo(enums.logLevel.Info, 'Order Get By ID', JSON.stringify(req.params), fileName, userModel.username);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, 'Error in Order Get By ID', 'Error: ' + error + JSON.stringify(req.body), fileName, userModel.username);
        res.status(403).json("Error occurred");
    }
});
module.exports = router;