const mysqlDatabase = require('../../database');

const viewFacility = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_id id, facility_name name, facility_order order_index, facility_icon icon FROM facility WHERE facility_status = 1 ORDER BY facility_order ASC"
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

const viewFacilityById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_id id, facility_name name, " +
            "facility_order order_index, facility_icon icon " +
            "FROM facility " +
            "WHERE facility_status = 1 " +
            "AND facility_id = ? " +
            "ORDER BY facility_order ASC",
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

const viewFacilityByName = (name) => new Promise(async (resolve, reject) => {
    try {
        let decoded = '';
        try {
            decoded = decodeURIComponent(String(name));
        } catch (e) {
            decoded = String(name);
        }

        const pattern = '%' + decoded.replace(/\+/g, ' ').toUpperCase() + '%';
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_id id, facility_name name, " +
            "facility_order order_index, facility_icon icon " +
            "FROM facility " +
            "WHERE facility_status = 1 " +
            "AND upper(facility_name) LIKE ? " +
            "ORDER BY facility_order ASC",
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

const insertFacility = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO facility (facility_name, facility_icon) VALUES (?, ?)",
            [body.name, body.icon]
        );

        resolve({
            code: 200,
            status: 'OK',
            message: "Facility Data Inserted Successfully"
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const updateFacility = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "UPDATE facility SET facility_name = ?, facility_icon = ?, facility_status = ? WHERE facility_id = ?",
            [body.name, body.icon, body.status, body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Facility [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteFacility = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM facility WHERE facility_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Facility [${body.id}] Data Deleted Successfully`
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
    viewFacility,
    viewFacilityById,
    viewFacilityByName,
    insertFacility,
    updateFacility,
    deleteFacility
};