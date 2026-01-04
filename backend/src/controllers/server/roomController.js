const mysqlDatabase = require('../../database');

const viewRoom = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT room_id id, room_name name, room_code code
            FROM room 
            WHERE room_status = 1`
        );

        resolve({
            code: 200,
            status: 'OK',
            message: null,
            data: result
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const viewRoomById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT room_id id, room_name name, room_code code
            FROM room 
            WHERE room_status = 1
            AND room_id = ?`,
            [id]
        );

        console.log(result);

        resolve({
            code: 200,
            status: 'OK',
            message: null,
            data: result
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const viewRoomByName = (name) => new Promise(async (resolve, reject) => {
    try {
        let decoded = '';
        try {
            decoded = decodeURIComponent(String(name));
        } catch (e) {
            decoded = String(name);
        }

        const pattern = '%' + decoded.replace(/\+/g, ' ').toUpperCase() + '%';
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT room_id id, room_name name, room_code code
            FROM room 
            WHERE room_status = 1
            AND upper(room_name) LIKE ?`,
            [pattern]
        );

        resolve({
            code: 200,
            status: 'OK',
            message: null,
            data: result
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const insertRoom = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO room (room_name, room_code, room_fk_id) VALUES (?, ?, ?)",
            [body.name, body.code, body.id]
        );

        resolve({
            code: 200,
            status: 'OK',
            message: null
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const updateRoom = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            `UPDATE room SET room_name = ?, room_code = ?, room_status = ? WHERE room_id = ?`,
            [body.name, body.code, body.status, body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteRoom = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM room WHERE room_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room [${body.id}] Data Deleted Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

module.exports = {
    viewRoom,
    viewRoomById,
    viewRoomByName,
    insertRoom,
    updateRoom,
    deleteRoom
};