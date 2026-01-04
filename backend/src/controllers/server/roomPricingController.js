const mysqlDatabase = require('../../database');

const viewRoomPricing = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_pricing_id id, room_pricing_fk_id room_id, room_pricing_type_fk_id type_id, room_pricing_value price FROM room_pricing"
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

const viewRoomPricingById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_pricing_id id, room_pricing_fk_id room_id, room_pricing_type_fk_id type_id, room_pricing_value price FROM room_pricing WHERE room_pricing_id = ?",
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

const viewRoomPricingByRoomId = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT room_pricing_id id, room_pricing_fk_id room_id, room_pricing_type_fk_id type_id, room_pricing_value price FROM room_pricing WHERE room_pricing_fk_id = ?",
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

const insertRoomPricing = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO room_pricing (room_pricing_fk_id, room_pricing_type_fk_id, room_pricing_value) VALUES (?, ?, ?)",
            [body.room_id, body.type_id, body.price]
        );

        resolve({
            code: 200,
            status: 'OK',
            message: `Room Pricing [${body.room_id}] Pricing Added Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteRoomPricing = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM room_pricing WHERE room_pricing_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Room Pricing [${body.id}] Data Deleted Successfully`
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
    viewRoomPricing,
    viewRoomPricingById,
    viewRoomPricingByRoomId,
    insertRoomPricing,
    deleteRoomPricing
};