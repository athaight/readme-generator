// TODO: Include packages needed for this application
console.clear();
const inquirer = require("inquirer");
const fs = require("fs");

const generateMD = (answers) => `
${answers.includeHypertext}
${answers.name}
# Description:
${answers.description}
## About this Project
${answers.about}
## Vision:
${answers.vision}
## Technologies:
${answers.tech}
## Licences:
${answers.Licence}

`;

const generateHyperMD = (answers) => `
<h1 align="center">${answers.name}</h1>
<img src="(ENTER IMG LINK HERE)" width="100%">
<h2 align="center"><a href="(ENTER LIVE DEMO LINK HERE)">Live Demo</a></h2>

### Contributions are Welcome

## Description
<p align="center">
<img src="(ENTER LINK FOR GIF OF PROJECT)" width 80%>
</p>
${answers.description}

## About the Project
${answers.about}

## Technologies used
${answers.tech}

## Future Scope
${answers.vision}

## Licence
${answers.licence}

`;

// TODO: Create an array of questions for user input
inquirer
  .prompt([
    {
      type: "list",
      name: "includeHypertext",
      choices: ["HTML/Markdown template (ex: For GitHub)", "Markdown only template (no HTML)"],
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Value required to continue";
        }
      },
    },
    {
      type: "input",
      name: "name",
      message: "What is the project name?",
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of the project:",
    },
    {
        type: "input",
        name: "about",
        message: "What would you like to inlcude in the 'About this project' section?",
      },
    {
      type: "input",
      name: "tech",
      message: "What technologies were used?",
    },
    {
      type: "input",
      name: "vision",
      message: "What is your vision for future development?",
    },
    {
      type: "list",
      name: "licence",
      choices: [
        "MIT Licence",
        "GPL Licence",
        "Apache Licence",
        "GNU License",
        "N/A",
      ],
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Value required to continue";
        }
      },
    },
  ])

  .then((answers) => {
        const hyper = generateHyperMD(answers);
        const mdPageContent = generateMD(answers);
        
        if(answers.includeHypertext == "Markdown only template (no HTML)"){
        fs.writeFile("README.md", mdPageContent, (err) =>
        err ? console.log(err) : console.log("Successfully created README.md!"));

        } else if
        (answers.includeHypertext === "HTML/Markdown template (ex: For GitHub)"){
        fs.writeFile("README.md", hyper, (err) =>
        err ? console.log(err) : console.log("Successfully created README.md!"));
      
        } else {
        return console.log("Ya gotta do something man!");
    }});