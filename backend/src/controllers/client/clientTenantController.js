const mysqlDatabase = require('../../database');

const tenantDetails = (id) => new Promise(async (resolve, reject) => {
    try {
        var data = {
            tenant_name: "",
            tenant_description: "",
            tenant_rules: "",
            tenant_location: "",
            tenant_province: "",
            tenant_city: "",
            tenant_regency: "",
            tenant_subdistrict: "",
            tenant_postalcode: "",
            room: []
        }

        // tenant
        var tenant = await mysqlDatabase.query(
            "SELECT A.* " +
            "FROM tenant A " +
            "WHERE A.tenant_id = ?", [id]);

        data.tenant_name = tenant[0].tenant_name;
        data.tenant_description = tenant[0].tenant_description;
        data.tenant_rules = tenant[0].tenant_rules;
        data.tenant_location = tenant[0].tenant_location;
        data.tenant_province = tenant[0].tenant_province;
        data.tenant_city = tenant[0].tenant_city;
        data.tenant_regency = tenant[0].tenant_regency;
        data.tenant_subdistrict = tenant[0].tenant_subdistrict;
        data.tenant_postalcode = tenant[0].tenant_postalcode;

        // room
        var room = await mysqlDatabase.query(
            "SELECT room_code code, room_name name, " +
            "(SELECT room_images_url FROM room_images WHERE room_images_fk_id = room_id ORDER BY room_images_updated_at desc LIMIT 1) image " +
            "FROM room WHERE room_fk_id = ?", 
            [id]
        );
        data.room = room;

        resolve({
            code: 200,
            status: 'OK',
            message: null,
            data: data
        });

    } catch (error) {
        resolve({
            code: 500,
            status: 'Internal Server Error',
            message: error,
            data: []
        })
    }
});

module.exports = {
    tenantDetails
};