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
          showDepartments();
        }
  
        if (choices === "View all roles") {
          showRoles();
        }
  
        if (choices === "View all employees") {
          showEmployees();
        }
  
        if (choices === "Add a department") {
          addDepartment();
        }
  
        if (choices === "Add a role") {
          addRole();
        }
  
        if (choices === "Add an employee") {
          addEmployee();
        }
  
        if (choices === "Update an employee role") {
          updateEmployee();
        }
  
        if (choices === "Update an employee manager") {
          updateManager();
        }
  
        if (choices === "View employees by department") {
          employeeDepartment();
        }

        if (choices === "View employees by Manager") {
          employeeManager();
          }
  
        if (choices === "Delete a department") {
          deleteDepartment();
        }
  
        if (choices === "Delete a role") {
          deleteRole();
        }
  
        if (choices === "Delete an employee") {
          deleteEmployee();
        }
  
        if (choices === "View department budgets") {
          viewBudget();
        }
  
        if (choices === "No Action") {
          db.end()
      };
    });
  };




  promptUser();