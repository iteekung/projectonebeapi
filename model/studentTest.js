const sql = require('../db.js');

const table = 'studentTest';

// constructor
const StudentTest = function(studentTest) {
    this.studentId = studentTest.studentId;
    this.check = studentTest.check;
}

StudentTest.create = (newStudentTest, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newStudentTest, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newStudentTest});
    });
}

StudentTest.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

StudentTest.getAll = result => {
    sql.query(`SELECT studentTest.id, student.student_idname, student.student_firstname, student.student_lastname, studentTest.check
               FROM studentTest
               JOIN student ON student.id = studentTest.studentId
                GROUP BY studentTest.id`, (err, res) => {
                    if(err)throw err
                    result(null, res);
                });
}

StudentTest.updateById = (id, studentTest, result) => {
    sql.query("UPDATE " + table +" SET check = ? WHERE id = ?", 
    [studentTest.check, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...studentTest});
    })
}

StudentTest.updateCheckin = (studentTest, result) => {
    sql.query("UPDATE " + table +" SET check = 1 WHERE studentId = ?", 
    [studentTest.check], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...studentTest});
    })
}

StudentTest.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = StudentTest;