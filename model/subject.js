const sql = require('../db.js');

const table = 'subject';

// constructor
const Subject = function(subject) {
    this.sub_id = subject.sub_id;
    this.sub_eng = subject.sub_eng;
    this.sub_thai = subject.sub_thai;
    this.sub_credit = subject.sub_credit;

}

Subject.create = (newSubject, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newSubject, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newSubject});
    });
}

Subject.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Subject.getAll = result => {
    sql.query(`SELECT * FROM ${table} `, (err, res) => {
        if(err) throw err
        result(null, res);
    });
}

Subject.updateById = (id, subject, result) => {
    sql.query("UPDATE " + table +" SET sub_id = ?, sub_eng = ?, sub_thai = ?, sub_credit = ? WHERE id = ?", 
    [subject.sub_id, subject.sub_eng, subject.sub_thai, subject.sub_credit, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...subject});
    })
}

Subject.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = Subject;