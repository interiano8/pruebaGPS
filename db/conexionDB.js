const mysql = require('mysql');

const connectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Temporal1',
    database: 'pruebagps'
});

connectionDB.connect(error => {
    if (error) throw error;
    console.log('Conexión establecida con la base de datos');
});

module.exports = connectionDB;
