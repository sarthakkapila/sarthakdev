#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";

// ASCII Logo
const asciiLogo = `
⠀⠀⠀⠀⠀⠀⠀⢀⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⣀⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣄⣠⣤⣤⣤⣴⠖⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣤⣄⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠓⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣏⡏⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣀⣀⣀⣀⠀
⣄⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠁⠀
⣿⣷⣦⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⢹⣿⣿⣿⣿⣿⡟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀
⣜⣻⣿⣷⡀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠈⣿⣿⣿⣿⣿⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀
⣿⣿⣿⣿⣷⡠⣤⠾⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠸⡇⢹⣿⣿⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠆
⣿⣿⣿⣿⣿⣧⠤⢤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠈⠓⠤⣀⠀⠀⠈⠀⢿⣿⠀⠀⠈⡿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
⣿⣿⣿⣿⣿⣿⡆⣼⣿⣿⡿⢹⠛⡝⣿⣿⡏⣼⠃⠀⠀⠀⠀⠀⠈⠙⠀⠀⠀⠈⠛⠀⠀⠀⠃⢻⣿⣿⣿⣿⣿⣿⣿⡀⠀
⣿⣿⣿⣿⣿⣿⡿⠟⢻⣿⡇⠈⣉⣻⠾⡿⠀⠃⠀⣤⡶⠾⠿⣶⣄⠀⠀⠀⠀⠀⢀⠄⠲⠞⠉⢹⡟⢹⣿⣿⣿⡟⠿⠧⠀
⣿⣻⣿⣿⣿⣿⣿⡀⠺⣿⣿⡄⢧⣼⢀⡇⠀⠀⠀⠉⠁⠀⠀⠀⠉⠀⠀⠀⠀⠀⡏⠀⣀⣀⣀⠈⠀⢸⣿⣿⣿⡇⠀⠀⠀
⣵⣿⣿⣿⣿⣿⡿⣿⣆⣿⠿⣿⣮⡙⢿⡃⠀⢠⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡷⠀⠉⠉⠹⠇⠀⣾⣿⠛⢿⣷⠀⠀⠀
⣿⣿⣿⣿⣿⣿⡇⢻⣿⣆⢀⡿⠋⠙⢺⡇⠀⠀⣿⠉⠛⠓⠒⠤⠤⣀⣀⡀⠀⠊⠀⠉⠛⠓⠒⠒⣼⣿⠇⠀⠀⠈⠃⠀⠀
⣿⣿⣿⣿⣿⣿⣇⣿⣿⣿⡉⠀⠀⠀⠈⣿⡄⠀⠹⣦⣼⠤⠤⠄⣀⣀⠀⠈⠉⠉⠙⠲⢶⠆⠀⣼⠗⠁⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⣿⣻⣦⡀⠙⠣⣄⠀⠀⠀⠀⠉⠙⠒⢶⣼⣴⣯⣤⣼⣍⣀⣀⣀⣀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠸⣿⣿⣿⣦⣀⠈⠓⠦⣄⣀⡀⠀⢀⣠⠿⠃⣠⠞⠁⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠸⣿⣿⣿⣿⣿⣷⣦⣄⡀⠀⠉⣉⣡⠤⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⡟⣿⣿⣿⣧⡀⠀⠈⢿⣿⣿⣿⡟⠉⠀⠀⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣹⣿⣿⣿⡿⢿⣄⠀⠈⢻⣾⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⡟⢻⠛⣿⣿⣿⣿⡀⠻⣷⣴⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;
const details = {
  name: chalk.cyan("      Sarthak Kapila"),
  occupation: chalk.magenta("    Full Stack Web Developer passionate about Web3 and Blockchain technologies."),
  website: chalk.blue(`https://sarthakkapila.xyz`),
  github: chalk.green(`https://github.com/sarthakkapila`),
  twitter: chalk.cyan(`https://twitter.com/sarthakkapila0`),
  email: chalk.red(`    sarthakkapila1@gmail.com`),
  languages: {
    Typescript: { icon: "🟦", color: chalk.blueBright },
    Python: { icon: "🐍", color: chalk.green },
    Solidity: { icon: "👽", color: chalk.blue },
    Rust: { icon: "🦀", color: chalk.red },
  },
  frameworks: {
    NextJs: { icon: "🌐 ", color: chalk.yellow },
    ExpressJs: { icon: "🚂", color: chalk.blueBright },
    TailwindCss: { icon: "🍃", color: chalk.green },
    Hardhat: { icon: "🧢", color: chalk.blue },
    Langchain: { icon: "⛓️‍💥", color: chalk.red },
  },
  others: {
    Docker: { icon: "🐳", color: chalk.blue },
    mongodb: { icon: "🍃", color: chalk.green },
    PostgreSQL: { icon: "🐘", color: chalk.blue },
    Git: { icon: "🐙", color: chalk.blue },
    Jenkins: { icon: "🛎️", color: chalk.blue },
  }
};

const languagesArray = Object.entries(details.languages);
const frameworksArray = Object.entries(details.frameworks);
const othersArray = Object.entries(details.others);

const languagesRows = [];
const frameworksRows = [];
const othersRows = [];

for (let i = 0; i < languagesArray.length; i += 4) {
  const slicedLanguages = languagesArray.slice(i, i + 4);
  const row = slicedLanguages
    .map(([lang, { icon, color }]) => `${color(`${icon} ${lang}`)}`)
    .join(" ");
  languagesRows.push(row);
}

for (let i = 0; i < frameworksArray.length; i += 4) {
  const slicedFrameworks = frameworksArray.slice(i, i + 4);
  const row = slicedFrameworks
    .map(([lang, { icon, color }]) => `${color(`${icon} ${lang}`)}`)
    .join(" ");
  frameworksRows.push(row);
}

for (let i = 0; i < othersArray.length; i += 4) {
  const slicedOthers = othersArray.slice(i, i + 4);
  const row = slicedOthers
    .map(([lang, { icon, color }]) => `${color(`${icon} ${lang}`)}`)
    .join(" ");
  othersRows.push(row);
}

const info = [
  `${chalk.bold("🦷 Name:")}${details.name}`,
  `${chalk.bold("💡 About:")} ${details.occupation}`,
  `${chalk.bold("🌐 Website:")}   ${details.website}`,
  `${chalk.bold("🐙 GitHub:")}    ${details.github}`,
  `${chalk.bold("🐦 Twitter:")}   ${details.twitter}`,
  `${chalk.bold("📧 Email:")} ${details.email}`,
  `${chalk.bold("💻 Languages:")}`,
  ...languagesRows,
  `${chalk.bold("🔧 Frameworks:")}`,
  ...frameworksRows,
  `${chalk.bold("🔧 Others:")}`,
  ...othersRows,
];

const asciiLogoLines = asciiLogo.trim().split("\n");
const infoLines = info;

const logoWidth = Math.max(...asciiLogoLines.map((line) => line.length));
const detailsWidth = Math.max(...infoLines.map((line) => line.length));
logoWidth + 4 + detailsWidth;

const outputLines = [];
for (let i = 0; i < Math.max(asciiLogoLines.length, infoLines.length); i++) {
  const logoLine = asciiLogoLines[i] || "";
  const infoLine = infoLines[i] || "";
  const paddedLogoLine = logoLine.padEnd(logoWidth, " ");
  outputLines.push(`${paddedLogoLine}    ${infoLine}`);
}

const output = outputLines.join("\n");

const message = boxen(output, { padding: 1, margin: 1, borderStyle: "classic" });

console.log(message);