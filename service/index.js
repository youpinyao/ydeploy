const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const spawn = require("cross-spawn");

function start(_port) {
  const port = _port || "8888";
  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // respond with "hello world" when a GET request is made to the homepage
  app.post("/deploy", function(req, res) {
    // console.log(req.body);
    try {
      process.chdir(process.cwd());
      const data = spawn.sync("git", ["pull"]);
      const stdout = data.stdout.toString();
      const stderr = data.stderr.toString();

      console.log("------");
      console.log(stdout);
      console.log(stderr);
      console.log("------");

      if (!!stderr) {
        res.status(500).send(stderr);
      } else {
        res.status(200).send(stdout);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.listen(port, () => console.log(`ydeploy app listening on port ${port}!`));
}

module.exports = {
  start
};
