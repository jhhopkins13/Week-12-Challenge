INSERT INTO departments (name) VALUES
  ('Human Resources'),
  ('Finance'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES
  ('HR Manager', 70000, 1),
  ('Finance Analyst', 60000, 2),
  ('Marketing Specialist', 55000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1);
