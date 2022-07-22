const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const fs = require('fs');
const Html = require("./util/generateHtml");



//var for storage to hold team members
let team=[];

//start the function
function start(){
    console.log("Please build your team");
    inquirer.prompt([
        {
            name: 'managerName',
            type: 'input',
            message:'What is the team manager\'s name?'
        },
        {
            name: 'managerId',
            type: 'input',
            message:'What is the team manager\'s ID?'
        },
        {
            name: 'managerEmail',
            type: 'input',
            message:'What is the team manager\'s email?'
        },
        {
            name: 'managerOffice',
            type: 'input',
            message:'What is the team manager\'s office number?'
        },
    ])
    .then(ans=>{
        JSON.stringify(ans);
        let manager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOffice);
        manager.getRole();
        console.log(manager.role);
        team.push(manager);
        console.log(manager);
        console.log(team);
        choices();
    })
}

function choices(){
    inquirer.prompt([
        {
            name: 'teamMember',
            type: 'list',
            message: 'Choose a team member to add:',
            choices: ["Intern", "Engineer", "I don't want to add another member"],
        }
    ])
    .then(ans=>{
        JSON.stringify(ans);
        if(ans.teamMember === "Intern"){
            genIntern();
        } else if(ans.teamMember === "Engineer"){
            genEngineer();
        } else{
            generateHtml();
        }
    })

}

function genIntern(){
    inquirer.prompt([
        {
            name: 'internName',
            type: 'input',
            message: 'Enter intern\'s name:',
        },
        {
            name: 'internId',
            type: 'input',
            message: 'Enter Intern ID',
        },
        {
            name:'internEmail',
            type: 'input',
            message: 'Enter Intern\'s email',
        },
        {
            name:'internSchool',
            type: 'input',
            message: 'Enter Intern\'s School:',
        },
    ])
    .then(ans=>{
        JSON.stringify(ans);
        let intern = new Intern(ans.internName, ans.internId, ans.internEmail, ans.internSchool);
        team.push(intern);
        choices();

    })
}

function genEngineer(){
    inquirer.prompt([
        {
            name: 'engineerName',
            type: 'input',
            message: 'Enter Engineer\'s name:',
        },
        {
            name: 'engineerId',
            type: 'input',
            message: 'Enter Engineer ID',
        },
        {
            name:'engineerEmail',
            type: 'input',
            message: 'Enter Engineer\'s email',
        },
        {
            name:'engineerGithub',
            type: 'input',
            message: 'Enter Engineer\'s GitHub:',
        },
    ])
    .then(ans=>{
        JSON.stringify(ans);
        let engineer = new Engineer(ans.engineerName, ans.engineerId, ans.engineerEmail, ans.engineerGithub);
        team.push(engineer);
        choices();

    })
}

console.log(team);

function generateHtml(fileName, data){
    
    
    fs.writeFile(`./dist/index.html`, Html(team), (error, data)=>{
        if(error){
            console.log(error);
        } else {
            console.log("Successfully created your team!");
        }
    })
}

start();