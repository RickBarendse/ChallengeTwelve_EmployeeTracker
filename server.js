// required modules
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

// Call start application funtion if no error
db.connect((err) => {
    if (err) throw err;
    startApp();
});

// Start application function
startApp = () => {
    console.log('=============================================================')
    inquirer.prompt([
        {
            // Introduction to application with list of avvailable functions 
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to Employee Tracker.  What would you like to do?',
            choices: 
            [
                'View departments', 
                'View roles', 
                'View employees',  
                'Add a department', 
                'Add a role', 
                'Add an employee',
                'Update employee role',
                'Exit'
            ]
        }
    ])
    // switch cases to call functions based on user selection
    .then((response) => {
        switch (response.initialInquiry) {
            case 'View departments':
                viewDepartments();
                break;
            
            case 'View roles':
                viewRoles();
                break;     
                
            case 'View employees':
                viewEmployees();
                break;
            
            case 'Add a department':
                addDepartment();
                break;
            
            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployee();
                break;

            case 'Exit':
                db.end();
                console.log('Good bye!');
                return;
            default:
                break;
        }
    });

};            

// View departments function
viewDepartments = () => {
    db.query(`SELECT * FROM department ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
};

// View role functioin
viewRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name, department.id FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
};

// View employees function
viewEmployees = ()=> {
    db.query(`Select e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY e.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
};

// Add department function
addDepartment = () => {
    inquirer.prompt([
        {
            name: 'addDept',
            type: 'input',
            message: 'What is the name of the department to be added?'
        }
    ])
        .then((response) => {
            db.query(`INSERT INTO department SET ?`,
            {
                name: response.addDept,
            },
            (err, res) => {
                if (err) throw err;
                console.log(` ${response.addDept} successfully add to the database`);
                startApp();
            })
        })
};

// Add a role function
addRole = () => {
    db.query(`SELECT * FROM department;`, (err, res)=> {
        if (err) throw err;
        let departments = res.map(department => ({name: department.name, value: department.id}));
        inquirer.prompt([
            {
                name: 'addTitle',
                type: 'input',
                message: 'What is the position title?'
            },
            {
                name: 'addSalary',
                type: 'input',
                message: 'What is the salary of the new role?'
            },
            {
                name: 'deptName',
                type: 'rawlist',
                message: 'Into which department is this new role to be added?',
                choices: departments
            },
        ])
            .then((response) => {
                db.query(`INSERT INTO role SET ?`,
                {
                    title: response.addTitle,
                    salary: response.addSalary,
                    department_id: response.deptName,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${response.addTitle} added to the database!`);
                    startApp();
                })
            })
        })
};

// Add new employee function
addEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id}));
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));

        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'role',
                type: 'rawlist',
                message: "What is the employee's title?",
                choices: roles
            },
            {
                name: 'manager',
                type: 'rawlist',
                message: "Who is the new employee's manager?",
                choices: employees
            }          
        ])
            .then((response) => {
                db.query(`INSERT INTO employee SET ?`,
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(` ${response.firstName} ${response.lastName} added to the database!`);
                    startApp();
                })
            })
        })
    })
};

// Update employee role function
updateEmployee = () => {
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id}));

        inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                message: 'Select the employee to update.',
                choices: employees
            },
            {
                name: 'newRole',
                type: 'rawlist',
                message: "Please select the employee's new role.",
                choices: roles
            }
        ])
            .then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`,
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        id: response.employee,
                    }
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee's role has been updated!`);
                    startApp();
                })
            })
        })
    }) 
}