const sql = require('../db.js');

const table = 'studentTest';

// constructor
const StudentTest = function(studentTest) {
    this.studentId = studentTest.studentId;
    this.check = studentTest.check;
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
               JOIN student ON student.id = studentTest.studentId`, (err, res) => {
                    if(err)throw err
                    result(null, res);
                });
}

StudentTest.updateById = (id, studentTest, result) => {
    sql.query("UPDATE " + table +" SET studentId = ?, check = ? WHERE id = ?", 
    [studentTest.studentId, studentTest.check, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...studentTest});
    })
}


module.exports = StudentTest;