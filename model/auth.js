const sql = require('../db.js');
var md5 = require('md5');

const table = 'admin';

const auth = function(login) {
    id = this.id,
    username = this.username,
    password = this.password
}

auth.login = (username, password, result) => {
    sql.query("SELECT * FROM " + table + " WHERE username = '" + username + "'", (err, res) => {
        if(err) throw err
        if(res[0]) {
            if(res[0]['password'] === md5(password)) {
                result(null, res[0]);
            }else {
                result(null, {status: 'login fail', messages: "username password wrong."});
            }
        }else {
            result(null, {status: 'login fail', messages: "no this user."});
        }
    });
}


module.exports = auth;