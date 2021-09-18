// Begin with a clear console
console.clear();

// Included packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// If user selects Markdown Only as their template this is the generated README.md content
// (This is helpful for cases where the README.md file must use Markdown syntax)
const generateMD = (answers) => `
${answers.name}
# Description:
${answers.description}

## About this Project
${answers.about}

## Vision:
${answers.vision}

## Technologies:
${answers.tech}

## Credits
${answers.credits}

## Licences:
${answers.Licence}

`;

// If user selects HTML/Markdown as their template this is the generated README.md content
// (This is helpful for GitHub README.md files as GitHub allows for HTML syntax)
const generateHyperMD = (answers) => `
<h1 align="center">${answers.name}</h1>
<img src="(ENTER IMG LINK HERE)" width="100%">
<h2 align="center"><a href="(ENTER LIVE DEMO LINK HERE)">Live Demo</a></h2>

## Description
<p align="center">
<img src="(ENTER LINK FOR GIF OF PROJECT)" width 80%>
</p>
${answers.description}

## About the Project
${answers.about}

## Technologies used
${answers.tech}

## Credits
${answers.credits}

## Future Scope
${answers.vision}

## Licence
${answers.licence}

`;

// The array of questions used to prompt the user for input
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
      name: "credits",
      message: "Please list any collaborators you would like to include:",
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

  // The answers are recorded to variables for use in the conditional
  .then((answers) => {
        const hyperPageContent = generateHyperMD(answers);
        const mdPageContent = generateMD(answers);
        // If the users answer is equal to the selection for Markdown only template then write the 
        // README.md file using the const mdPageContent
        
        if(answers.includeHypertext == "Markdown only template (no HTML)"){
        fs.writeFile("README.md", mdPageContent, (err) =>
        err ? console.log(err) : console.log("Successfully created README.md!"));

        // If the users answer is equal to the selection for HTML/Markdown template then write the 
        // README.md file using the const hyper
        } else if
        (answers.includeHypertext === "HTML/Markdown template (ex: For GitHub)"){
        fs.writeFile("README.md", hyperPageContent, (err) =>
        err ? console.log(err) : console.log("Successfully created README.md!"));
      
        } else {
        return console.log("Ya gotta do something man!");
    }});