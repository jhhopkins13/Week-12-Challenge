const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'department_db',
});

const connect = new Promise((resolve, reject) => {
  connection.connect((err) => {
    if (err) reject(err);
    else {
      console.log('Connected to MySQL database!');
      resolve(connection);
    }
  });
});

module.exports = connect;
