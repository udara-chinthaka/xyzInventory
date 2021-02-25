'user strict';
var sql = require('../common/db.js');
const bcryptjs = require('bcryptjs');
var data = {};
data.getUser = function (userModel) {
    return new Promise((resolve, reject) => {
        var sp_query = "SET @Username = ?; CALL usp_Get_Hashed_Password(@Username);";    //sp_query has the hashed password
        sql.query(sp_query, userModel.username, (err, res) => {
            if (res != undefined) {
                if (res[1] != undefined && res[1][0] != undefined) {
                    if (bcryptjs.compareSync(userModel.password, res[1][0].Password)) {
                        resolve(res[1][0].ID);
                    }
                    else {
                        reject("Invalid Credentials");
                    }
                }
                else {
                    reject("Invalid Credentials");
                }
            }
            else {
                reject("Invalid Credentials");
            }
        });
    });
}
module.exports = data;