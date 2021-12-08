#!/usr/bin/env node

var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");
var ejs = require("ejs");
var chalk = require("chalk");

var program = require("commander");
var process1 = require("child_process");
//version 版本号
//name 新项目名称
program
  .version(`v${require("./package.json").version}`, "-v, --version")
  .command("init <name>")
  .description("init a new project")
  .action(async (name) => {
    console.log("create project " + chalk.green(name) + " ...");

    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Your Name",
        default: "Your Name",
      },
    ]);

    //__dirname 代码运行所在目录
    const destUrl = path.join(__dirname, "templates");
    // process.cwd() 对应控制台所在目录
    // const cwdUrl = path.join(process.cwd(), name);
    const cwdUrl = process.cwd();
    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      console.log("copy file ...");
      files.forEach((file) => {
        ejs.renderFile(path.join(destUrl, file), answers).then((data) => {
          const filePath = path.join(cwdUrl, file);
          console.log(chalk.yellow(file) + ": " + filePath);
          //   fs.mkdirSync(path.dirname(filePath))
          fs.writeFileSync(filePath, data);
        });
      });
    });
    // process1.exec(
    //   "git clone https://github.com/solidjs/solid-docs.git " + name,
    //   function (error, stdout, stderr) {
    //     if (error !== null) {
    //       console.log("exec error: " + error);
    //       return;
    //     }
    //     console.log(stdout);
    //     console.log("clone success");
    //   }
    // );
  });
program.parse(process.argv);
