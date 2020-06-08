'user strict';

const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '188.166.212.218',
    user: 'bebie',
    password: 'passwordbebie',
    database: 'bebie'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;