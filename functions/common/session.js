'user strict';
var sql = require('../common/db.js');
var data = {};

data.updateSessionToken = function (username, token) {
    return new Promise((resolve, reject) => {
        var params = [username, token];
        var sp_query = "SET @Username = ?,@Token = ?; CALL usp_Update_Session_Token (@Username,@Token);";
        sql.query(sp_query, params, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve("OK");
            }
        });
    });
};

module.exports = data;