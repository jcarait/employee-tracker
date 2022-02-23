const inquirer = require("inquirer");
const db = require("./config/connection")
const cTable = require('console.table');

//Generate menu with list for inquirer
// const genMenu =  [{
//         type: "list",
//         name: "menu",
//         message: "What do you want to do?",
//         choices: ["View All Employees", "Add Employee", "Update Employee Role", 
//         "View All Roles", "Add Role", "View All Departments", 
//         "Add Department", "Quit"]
//     }];

const returnMenuChoice = () => {
    return Promise.resolve((input) => {
        if (input === quit) {
            return inquirer.prompt.quit()
        };
    })

}



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

    const getMenu = await inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What do you want to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role",
            "View All Roles", "Add Role", "View All Departments",
            "Add Department", "Quit"]
    }])
    const getChoice = await inquirer.prompt(returnMenuChoice());
}

main();