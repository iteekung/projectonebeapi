const sql = require('../db.js');

const table = 'test';

// constructor
const Test = function(subject) {
    this.sub_id = subject.sub_id;
    this.room_id = subject.room_id;
    this.date_test = subject.date_test;
    this.time_test = subject.time_test;
}

Test.create = (newTest, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newTest, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newTest});
    });
}

Test.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Test.getAll = result => {
    sql.query(`SELECT test.id, subject.sub_id, subject.sub_thai, rooms.id as room_id, rooms.room_id as room_name, rooms.building, test.date_test, test.time_test FROM ${table} INNER Join subject ON subject.sub_id = test.sub_id Join rooms ON rooms.id = test.room_id GROUP BY test.id`, (err, res) => {
        if(err) throw err
        result(null, res);
    });
}

Test.updateById = (id, test, result) => {
    sql.query("UPDATE " + table +" SET sub_id = ?, room_id = ?, date_test = ?, time_test = ? WHERE id = ?", 
    [test.sub_id, test.room_id, test.date_test, test.time_test, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...test});
    })
}

Test.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = Test;