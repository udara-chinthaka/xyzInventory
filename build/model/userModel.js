var sql = require('../common/db');
var data = {};

// add new user
data.addUser = async function (userModel) {
    return new Promise((resolve, rejects) => {
        var parameters = [userModel.firstName, userModel.lastName, userModel.username, userModel.password];
        var sql_query = "SET @FirstName=?, @LastName=?, @Username=?, @Password=?; call usp_Save_User(@FirstName,@LastName,@Username,@Password)";
        sql.query(sql_query, parameters, (err, res) => {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = data;