// const expressJwt = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv/config");

const authJwt = () => {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/ecommerce\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/ecommerce\/category(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/user/login`,
      `${api}/user/register`,
    ],
  });
};

const isRevoked = (req, payload, done) => {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
};

module.exports = authJwt;
