#!/usr/bin/env node

const commander = require("commander");
const service = require("../service/index");
const deploy = require("../deploy/index");

commander
  .version(require("../package.json").version)
  .option("--serve, serve [port]", "start server")
  .option("--deploy, deploy <uri>", "do deploy", uri => {
    deploy.exec(uri);
  })
  .parse(process.argv);

if (commander.serve) {
  service.start(commander.serve === true ? "" : commander.serve);
}

// 默认输入帮助
if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
