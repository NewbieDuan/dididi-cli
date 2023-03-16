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
  .version(`v${require("../package.json").version}`, "-v, --version")
  .command("init <name>")
  .description("init a new project")
  .action(async (name) => {
    console.log("create project " + chalk.green(name) + " ...");

    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Project Name",
        default: "Project Name",
      },
      {
        type: "list",
        name: "version",
        message: "Please choose a version",
        choices: ["ie8", "ie5"],
        default: "ie8",
      },
    ]);

    //__dirname 代码运行所在目录
    const destUrl = path.join(__dirname, "../templates/" + answers.version);
    // process.cwd() 对应控制台所在目录
    const cwdUrl = process.cwd();
    const targetUrl = path.join(cwdUrl, name);
    copyDir(destUrl, targetUrl, (err) => {
      if (err) {
        chalk.red(err);
      }
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

const copyDir = (src, dest, callback) => {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err);
        return;
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item);
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);

            if (stat.isFile()) {
              // 文件，直接复制
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
            } else if (stat.isDirectory()) {
              // 目录，进行递归
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      // 若目标目录不存在，则创建
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};
program.parse(process.argv);
