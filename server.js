// const connection = require('./config/connection');
const inquirer = require('inquirer');
const path = require('path');
const consoleTable = require('console.table');
const queries = require('./lib/queries');
const db = require('./config/connection');
const {
    response
} = require('express');
var sql = "";
// Create an array of questions for user input
const questions = [
    "What would you like to do?",
    "Enter the name of the department:",
    "Enter your name of the role:",
    "What is the salary of this role?",
    "Which department does the role belong to?",
    "Enter the employee's first name:",
    "Enter the employee's last name:",
    "Select employee's role:",
    "Select employee's manager:",
    "Which employee role do you want to update?",
];


const addDepartment = () => {
    inquirer
        .prompt([{
            type: "input",
            message: questions[1],
            name: "departmentName"
        }]).then((response) => {
            sql = `INSERT INTO employee_db.department(name) VALUES('${response.departmentName}')`;
            queries(sql, "Department");
        })
}

const addRole = () => {
    deptList = `SELECT * FROM employee_db.department`;
    var deptChoices = [];
    var deptJson = [];
    db.promise().query(deptList)
        .then(response => {
            if (response[0].length <= 0) {
                console.log("Please add a department to create a new role");
            } else {
                deptJson.push(response[0]);
                response[0].forEach(dept => {
                    deptChoices.push(dept.name);
                });
                inquirer
                    .prompt([{
                            type: "input",
                            message: questions[2],
                            name: "roleName"
                        },
                        {
                            type: "input",
                            message: questions[3],
                            name: "salary"
                        },
                        {
                            type: "list",
                            message: questions[4],
                            name: "department",
                            choices: deptChoices
                        }
                    ]).then((response) => {
                        var deptId;
                        for (var i = 0; i < deptJson[0].length; i++) {
                            if (deptJson[0][i].name == response.department) {
                                deptId = deptJson[0][i].id;
                            };
                        }
                        sql = `INSERT INTO employee_db.role(title, salary, department_id) VALUES('${response.roleName}', '${response.salary}', '${deptId}')`;
                        queries(sql, "Role");
                    })
            }
        })
}

const addEmployee = () => {
    roles = `SELECT distinct(title),id FROM employee_db.role;`;
    var roleList = [];
    var roleNameList = [];
    var managerList = [];
    var managerNameList = ['N/A'];
    db.promise().query(roles)
        .then(response => {
            if (response[0].length <= 0) {
                console.log("Please add a role to add an employee");
            } else {
                roleList.push(response[0]);
                response[0].forEach(role => {
                    roleNameList.push(role.title);
                });
                managers = `SELECT * FROM employee_db.employee;`;
                db.promise().query(managers)
                    .then(response => {
                        if (response[0].length > 0) {
                            managerList.push(response[0]);
                            response[0].forEach(manager => {
                                managerNameList.push(`${manager.first_name} ${manager.last_name}`);
                            });
                        }
                        inquirer
                            .prompt([{
                                    type: "input",
                                    message: questions[5],
                                    name: "firstName"
                                },
                                {
                                    type: "input",
                                    message: questions[6],
                                    name: "lastName"
                                },
                                {
                                    type: "list",
                                    message: questions[7],
                                    name: "role",
                                    choices: roleNameList
                                },
                                {
                                    type: "list",
                                    message: questions[8],
                                    name: "manager",
                                    choices: managerNameList
                                }
                            ]).then((response) => {
                                var roleId;
                                var managerId;
                                for (var i = 0; i < roleList[0].length; i++) {
                                    if (roleList[0][i].title == response.role) {
                                        roleId = roleList[0][i].id;
                                    };
                                }
                                if (response.manager != "N/A") {
                                    for (var i = 0; i < managerList[0].length; i++) {
                                        if (((response.manager).includes(managerList[0][i].first_name)) && ((response.manager).includes(managerList[0][i].last_name))) {
                                            managerId = managerList[0][i].id;
                                        };
                                    }
                                }

                                if (managerId) {
                                    sql = `INSERT INTO employee_db.employee(first_name, last_name, role_id, manager_id) VALUES('${response.firstName}', '${response.lastName}', '${roleId}', '${managerId}')`;
                                    queries(sql, "Employee");
                                } else {
                                    sql = `INSERT INTO employee_db.employee(first_name, last_name, role_id) VALUES('${response.firstName}', '${response.lastName}', '${roleId}')`;
                                    queries(sql, "Employee");
                                }
                            })
                    })
            }
        })
}


function init() {
    inquirer
        .prompt([{
            type: "list",
            message: questions[0],
            name: "activity",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Update Employee Managers",
                "View Employees by Manager",
                "View Employees by Department",
                "Delete a Department",
                "Delete a Role",
                "Delete an Employee",
                "View the Total Utilized Budget of a Department"
            ]
        }]).then((response) => {
            switch (response.activity) {
                case "View All Departments":
                    sql = `SELECT * FROM employee_db.department`;
                    queries(sql);
                    break;
                case "View All Roles":
                    sql = `SELECT * FROM employee_db.role`;
                    queries(sql);
                    break;
                case "View All Employees":
                    sql = `SELECT * FROM employee_db.employee`;
                    queries(sql);
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "Update Employee Managers":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "View Employees by Manager":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "View Employees by Department":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "Delete a Department":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "Delete a Role":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "Delete an Employee":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
                case "View the Total Utilized Budget of a Department":
                    sql = `SELECT * FROM employee_db.department`;
                    break;
            }
        })
}

// Function call to initialize app
init();