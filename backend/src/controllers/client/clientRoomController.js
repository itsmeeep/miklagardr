const mysqlDatabase = require('../../database');

const roomDetails = (id) => new Promise(async (resolve, reject) => {
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
            room: {
                room_code: "",
                room_name: "",
                room_facility: [],
                room_pricing: [],
                room_images: []
            }
        }

        // tenant
        var tenant = await mysqlDatabase.query(
            "SELECT A.* " +
            "FROM tenant A, room B " +
            "WHERE A.tenant_id = B.room_fk_id " +
            "AND B.room_id = ?", [id]);

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
        var room = await mysqlDatabase.query("SELECT * FROM room WHERE room_id = ?", [id]);
        data.room.room_code = room[0].room_code;
        data.room.room_name = room[0].room_name;

        // room facility
        var facility = await mysqlDatabase.query("SELECT distinct facility_id, facility_name FROM facility WHERE facility_status = '1'", []);
        var room_facility = [];

        for (let i = 0; i < facility.length; i++) {
            var room_facility_details = await mysqlDatabase.query(
                "SELECT DISTINCT b.facility_details_name name " +
                "FROM facility a, facility_details b, room_details c " +
                "WHERE a.facility_id = b.facility_details_fk_id " +
                "AND b.facility_details_id = c.room_details_facility_fk_id " +
                "AND c.room_details_fk_id = ? " +
                "AND a.facility_id = ?",
                [id, facility[i].facility_id]
            );

            room_facility.push({
                facility_name: facility[i].facility_name,
                facility_details: room_facility_details
            });
        }
        data.room.room_facility = room_facility;

        // room pricing
        var room_pricing = await mysqlDatabase.query(
            "SELECT DISTINCT B.pricing_type_name type, A.room_pricing_value value " +
            "FROM room_pricing A, pricing_type B " +
            "WHERE A.room_pricing_type_fk_id = B.pricing_type_id " + 
            "AND A.room_pricing_fk_id = ?", 
            [id]
        );
        data.room.room_pricing = room_pricing;

        // room images
        var room_images = await mysqlDatabase.query(
            "SELECT room_images_url url FROM room_images WHERE room_images_fk_id = ?", 
            [id]
        );
        data.room.room_images = room_images;

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
    roomDetails
};
