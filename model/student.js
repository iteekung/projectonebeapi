const sql = require('../db.js');

const table = 'student';

// constructor
const Student = function(student) {
    this.student_idname = student.student_idname;
    this.student_firstname = student.student_firstname;
    this.student_lastname = student.student_lastname;
    this.major = student.major;
    this.tel = student.tel;
    this.email = student.email;
    this.status = student.status;
}

Student.create = (newStudent, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newStudent, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newStudent});
    });
}

Student.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Student.getAll = result => {
    sql.query(`SELECT * FROM ${table} `, (err, res) => {
        if(err) throw err
        result(null, res);
    });
}

Student.updateById = (id, student, result) => {
    sql.query("UPDATE " + table +" SET student_idname = ?, student_firstname = ?, student_lastname = ?, major = ?, tel = ?, email = ?, status = ? WHERE id = ?", 
    [student.student_idname, student.student_firstname, student.student_lastname, student.major, student.tel, student.email, student.status, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...student});
    })
}

Student.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = Student;