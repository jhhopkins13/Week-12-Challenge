const connection = require('../config/connection');

class EmployeeQueries {
  static getAllEmployees() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
      `;
      connection.query(query, (err, employees) => {
        if (err) reject(err);
        else resolve(employees);
      });
    });
  }

  static insertEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static updateEmployeeRole(employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
      connection.query(query, [newRoleId, employeeId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = EmployeeQueries;
