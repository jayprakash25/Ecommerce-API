// const expressJwt = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv/config");

const authJwt = () => {
  const secret = process.env.secret;
  return jwt({
    secret,
    algorithms: ["HS256"],
  });
};

module.exports = authJwt;
