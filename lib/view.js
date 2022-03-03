const displayTable = require("../utils/helper")

// Functions to display SQL data on console.table

const departments = () => {
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

module.exports = { departments, viewRoles, viewEmployees};