const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./models/department.js');
const Role = require('./models/role.js');
const Employee = require('./models/employee.js');

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          Department.getAll()
            .then((departments) => {
              console.table(departments);
              startApp();
            })
            .catch((err) => {
              console.error('Error retrieving departments:', err);
              startApp();
            });
          break;
        case 'View all roles':
          Role.getAll()
            .then((roles) => {
              console.table(roles);
              startApp();
            })
            .catch((err) => {
              console.error('Error retrieving roles:', err);
              startApp();
            });
          break;
        case 'View all employees':
          Employee.getAll()
            .then((employees) => {
              console.table(employees);
              startApp();
            })
            .catch((err) => {
              console.error('Error retrieving employees:', err);
              startApp();
            });
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
              },
            ])
            .then((deptAnswers) => {
              Department.create(deptAnswers.name)
                .then((result) => {
                  console.log('Department added successfully!');
                  startApp();
                })
                .catch((err) => {
                  console.error('Error adding department:', err);
                  startApp();
                });
            });
          break;
        case 'Add a role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
              },
              {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for the role:',
              },
              {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for the role:',
              },
            ])
            .then((roleAnswers) => {
              Role.create(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId)
                .then((result) => {
                  console.log('Role added successfully!');
                  startApp();
                })
                .catch((err) => {
                  console.error('Error adding role:', err);
                  startApp();
                });
            });
          break;
        case 'Add an employee':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
              },
              {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
              },
              {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID for the employee:',
              },
              {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID for the employee:',
              },
            ])
            .then((empAnswers) => {
              Employee.create(empAnswers.firstName, empAnswers.lastName, empAnswers.roleId, empAnswers.managerId)
                .then((result) => {
                  console.log('Employee added successfully!');
                  startApp();
                })
                .catch((err) => {
                  console.error('Error adding employee:', err);
                  startApp();
                });
            });
          break;
        case 'Update an employee role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee to update:',
              },
              {
                type: 'input',
                name: 'newRoleId',
                message: 'Enter the new role ID for the employee:',
              },
            ])
            .then((updateAnswers) => {
              Employee.updateRole(updateAnswers.employeeId, updateAnswers.newRoleId)
                .then((result) => {
                  console.log('Employee role updated successfully!');
                  startApp();
                })
                .catch((err) => {
                  console.error('Error updating employee role:', err);
                  startApp();
                });
            });
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
          break;
        default:
          console.log('Invalid option. Please try again.');
          startApp();
          break;
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      process.exit(1);
    });
}

connection.connect()
  .then(() => {
    console.log('Connected to the database!');
    startApp();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });
