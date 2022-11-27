// Requirements:
// https://courses.bootcampspot.com/courses/2188/assignments/38676?module_item_id=748551
//
// AS A developer
// I WANT a README generator
// SO THAT I can quickly create a professional README for a new project
//
// GIVEN a command-line application that accepts user input:
// - WHEN I am prompted for information about my application repository
//   THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// - WHEN I enter my project title
//   THEN this is displayed as the title of the README
// - WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
//   THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// - WHEN I choose a license for my application from a list of options
//   THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// - WHEN I enter my GitHub username
//   THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// - WHEN I enter my email address
//   THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// - WHEN I click on the links in the Table of Contents
//   THEN I am taken to the corresponding section of the README

const fs = require ("fs")
const inquire = require ("inquirer")

// Prompt the user and use their answers to create a new README.md file.
function promptAndWrite() {
  inquire
  .prompt([
    { message: "Enter the name of your project.",
      type:    "input",
      name:    "name", },
    { message: "Enter a description.",
      type:    "editor",
      name:    "description", },
    { message: "Tell others how to install your project.",
      type:    "input",
      name:    "install", },
    { message: "Tell others how to use your project.",
      type:    "input",
      name:    "use", },
    { message: "Tell others how to contribute to your project.",
      type:    "input",
      name:    "contribute", },
    { message: "Tell others how to test their contributions.",
      type:    "input",
      name:    "test", },
    { message: "Choose a license.",
      type:    "list",
      choices: ["MIT"],
      name:    "license", },
    { message: "Enter your GitHub username.",
      type:    "input",
      name:    "github", },
    { message: "Enter your email address.",
      type:    "input",
      name:    "email", },
  ])
  .then((answers) => {
    // Read the template file and save it to new varialbe.
    let template = fs.readFileSync("./input/README.md", "utf8")
    // Replace all template values with user’s answers.
    for (const [key, value] of Object.entries(answers)) {
      template = template.replaceAll(`{${key}}`, value)
    }
    // Write result to a new file.
    fs.writeFileSync("./output/README.md", template)
  })
}

promptAndWrite()

// ****************************************************************************************************
// For later use (possibly).

// Why would this be useful? Seems easier to just put everything in the prompt.
// const prompts = [
//   "Enter the name of your project.", // name
//   "Enter a description.", // description
//   "Tell others how to install your project.", // install
//   "Tell others how to use your project.", // use
//   "Tell others how to contribute to your project.", // contribute
//   "Tell others how to test their contributions.", // test
//   "Choose a license.", // license
//   "Enter your GitHub username.", // github
//   "Enter your email address.", // email
// ]

// This seems more useful, but only if I can figure out how to use a for loop inside inquirer (or something like that).
// const prompts = {
//   name: {
//     prompt: "Enter the name of your project.",
//     type: "input",
//   },
//   description: {
//     prompt: "Enter a description.",
//     type: "input",
//   },
//   install: {
//     prompt: "Tell others how to install your project.",
//     type: "input",
//   },
//   use: {
//     prompt: "Tell others how to use your project.",
//     type: "input",
//   },
//   contribute: {
//     prompt: "Tell others how to contribute to your project.",
//     type: "input",
//   },
//   test: {
//     prompt: "Tell others how to test their contributions.",
//     type: "input",
//   },
//   license: {
//     prompt: "Choose a license.",
//     type: "list",
//     choices: ["MIT"],
//   },
//   github: {
//     prompt: "Enter your GitHub username.",
//     type: "input",
//   },
//   email: {
//     prompt: "Enter your email address.",
//     type: "input",
//   },
// }

// Something I could potentially use in the future refactor.
// console.log(Object.values(prompts)[0].prompt) // "Enter the name of your project."
// console.log(Object.keys(prompts)[0]) // "input"
// console.log(Object.keys(prompts)[0].length) // 9
