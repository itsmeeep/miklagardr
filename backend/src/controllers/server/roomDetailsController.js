const mysqlDatabase = require('../../database');

const insertRoomDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO room_details (room_details_fk_id, room_details_facility_fk_id) VALUES (?, ?)",
            [body.room_id, body.facility_id]
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

const updateRoomDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            `UPDATE room_details SET room_details_fk_id = ?, room_details_facility_fk_id = ? WHERE room_details_id = ?`,
            [body.room_id, body.facility_id, body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room Details [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteRoomDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM room_details WHERE room_details_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room Details [${body.id}] Data Deleted Successfully`
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
    insertRoomDetails,
    updateRoomDetails,
    deleteRoomDetails
};