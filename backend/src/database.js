const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,   // adjust per the guidance above
    queueLimit: 1000,      // cap queued requests (0 = unlimited)
    connectTimeout: 10000    
});

async function query (sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

async function voidQuery(sql, params = []) {
    await pool.execute(sql, params);
}

module.exports = {
    pool,
    query,
    voidQuery
}

// (async () => {
//     var hehe = await query("INSERT INTO FACILITY (facility_name) VALUES ('TEST')");
//     console.log(hehe);
// })();