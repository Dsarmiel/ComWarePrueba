const sql = require('mssql');

//Configuracion de la conexion a una base de datos en SQL server que usa la autenticacion de windows
const dbConfig = {
    server: 'localhost',
    database: 'Papeleria',
    user: 'sa',
    password: '123',
    options: {
        trustServerCertificate: true,
    }
};

//Creando la coneccion a la base de datos
const poolDB = new sql.ConnectionPool(dbConfig).connect();

module.exports = { poolDB, sql };