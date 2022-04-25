// required modules
const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection');
const { response } = require('express');
const { start } = require('repl');

const PORT = process.env.PORT || 3001;
const app = express();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {});
});

// Call start application funtion if no error
db.connect((err) => {
    if (err) throw err;
    startApp();
});

// Start application function
startApp = () => {
    inquirer.prompt([
        {
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to Employee Tracker.  What would you like to do?',
            choices: 
            [
                'View departments', 
                'View roles', 
                'View employees', 
                'View employees by manager', 
                'Add a department', 
                'Add a role', 
                'Add an employee',
                'Update employee role',
                'Update employee manager',
                'Remove a department',
                'Remove a role',
                'Remove an employee',
                'View total salary of department',
                'Exit program'
            ]
        }
    ])
    .then((response) => {
        switch (response.initialInquiry) {
            case 'View departments':
                viewDepartments();
                break;
            
            case 'View roles':
                viewRoles();
                break;          
        }
    });

};            

viewDepartments = () => {
    db.query(`SELECT * FROM department ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
};

viewRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name, department.id FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
}