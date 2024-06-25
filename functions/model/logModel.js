'user strict'
var sql = require('../common/db.js');
const config = require('../common/config.json');

var data = {};

data.logInfo = async function (level, source, content, file, username) {
    return new Promise((resolve, rejects) => {
        var params = [level, source, content, file, username];
        var sql_query = "SET @LogLevel=?, @LogSource=?, @Content=?, @File=?, @Username=?; CALL usp_Save_LogInfo(@LogLevel, @LogSource, @Content, @File, @Username);";
        sql.query(sql_query, params, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        });
    })
}

module.exports = data;