const mysql      = require('mysql');
// const connection = mysql.createPool({
//     connectionLimit : 10,
//     host     : '27.254.172.42',
//     user     : 'scoop',
//     password : 'a33^d7Rg',
//     database : 'comsci_scoop'
// });

// connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });


const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'comsci_scoop'
});

module.exports = connection;