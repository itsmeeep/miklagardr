const mysqlDatabase = require('../../database');

const viewPricingType = () => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "SELECT DISTINCT pricing_type_id id, pricing_type_name name FROM pricing_type"
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

const insertPricingType = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.query(
            "INSERT INTO pricing_type (pricing_type_name) VALUES (?)",
            [body.name]
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

const updatePricingType = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "UPDATE pricing_type SET pricing_type_name = ? WHERE pricing_type_id = ?",
            [body.name, body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Pricing Type [${body.id}] Data Updated Successfully`
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error
        });
    }
});

const deletePricingType = (body) => new Promise(async (resolve, reject) => {
    try {
        var result = await mysqlDatabase.voidQuery(
            "DELETE FROM pricing_type WHERE pricing_type_id = ?",
            [body.id]
        );
        
        resolve({
            code: 200,
            status: 'OK',
            message: `Pricing Type [${body.id}] Data Deleted Successfully`
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
    viewPricingType,
    insertPricingType,
    updatePricingType,
    deletePricingType
};