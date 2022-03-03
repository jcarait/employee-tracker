INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Ninjaneer', 110000, 1),
('Wiz Kid', 95000, 1),
('Money Maestro', 95000, 2), 
('Master of Coin', 150000, 2),
('Head of "Show me the Money!"', 130000, 3), 
('Rain Maker', 90000, 3),
('People Operations Generalist', 100000, 4),
('Chief Inspiration Officer', 120000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Hatori', 'Hnazo', 1, 1),
('Ayodeji', 'Balogun', 2, null),
('Varys', 'Lys', 4, null),
('Warren', 'Gates', 3, 2),
('Mike', 'Ross', 6, null),
('Harvey', 'Spectre', 5, 3),
('Mark', 'Anthony', 7, null),
('Julius', 'Caesar', 8, 4);
