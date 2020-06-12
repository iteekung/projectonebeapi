const sql = require('../db.js');

const table = 'rooms';

// constructor
const Room = function(room) {
    this.room_id = room.room_id;
    this.building = room.building;
    this.size = room.size;
    this.type = room.type;
    this.status = room.status;
    this.active = room.active;
}

Room.create = (newRoom, result) => {
    sql.query("INSERT INTO " + table + " SET ?", newRoom, (err, res) => {
        if(err) throw err
        result(null, {id: res.insertId, ...newRoom});
    });
}

Room.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Room.getAll = result => {
    sql.query(`SELECT * FROM ${table} `, (err, res) => {
        if(err) throw err
        result(null, res);
    });
}

Room.updateById = (id, room, result) => {
    sql.query("UPDATE " + table +" SET room_id = ?, building = ?, size = ?, type = ?, status = ?, active = ? WHERE id = ?", 
    [room.name, room.building, room.size, room.type, room.status, room.active, id], (err, res) => {
        if(err) throw err
        result(null, {id: id, ...room});
    })
}

Room.remove = (id, result) => {
    sql.query("DELETE FROM " + table + " WHERE id = ?", 
    id, (err, res) => {
        if(err) throw err
        result(null, res);
    })
}

module.exports = Room;