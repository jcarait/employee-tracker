const inquirer = require("inquirer");
const db = require("./config/connection")
const cTable = require("console.table");


const genMenu = () => 
    [
        {
        type: "list",
        name: "main",
        message: "What do you want to do?",
        choices: [
                'View All Employees', 'Add Employee', "Update Employee Role",
                "View All Roles", "Add Role", "View All Departments",
                "Add Department","Quit"
                ]
    }
    ];


async function main() {
    console.log(`
    _______  __   __  _______  ___      _______  __   __  _______  _______   
    |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  
    |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|  
    |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___   
    |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|  
    |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___   
    |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|  
     ______   _______  _______  _______  _______  _______  _______  _______   
    |      | |   _   ||       ||   _   ||  _    ||   _   ||       ||       |  
    |  _    ||  |_|  ||_     _||  |_|  || |_|   ||  |_|  ||  _____||    ___|  
    | | |   ||       |  |   |  |       ||       ||       || |_____ |   |___   
    | |_|   ||       |  |   |  |       ||  _   | |       ||_____  ||    ___|  
    |       ||   _   |  |   |  |   _   || |_|   ||   _   | _____| ||   |___   
    |______| |__| |__|  |___|  |__| |__||_______||__| |__||_______||_______|     
    `)

    await inquirer.prompt(genMenu())
    
}

main();
// "View All Employees", "Add Employee", "Update Employee Role",
//             "View All Roles", "Add Role", "View All Departments",
//             "Add Department","Quit