const request = require("request-promise");

function exec(uri) {
  request
    .post({
      method: "POST",
      uri: `${uri}/deploy`
      // form: {
      //   scripts: "[]"
      // }
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  exec
};
