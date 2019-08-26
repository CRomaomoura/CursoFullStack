const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'portfolio'
});

module.exports = conexao;