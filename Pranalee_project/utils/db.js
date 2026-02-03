const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'W2_93080_Pranalee',
    password: 'manager',
    database: 'grocery'
})

module.exports = pool