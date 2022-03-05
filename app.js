const inquirer = require("inquirer");

const db = require("./config/connection")
// import library to display tables on console
const cTable = require("console.table");



const promptUser = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "View employees by department",
        "Add department", "Add role", "Add employee",
        "Update employee role", "Update employee manager",
        "Delete a department", "Delete a role", "Delete employee",
        "View employees by Manager", "View department budgets",
        "Exit"]
    }
  ])
    .then((answers) => {
      const { choices } = answers;




      if (choices === "View all departments") {
        viewDepartments();
      };

      if (choices === "View all roles") {
        viewRoles();
      };

      if (choices === "View all employees") {
        viewEmployees();
      };

      if (choices === "Add department") {
        addDepartment();
      };

      if (choices === "Add role") {
        addRole();
      };

      if (choices === "Add employee") {
        addEmployee();
      };

      if (choices === "Update employee role") {
        updateEmployee();
      };

      if (choices === "Update employee manager") {
        updateManager();
      };

      if (choices === "View employees by department") {
        employeeDepartment();
      };

      if (choices === "View employees by Manager") {
        employeeManager();
      };

      if (choices === "Delete a department") {
        deleteDepartment();
      };

      if (choices === "Delete a role") {
        deleteRole();
      };

      if (choices === "Delete an employee") {
        deleteEmployee();
      };

      if (choices === "View department budgets") {
        viewBudget();
      };

      if (choices === "Exit") {
        db.end()
      };

    });
}

// ======= inquirer view functions ============

const viewRoles = () => {
  console.log("Viewing All Roles...\n");

  const sql = `SELECT role.id AS id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, res) => {
    if (err)
      console.log(err);
    console.table(res);
  });
  promptUser();
};

const viewEmployees = () => {
  console.log("Viewing All Employees...\n");

  const sql = `SELECT employee.id, 
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.name AS department,
                  role.salary, 
                  CONCAT (manager.first_name, " ", manager.last_name) AS manager
                  FROM employee
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id
                  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, res) => {
    if (err)
      console.log(err);
    console.table(res);
  });
  promptUser();
};

const viewDepartments = () => {
  console.log("Viewing All Departments...\n");

  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  db.query(sql, (err, res) => {
    if (err)
      console.log(err);
    console.table(res);
  });
  promptUser();
};

const employeeDepartment = () => {
  console.log('Showing employee by departments...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;

  db.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// ======= inquirer add functions ============

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "addDept",
      message: "What department would you like to add?",
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log("Please enter a department");
          return false
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
        VALUES(?);
        `
      db.query(sql, answer.addDept, (err, res) => {
        if (err) console.log(err);
        console.log(`Added ${answer.addDept} as a new department!`);

        viewDepartments();
      });
    })
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log('Please enter a role');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {

        if (isNaN(addSalary)) {
          console.log('Please enter a salary');
          return false;
        } else {
          return true;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleDB = `SELECT name, id FROM department`;

      db.query(roleDB, (err, data) => {
        if (err) throw err;

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'dept',
            message: "What department is this role in?",
            choices: dept
          }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            db.query(sql, params, (err, res) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!");

              viewRoles();
            });
          });
      });
    });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
          return true;
        } else {
          console.log('Please enter a first name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
          return true;
        } else {
          console.log('Please enter a last name');
          return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.firstName, answer.lastName]

      const roleDB = `SELECT role.id, role.title FROM role`;

      db.query(roleDB, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles
          }
        ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const managerDB = `SELECT * FROM employee`;

            db.query(managerDB, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ])
                .then(managerChoice => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log("Employee has been added!")

                    viewEmployees();
                  });
                });
            });
          });
      });
    });
};

// ======= inquirer update functions ============

const updateEmployee = () => {
  // get existing employees from database
  const employeeDB = `SELECT * FROM employee`;

  db.query(employeeDB, (err, data) => {
    if (err) throw err;

    // map joins first and last name values to be displayed in inquirer prompts
    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const roleDB = `SELECT * FROM role`;

        db.query(roleDB, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's new role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0]
              params[0] = role
              params[1] = employee

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                viewEmployees();
              });
            });
        });
      });
  });
};

const updateManager = () => {
  const employeeDB = `SELECT * FROM employee`;

  connection.query(employeeDB, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const managerDB = `SELECT * FROM employee`;

        db.query(managerDB, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: "Who is the employee's manager?",
              choices: managers
            }
          ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0]
              params[0] = manager
              params[1] = employee

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                viewEmployees();
              });
            });
        });
      });
  });
};

// ======= inquirer delete functions ============

const deleteDepartment = () => {
  const deptDB = `SELECT * FROM department`;

  db.query(deptDB, (err, data) => {
    if (err) throw err;

    const dept = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'dept',
        message: "What department do you want to delete?",
        choices: dept
      }
    ])
      .then(deptChoice => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        db.query(sql, dept, (err, res) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          viewDepartments();
        });
      });
  });
};

const deleteRole = () => {
  const roleDB = `SELECT * FROM role`;

  db.query(roleDB, (err, data) => {
    if (err) throw err;

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What role do you want to delete?",
        choices: role
      }
    ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        connection.query(sql, role, (err, res) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          viewRoles();
        });
      });
  });
};

// function to delete employees
deleteEmployee = () => {
  // get employees from employee table 
  const employeeDB = `SELECT * FROM employee`;

  db.query(employeeDB, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        db.query(sql, employee, (err, res) => {
          if (err) throw err;
          console.log("Successfully Deleted!");

          viewEmployees();
        });
      });
  });
};
promptUser();
