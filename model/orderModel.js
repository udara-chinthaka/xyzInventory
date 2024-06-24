const sql = require("../common/db");

var data = {};
// save order
data.orderSave = async function (orderModel) {
  return new Promise((resolve, rejects) => {
    var parameters = [orderModel.userId, orderModel.note, orderModel.status];
    var sql_query =
      "SET @UserID=?, @Note=?, @Status=?; CALL usp_Save_Order(@UserID,@Note,@Status);";
    sql.query(sql_query, parameters, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve(res[1][0]);
      }
    });
  });
};

data.orderDetailSave = async function (orderId, orderDetailModel) {
  return new Promise((resolve, rejects) => {
    var parameters = [
      orderId,
      orderDetailModel.productId,
      orderDetailModel.quantity,
    ];
    var sql_query =
      "SET @OrderID=?, @ProductID=?, @Qty=?; CALL usp_Save_Order_Detail(@OrderID,@ProductID,@Qty);";
    sql.query(sql_query, parameters, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve(res[1][0]);
      }
    });
  });
};

data.orderDeliveryDetailSave = async function (
  orderDetailId,
  orderDeliveryModel
) {
  return new Promise((resolve, rejects) => {
    var parameters = [
      orderDetailId,
      orderDeliveryModel.address,
      orderDeliveryModel.contact,
    ];
    var sql_query =
      "SET @OrderDetailID=?, @Address=?, @Contact=?; CALL usp_Save_Order_Delivery_Detail(@OrderDetailID, @Address, @Contact);";
    sql.query(sql_query, parameters, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve();
      }
    });
  });
};
// end of save order

// get order
data.orderGet = async function (orderId) {
  return new Promise((resolve, rejects) => {
    var sql_query = "SET @OrderID=? ;CALL usp_Get_Order(@OrderID)";
    sql.query(sql_query, orderId, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve(res[1][0]);
      }
    });
  });
};

data.orderDetailGet = async function (orderId) {
  return new Promise((resolve, rejects) => {
    var sql_query = "SET @OrderID=?; CALL usp_Get_Order_Detail(@OrderID);";
    sql.query(sql_query, orderId, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve(res[1]);
      }
    });
  });
};

data.orderDeliveryGet = async function (orderDetailId) {
  return new Promise((resolve, rejects) => {
    var sql_query =
      "SET @OrderDetailID=?; CALL usp_Get_Order_Delivery_Detail(@OrderDetailID);";
    sql.query(sql_query, orderDetailId, (err, res) => {
      if (err) {
        rejects(err);
      } else {
        resolve(res[1]);
      }
    });
  });
};
//end of order get
module.exports = data;
