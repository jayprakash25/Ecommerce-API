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

// const isRevoked = async (req, payload, done) => {
//   console.log(payload);
//   if (payload.isAdmin == true) {
//     done();
//   } else {
//     done(null, true);
//   }
// };
async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

module.exports = authJwt;
