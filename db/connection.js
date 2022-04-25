const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '@st0r1@0r3g0n',
        database: 'tracker'
    },
    console.log('Connected to the election database.')
);

module.exports = db;
