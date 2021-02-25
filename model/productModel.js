const sql = require('../common/db');

var data = {}

// save a product
data.Product_Save = async function (productModel) {
    return new Promise((resolve, rejects) => {
        var parameters = [productModel.name, productModel.description, productModel.productTypeId, productModel.cost, productModel.status];
        var sql_query = "SET @ProductName=?, @Description=?, @ProductTypeID=?, @Cost=?, @Status=?; CALL usp_Save_Product(@ProductName,@Description,@ProductTypeID,@Cost,@Status);";
        sql.query(sql_query, parameters, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve("OK");
            }
        });
    });
};

data.productAll_Get = async function () {
    return new Promise((resolve, rejects) => {
        var sql_query = "CALL usp_Get_Product_All()";
        sql.query(sql_query, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve(res[0]);
            }
        });
    });
}

data.singleProduct_Get = async function (productId) {
    return new Promise((resolve, rejects) => {
        var sql_query = "SET @ProductID=?; CALL usp_Get_Single_Product(@ProductID);";
        sql.query(sql_query, productId, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve(res[1][0]);
            }
        });
    });
}

data.Product_update = async function (productModel) {
    return new Promise((resolve, rejects) => {
        var parameters = [productModel.id, productModel.name, productModel.description, productModel.productTypeId, productModel.cost, productModel.status];
        var sql_query = "SET @ProductID=?, @ProductName=?, @Description=?, @ProductTypeID=?, @Cost=?, @Status=?; CALL usp_Update_Product(@ProductID,@ProductName,@Description,@ProductTypeID,@Cost,@Status);";
        sql.query(sql_query, parameters, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve("OK");
            }
        });

    });
}

data.Product_Delete = async function (productId) {
    return new Promise((resolve, rejects) => {
        var sql_query = "SET @ProductID=?; CALL usp_Delete_Product(@ProductID)";
        sql.query(sql_query, productId, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve("OK");
            }
        });
    });
}
module.exports = data;