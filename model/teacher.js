const sql = require('../db.js');

const table = 'teacher';

// constructor
const Teacher = function(teacher) {
    this.teach_id = teacher.teach_id;
    this.teach_position = teacher.teach_position;
    this.teach_firstname = teacher.teach_firstname;
    this.teach_lastname = teacher.teach_lastname;
    this.major = teacher.major;
    this.email = teacher.email;
    this.tel = teacher.tel;
}

Teacher.create = (newTeacher, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newTeacher, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newTeacher});
    });
}

Teacher.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Teacher.getAll = result => {
    sql.query(`SELECT * FROM ${table} `, (err, res) => {
        if(err) throw err
        result(null, res);
    });
}

Teacher.updateById = (id, teacher, result) => {
    sql.query("UPDATE " + table +" SET teach_id = ?, teach_position = ?, teach_firstname = ?, teach_lastname = ?, major = ?, email = ?, tel = ? WHERE id = ?", 
    [teacher.teach_id, teacher.teach_position, teacher.teach_firstname, teacher.teach_lastname, teacher.major, teacher.email, teacher.tel, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...teacher});
    })
}

Teacher.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = Teacher;