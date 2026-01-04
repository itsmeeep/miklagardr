const mysqlDatabase = require('../../database');

const viewFacilityDetails = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_details_id id, facility_details_name name, facility_details_icon icon " +
            "FROM facility_details " +
            "WHERE facility_details_status = 1 " +
            "ORDER BY facility_details_name ASC"
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

const viewFacilityDetailsById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_details_id id, facility_details_name name, facility_details_icon icon " +
            "FROM facility_details " +
            "WHERE facility_details_status = 1 " +
            "AND facility_details_id = ? " +
            "ORDER BY facility_details_name ASC",
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

const viewFacilityDetailsByFacility = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_details_id id, facility_details_name name, facility_details_icon icon " +
            "FROM facility_details " +
            "WHERE facility_details_status = 1 " +
            "AND facility_details_fk_id = ? " +
            "ORDER BY facility_details_name ASC",
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

const viewFacilityDetailsByName = (name) => new Promise(async (resolve, reject) => {
    try {
        let decoded = '';
        try {
            decoded = decodeURIComponent(String(name));
        } catch (e) {
            decoded = String(name);
        }

        const pattern = '%' + decoded.replace(/\+/g, ' ').toUpperCase() + '%';
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT facility_details_id id, facility_details_name name, facility_details_icon icon " +
            "FROM facility_details " +
            "WHERE facility_details_status = 1 " +
            "AND upper(facility_details_name) LIKE ? " +
            "ORDER BY facility_details_name ASC",
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

const insertFacilityDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO facility_details (facility_details_fk_id, facility_details_name, facility_details_icon) VALUES (?, ?, ?)",
            [body.id, body.name, body.icon]
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

const updateFacilityDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "UPDATE facility_details SET facility_details_name = ?, facility_details_icon = ?, facility_details_status = ? WHERE facility_details_id = ?",
            [body.name, body.icon, body.status, body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Facility Details [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deleteFacilityDetails = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM facility_details WHERE facility_details_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Facility Details [${body.id}] Data Deleted Successfully`
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
    viewFacilityDetails,
    viewFacilityDetailsById,
    viewFacilityDetailsByFacility,
    viewFacilityDetailsByName,
    insertFacilityDetails,
    updateFacilityDetails,
    deleteFacilityDetails
};