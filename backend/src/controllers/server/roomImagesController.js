const mysqlDatabase = require('../../database');

const viewRoomImages = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_images_id id, room_images_url url FROM room_images"
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
            message: error,
            data: []
        });
    }
});

const viewRoomImagesById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_images_id id, room_images_url url FROM room_images WHERE room_images_id = ?",
            [id]
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
            message: error,
            data: []
        });
    }
});

const viewRoomImagesByRoomId = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_images_id id, room_images_url url FROM room_images WHERE room_images_fk_id = ?",
            [id]
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
            message: error,
            data: []
        });
    }
});

const insertRoomImages = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO room_images (room_images_fk_id, room_images_url) VALUES (?, ?)",
            [body.room_id, body.room_images_url]
        );

        resolve({
            code: 200,
            status: 'OK',
            message: `Room Images [${body.room_id}] Images Added Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteRoomImages = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM room_images WHERE room_images_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room Images [${body.id}] Data Deleted Successfully`
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
    viewRoomImages,
    viewRoomImagesById,
    viewRoomImagesByRoomId,
    insertRoomImages,
    deleteRoomImages
};