// Requirements:
// https://courses.bootcampspot.com/courses/2188/assignments/38676?module_item_id=748551
//
// AS A developer
// I WANT a README generator
// SO THAT I can quickly create a professional README for a new project
//
// GIVEN a command-line application that accepts user input:
// [x] WHEN I am prompted for information about my application repository
//     THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// [x] WHEN I enter my project title
//     THEN this is displayed as the title of the README
// [x] WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
//     THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// [x] WHEN I choose a license for my application from a list of options
//     THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// [x] WHEN I enter my GitHub username
//     THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// [x] WHEN I enter my email address
//     THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// [x] WHEN I click on the links in the Table of Contents
//     THEN I am taken to the corresponding section of the README

const fs = require ("fs")
const inquire = require ("inquirer")

// Prompts.
const prompts = [
  { message: "Enter the GitHub user or org that owns your project.",
    type:    "input",
    name:    "owner",
    validate(answer) {
      if (!answer) { return "Please enter a user or org." }
      else { return true }
    },
  },
  { message: "Enter your project’s GitHub repo.",
    type:    "input",
    name:    "repo",
    validate(answer) {
      if (!answer) { return "Please enter a repo." }
      else { return true }
    },
  },
  { message: "Enter your project’s contact email address.",
    type:    "input",
    name:    "email",
    validate(answer) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(answer)) { return "Please enter a valid email address." }
      else { return true }
    },
  },
  { message: "Enter your project’s name.",
    type:    "input",
    name:    "name",
    validate(answer) {
      if (!answer) { return "Please enter a name." }
      else { return true }
    },
  },
  { message: "Enter your project’s description.",
    type:    "editor",
    name:    "description",
    default: "", // todo
    validate(answer) {
      if (!answer) { return "Please enter a description." }
      else { return true }
    },
  },
  { message: "List your project’s features.",
    type:    "editor",
    name:    "features",
    default:
      "- Feature 1\n" +
      "- Feature 2\n" +
      "- Feature 3",
  },
  { message: "Tell others how to install your project.",
    type:    "editor",
    name:    "installation",
    default:
      "1. Step 1\n" +
      "2. Step 2\n" +
      "3. Step 3",
  },
  { message: "Tell others how to use your project.",
    type:    "editor",
    name:    "usage",
    default: "", // todo
  },
  { message: "Tell others how to contribute to your project.",
    type:    "editor",
    name:    "contribute",
    default: "", // todo
  },
  { message: "Tell others how to test their contributions.",
    type:    "editor",
    name:    "tests",
    default: "", // todo
  },
  { message: "Tell others who deserves credit.",
    type:    "editor",
    name:    "credits",
    default: "", // todo
  },
  { message: "Choose a license.",
    type:    "list",
    choices: ["GNU GPLv3", "MIT"],
    name:    "license",
  },
]

// Prompt the user and use their answers to create a new README.md file.
function promptAndWrite() {
  inquire
  .prompt(prompts)
  .then((answers) => {
    // Read the template README and save it to new varialbe.
    let template = fs.readFileSync("./input/README.md", "utf8")
    // Replace all template values with the user’s answers.
    for (const [key, value] of Object.entries(answers)) {
      template = template.replaceAll(`{${key}}`, value)
    }
    // Copy the appropriate LICENSE to the output folder.
    if (answers.license === "GNU GPLv3") {
      fs.copyFileSync("./input/licenses/GNU GPLv3", "./output/LICENSE")
    } else if (answers.license === "MIT") {
      fs.copyFileSync("./input/licenses/MIT", "./output/LICENSE")
    }
    // Write the new README to the output folder.
    fs.writeFileSync("./output/README.md", template)
    // Print a thank-you message and summary.
    console.log(
      "Thank you for using the README Generator. Your README and LICENSE are in the output/ folder!\n" +
      "Here’s a summary of your answers:"
    )
    console.log(answers)
  })
}

promptAndWrite()

// For later use, possibly:
// console.log(Object.values(prompts)[0].prompt) // "Enter the name of your project."
// console.log(Object.keys(prompts)[0]) // "input"
// console.log(Object.keys(prompts)[0].length) // 9
