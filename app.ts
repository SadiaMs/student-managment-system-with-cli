#!/usr/bin/env ts-node

import inquirer from "inquirer";

class Student {
    id: string;
    name: string;
    coursesEnroll: string[];
    feesAmount: number;

    constructor(id: string, name: string, coursesEnroll: string[], feesAmount: number) {
        this.id = id;
        this.name = name;
        this.coursesEnroll = coursesEnroll;
        this.feesAmount = feesAmount;
    }
}

let baseID = 10000;
let studentID: string = "";
let continueEnrollment = true;
let students: Student[] = [];

(async () => {
    do {
        let action = await inquirer.prompt({
            type: "list",
            name: "answer",
            message: "What would you like to do?\n",
            choices: ["Enroll a Student", "Show student status"]
        });

        if (action.answer === "Enroll a Student") {
            let studentName = await inquirer.prompt({
                type: "input",
                name: "studentName",
                message: "Enter Student Name:"
            });
            let trimmedStudentName = (studentName.studentName).trim().toLowerCase();
            let studentNamesCheck = students.map(obj => obj.name);

            if (!studentNamesCheck.includes(trimmedStudentName)) {
                if (trimmedStudentName !== "") {
                    baseID++;
                    studentID = "STID" + baseID;
                    console.log("\n\tYour account has been created");
                    console.log(`Welcome to, ${trimmedStudentName}!`);
                    let course = await inquirer.prompt({
                        type: "list",
                        name: "answer",
                        message: "Choose a course to enroll",
                        choices: ["typescript", "react", "Python", "JavaScript"]
                    });
                    let courseFees = 0;
                    switch (course.answer) {
                        case "typescript":
                            courseFees = 100;
                            break;
                        case "react":
                            courseFees = 200;
                            break;
                        case "Python":
                            courseFees = 300;
                            break;
                        case "JavaScript":
                            courseFees = 400;
                            break;
                    }
                    let courseConfirm = await inquirer.prompt({
                        type: "confirm",
                        name: "answer",
                        message: "Are you sure you want to enroll in this course?",
                        default: true
                    });
                    if (courseConfirm.answer === true) {
                        let newStudent = new Student(studentID, trimmedStudentName, [course.answer], courseFees);
                        students.push(newStudent);
                        console.log(`You have been enrolled in ${course.answer}`);
                    }
                } else {
                    console.log("Please enter a valid name");
                }
            } else {
                console.log("This name is already taken");
            }
        } else if (action.answer === "Show student status") {
            if (students.length !== 0) {
                let studentNamesCheck = students.map(e => e.name);

                let selectedStudent = await inquirer.prompt({
                    type: "list",
                    name: "answer",
                    message: "Please select name ",
                    choices: studentNamesCheck
                });

                let foundStudent = students.find(student => student.name === selectedStudent.answer);
                console.log("student information");
                console.log(foundStudent);
                console.log("\n");
            } else {
                console.log("Record not found");
            }
        }

        let userConfirm = await inquirer.prompt({
            type: "confirm",
            name: "answer",
            message: "Would you like to continue?",
            default: true
        });
        if (userConfirm.answer === false) {
            continueEnrollment = false;
        }
    } while (continueEnrollment);
})();
