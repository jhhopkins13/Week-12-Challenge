const connection = require('../config/connection');

class RoleQueries {
  static getAllRoles() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT roles.*, departments.name AS department_name
        FROM roles
        JOIN departments ON roles.department_id = departments.id
      `;
      connection.query(query, (err, roles) => {
        if (err) reject(err);
        else resolve(roles);
      });
    });
  }

  static insertRole(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [title, salary, departmentId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = RoleQueries;
