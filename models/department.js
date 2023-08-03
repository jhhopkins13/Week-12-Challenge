const connection = require('../config/connection');

class Department {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM departments';
      connection.query(query, (err, departments) => {
        if (err) reject(err);
        else resolve(departments);
      });
    });
  }

  static create(name) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO departments (name) VALUES (?)';
      connection.query(query, [name], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Department;
