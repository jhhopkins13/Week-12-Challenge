const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'your_host',
  port: 'your_port',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = connection;
