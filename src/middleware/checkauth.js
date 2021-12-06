const { ServerErrorResponse, FailedResponse } = require("../helper/response");
const jwt = require("jsonwebtoken");
require("dotenv");

module.exports = {
  isAuthenticated: async (req, res, next) => {
    try {
      const authToken = req.header("Authorization");
      if (authToken) {
        const decode = await jwt.verify(authToken, process.env.SECRET_KEY);
        if (decode) {
          req.decode = decode;
          next();
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
