const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {});
});

db.connect((err) => {
    if (err) throw err;
    startApp();
});

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
}