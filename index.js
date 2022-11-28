// Requirements:
// https://courses.bootcampspot.com/courses/2188/assignments/38676?module_item_id=748551
//
// AS A developer
// I WANT a README generator
// SO THAT I can quickly create a professional README for a new project
//
// GIVEN a command-line application that accepts user input:
// [ ] WHEN I am prompted for information about my application repository
//     THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// [x] WHEN I enter my project title
//     THEN this is displayed as the title of the README
// [ ] WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
//     THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// [ ] WHEN I choose a license for my application from a list of options
//     THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// [ ] WHEN I enter my GitHub username
//     THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// [ ] WHEN I enter my email address
//     THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// [ ] WHEN I click on the links in the Table of Contents
//     THEN I am taken to the corresponding section of the README

const fs = require ("fs")
const inquire = require ("inquirer")

// Prompts.
const prompts = [
  { message: "Enter your project’s name.",
    type:    "input",
    name:    "name",
    validate(answer) {
      if (!answer) {
        return "Please enter your project’s name."
      } else {
        return true
      }
    },
  },
  { message: "Enter a description.",
    type:    "editor",
    name:    "description",
    validate(answer) {
      if (!answer) {
        return "Please enter a description."
      } else {
        return true
      }
    },
  },
  { message: "Tell others how to install your project.",
    type:    "editor",
    name:    "installation",
  },
  { message: "Tell others how to use your project.",
    type:    "editor",
    name:    "usage",
  },
  { message: "Tell others how to contribute to your project.",
    type:    "editor",
    name:    "contribute",
  },
  { message: "Tell others how to test their contributions.",
    type:    "editor",
    name:    "tests",
  },
  { message: "Choose a license.",
    type:    "list",
    choices: ["MIT"],
    name:    "license",
  },
  { message: "Enter your GitHub username.",
    type:    "input",
    name:    "github",
    validate(answer) {
      if (!answer) {
        return "Please enter your GitHub username."
      } else {
        return true
      }
    },
  },
  { message: "Enter your email address.",
    type:    "input",
    name:    "email",
    validate(answer) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(answer)) {
        return "Enter a valid email address."
      } else {
        return true
      }
    },
  },
]

// Prompt the user and use their answers to create a new README.md file.
function promptAndWrite() {
  inquire
  .prompt(prompts)
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

// For later use, possibly:
// console.log(Object.values(prompts)[0].prompt) // "Enter the name of your project."
// console.log(Object.keys(prompts)[0]) // "input"
// console.log(Object.keys(prompts)[0].length) // 9
