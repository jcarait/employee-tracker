const inquirer = require("inquirer");

// import library to display tables on console
const cTable = require("console.table");

// import config connection to sql database
const db = require("./config/connection")



const promptUser = () => {
    inquirer.prompt ([
      {
        type: "list",
        name: "choices", 
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "View employees by department",
                  "Add department", "Add role", "Add employee", 
                  "Update employee role", "Update employee manager",
                  "Delete a department", "Delete a role", "Delete an employee",
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
  
        if (choices === "Add a department") {
          addDepartment();
        };
  
        if (choices === "Add a role") {
          addRole();
        };
  
        if (choices === "Add an employee") {
          addEmployee();
        };
  
        if (choices === "Update an employee role") {
          updateEmployee();
        };
  
        if (choices === "Update an employee manager") {
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
  
        if (choices === "No Action") {
          db.end()
        };
    });
  };

const displayTable = (sql) => {
     db.query(sql, (err, res) => {
        if (err)
            throw err;
        console.table(res);
        promptUser();
    });
}

const viewDepartments = () => {
    console.log("Viewing All Departments...\n");

    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    displayTable(sql);
};

const viewRoles = () => {
    console.log("Viewing All Roles...\n");

    const sql = `SELECT role.id AS id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

    displayTable(sql);
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

    displayTable(sql);
}




  promptUser();