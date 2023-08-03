const connection = require('../config/connection');

class DepartmentQueries {
  static getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM departments';
      connection.query(query, (err, departments) => {
        if (err) reject(err);
        else resolve(departments);
      });
    });
  }

  static insertDepartment(name) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO departments (name) VALUES (?)';
      connection.query(query, [name], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = DepartmentQueries;
