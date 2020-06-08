const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');
const Room = require('./model/room.js')
const Auth = require('./model/auth.js')

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
    // const room = new Room({
    //     name: req.body.name,
    //     building: req.body.building,
    //     size: req.body.size,
    //     type: req.body.type,
    //     status: req.body.status,
    //     active: req.body.active,
    // })
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

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})