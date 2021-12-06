const { ServerErrorResponse, FailedResponse } = require("../helper/response");
const jwt = require("jsonwebtoken");
require("dotenv");

module.exports = {
  isAuthenticated: async (req, res, next) => {
    try {
      const authToken = req.header("Authorization");
      let tokenType = authToken.split(" ")[0].trim();
      let jwtToken = authToken.split(" ")[1].trim();
      if (authToken) {
        if (tokenType === "Bearer") {
          const decode = await jwt.verify(jwtToken, process.env.SECRET_KEY);
          if (decode) {
            req.decode = decode;
            next();
          } else {
            FailedResponse(res, {}, "token has been expired");
          }
        } else {
          FailedResponse(res, {}, "invalid token");
        }
      } else {
        FailedResponse(res, {}, "token not found");
      }
    } catch (error) {
      console.log(error);
      ServerErrorResponse(res, error);
    }
  },
};
