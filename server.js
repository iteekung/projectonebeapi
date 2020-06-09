const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');
const Room = require('./model/room.js')
const Auth = require('./model/auth.js')
const Student = require('./model/student.js')
const Subject = require('./model/subject.js')
const Teacher = require('./model/teacher.js')
const Test = require('./model/test.js')

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cross origin
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World')
})

// login
app.post('/login', (req, res) => {
    Auth.login(req.body.username, req.body.password, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})

// Rooms find by id
app.get("/rooms/:id", (req, res) => {
    Room.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Rooms getall
app.get("/rooms", (req, res) => {
    Room.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Create room
app.post("/rooms", (req, res) => {
    const room = new Room(req.body)
    Room.create(room, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Update room
app.put("/rooms/:id", (req, res) => {
    const room = new Room(req.body)
    Room.updateById(req.params.id, room, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Delete room
app.delete("/rooms/:id", (req, res) => {
    const room = new Room(req.body)
    Room.remove(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Students getall
app.get("/student", (req, res) => {
    Student.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Students find by id
app.get("/student/:id", (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Create Student
app.post("/student", (req, res) => {
    const student = new Student(req.body)
    Student.create(student, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Update Student
app.put("/students/:id", (req, res) => {
    const student = new Student(req.body)
    Student.updateById(req.params.id, student, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Delete Student
app.delete("/students/:id", (req, res) => {
    const student = new Student(req.body)
    Student.remove(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Subject getall
app.get("/subject", (req, res) => {
    Subject.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Subjects find by id
app.get("/subject/:id", (req, res) => {
    Subject.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Create Subject
app.post("/subject", (req, res) => {
    const subject = new Subject(req.body)
    Subject.create(subject, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Update Subject
app.put("/subjects/:id", (req, res) => {
    const subject = new Subject(req.body)
    Subject.updateById(req.params.id, subject, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Delete Subject
app.delete("/subjects/:id", (req, res) => {
    const subject = new Subject(req.body)
    Subject.remove(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Teacher getall
app.get("/teacher", (req, res) => {
    Teacher.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Teacher find by id
app.get("/teacher/:id", (req, res) => {
    Teacher.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Create Teacher
app.post("/teacher", (req, res) => {
    const teacher = new Teacher(req.body)
    Teacher.create(teacher, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Update Teacher
app.put("/teachers/:id", (req, res) => {
    const teacher = new Teacher(req.body)
    Teacher.updateById(req.params.id, teacher, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Delete Teacher
app.delete("/teacher/:id", (req, res) => {
    const teacher = new Teacher(req.body)
    Teacher.remove(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});


// Test getall
app.get("/test", (req, res) => {
    Test.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Test find by id
app.get("/test/:id", (req, res) => {
    Test.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});
// Create Test
app.post("/test", (req, res) => {
    const test = new Test(req.body)
    Test.create(test, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Update Test
app.put("/test/:id", (req, res) => {
    const test = new Test(req.body)
    Test.updateById(req.params.id, test, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// Delete Test
app.delete("/test/:id", (req, res) => {
    Test.remove(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})