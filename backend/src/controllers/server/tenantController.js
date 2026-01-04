const mysqlDatabase = require('../../database');

const viewTenant = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT tenant_id id, tenant_name name, tenant_description description, tenant_rules rules, 
                tenant_location location, tenant_province province, tenant_city city, 
                tenant_regency regency, tenant_subdistrict subdistrict, tenant_postalcode postalcode
            FROM tenant 
            WHERE tenant_status = 1`
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

const viewTenantById = (id) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT tenant_id id, tenant_name name, tenant_description description, tenant_rules rules, 
                tenant_location location, tenant_province province, tenant_city city, 
                tenant_regency regency, tenant_subdistrict subdistrict, tenant_postalcode postalcode
            FROM tenant 
            WHERE tenant_status = 1
            AND tenant_id = ?`,
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

const viewTenantByName = (name) => new Promise(async (resolve, reject) => {
    try {
        let decoded = '';
        try {
            decoded = decodeURIComponent(String(name));
        } catch (e) {
            decoded = String(name);
        }

        const pattern = '%' + decoded.replace(/\+/g, ' ').toUpperCase() + '%';
        var result = await mysqlDatabase.query(
            `SELECT DISTINCT tenant_id id, tenant_name name, tenant_description description, tenant_rules rules, 
                tenant_location location, tenant_province province, tenant_city city, 
                tenant_regency regency, tenant_subdistrict subdistrict, tenant_postalcode postalcode
            FROM tenant 
            WHERE tenant_status = 1
            AND upper(tenant_name) LIKE ?`,
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

const insertTenant = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            `INSERT INTO tenant (
                tenant_name, tenant_description, tenant_rules, 
                tenant_location, tenant_province, tenant_city, 
                tenant_regency, tenant_subdistrict, tenant_postalcode
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.name, body.description, body.rules, 
                body.location, body.province, body.city, 
                body.regency, body.subdistrict, body.postalcode
            ]
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

const updateTenant = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            `UPDATE tenant 
            SET tenant_name = ?, tenant_description = ?, tenant_rules = ?, 
                tenant_location = ?, tenant_province = ?, tenant_city = ?, 
                tenant_regency = ?, tenant_subdistrict = ?, tenant_postalcode = ?,
                tenant_status = ?
            WHERE tenant_id = ?`,
            [
                body.name, body.description, body.rules, 
                body.location, body.province, body.city, 
                body.regency, body.subdistrict, body.postalcode, 
                body.status, body.id
            ]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Tenant [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error,
        });
    }
});

const deleteTenant = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM tenant WHERE tenant_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Tenant [${body.id}] Data Deleted Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error,
        });
    }
});

module.exports = {
    viewTenant,
    viewTenantById,
    viewTenantByName,
    insertTenant,
    updateTenant,
    deleteTenant
};