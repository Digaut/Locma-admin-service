const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { default: axios } = require("axios");
const secretkey = process.env.SECRET_KEY || "secretkey";

const Admin = require("../model/admin");
const {
  CreatedResponse,
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
  PaymentRequiredResponse,
  NotFoundResponse,
  ForbiddenResponse,
  ServerErrorResponse,
  ServiceUnavilableResponse,
  FailedResponse,
} = require("../helper/response");

module.exports = {
  create: async (req, res) => {
    try {
      var {
        name,
        username,
        address,
        email,
        mobileNo,
        password,
        city,
        state,
        pincode,
      } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          FailedResponse(res, err, "salt could not generated");
        }
        if (salt) {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              FailedResponse(res, err, "password could not encrypted");
            }
            if (hash) {
              var admin = new Admin({
                name,
                email,
                mobileNo,
                password: hash,
                username: email,
                city,
                state,
                pincode,
                address,
              });
              console.log(admin);

              admin.save((err, result) => {
                if (err) {
                  FailedResponse(res, err, "something went wrong");
                }
                if (result) {
                  OkResponse(res, result, "Admin created successfully");
                }
              });
            }
          });
        }
      });
    } catch (err) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  getAdmin: async (req, res) => {
    try {
      const { email } = req.decode || req.body;
      const response = await Admin.find({ email });
      if (response) {
        OkResponse(res, response, "admin get successfully");
      } else {
        FailedResponse(res, response, "user");
      }
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const {
        name,
        username,
        email,
        mobileNo,

        city,
        address,
        state,
        pincode,
      } = req.body;
      const response = await Admin.updateOne(
        { email: email },
        {
          name: name,
          username: username,
          email: email,
          mobileNo: mobileNo,
          city: city,
          state: state,
          pincode: pincode,
          address: address,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "admin updated successfully");
      } else {
        FailedResponse(res, response, "admin could not updated successfully");
      }
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      console.log(email, username);
      const response = await Admin.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (response) {
        bcrypt.compare(password, response.password, (err, result) => {
          if (result) {
            jwt.sign(
              { email, username, id: response._id, city: response.city },
              process.env.SECRET_KEY,
              { expiresIn: "1d" },
              (err, token) => {
                if (err) {
                  FailedResponse(res, err, "token could not created");
                }
                if (token) {
                  OkResponse(res, { token }, "token created successfully");
                }
              }
            );
          } else {
            FailedResponse(res, err, "password is incorrect");
          }
        });
        // OkResponse(res, response, "find successfuly");
      } else {
        FailedResponse(res, response, "username and password are wrong");
      }
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },

  // login: async (req, res) => {
  //   try {
  //     const { username, password, rememberMe } = req.body;
  //     const admin = await Admin.findOne({
  //       $or: [{ username: username }, { email: username }],
  //     });
  //     if (!admin) {
  //       return UnauthorizedResponse(res, null, "username or password is wrong");
  //     }
  //     bcrypt.compare(password, admin.password, (err, result) => {
  //       if (err || !result) return UnauthorizedResponse(res, err);
  //       if (!vendor.activated) {
  //         sendOTP(vendor.email);
  //         return ForbiddenResponse(
  //           res,
  //           null,
  //           "user not activated please check email for otp"
  //         );
  //       }
  //       const data = {
  //         data: {
  //           id: admin._id,
  //           username: admin.username,
  //           matoken: process.env.MSTOKEN,
  //         },
  //       };
  //       if (!rememberMe)
  //         data.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  //       jwt.sign(
  //         data,
  //         process.env.SECRET_KEY || "secret",
  //         { expiresIn: "1w" },
  //         (err, token) => {
  //           if (err) throw Error("Server Error");
  //           var result = {
  //             token: token,
  //             expiresIn: rememberMe ? "Never" : "One week",
  //           };
  //           return OkResponse(res, result, "Log in sucessfull");
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return ServerErrorResponse(res, error);
  //   }
  // },

  other: async function (req, res) {
    console.log("[URL]: \t", req.url);
    let requestOptions = {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      params: req.params,
      query: req.query,
      data: req.body,
    };
    if (req.headers.authorization) {
      requestOptions.headers["authorization"] = req.headers.authorization;
    }
    if (req.url.indexOf("/api/v1/vendor") != -1) {
      requestOptions.url = apiConfig().VENDER_BASE_URL + req.url;
    } else if (req.url.indexOf("/api/v1/user") != -1) {
      requestOptions.url = apiConfig().USER_BASE_URL + req.url;
    } else if (req.url.indexOf("/api/v1/payment") != -1) {
      requestOptions.url = apiConfig().PAYMENT_BASE_URL + req.url;
    } else if (req.url.indexOf("/api/v1/delivery") != -1) {
      requestOptions.url = apiConfig().DELIVERY_BASE_URL + req.url;
    } else {
      return serverErrorResponse(res, new Error("Service Not Found"));
    }
    console.log(requestOptions);
    axios(requestOptions)
      .then((response) => {
        if (response.headers.authorization) {
          res.setHeader("Authorization", response.headers.authorization);
        }
        switch (response.data.code) {
          case 200:
            return OkResponse(
              res,
              response.data.response_body,
              response.data.message
            );
          case 201:
            return CreatedResponse(res, response.data.response_body);
          default:
            throw Error("Internal Server Error");
        }
      })
      .catch((error) => {
        console.log("\n------------------------\n" + Object.keys(error));
        var code = NaN;
        if (error.response && error.response.status) code = error.response.code;
        if (code) {
          switch (code) {
            case 400:
              return BadRequestResponse(res, error.response.data.err);
            case 401:
              return UnauthorizedResponse(res, error.response.data.err);
            case 402:
              return PaymentRequiredResponse(res, error.response.data.err);
            case 404:
              return NotFoundResponse(res, error.response.data.err);
            case 403:
              return ForbiddenResponse(res, error.response.data.err);
            case 500:
              return ServerErrorResponse(res, error.response.data.err);
            default:
              return ServiceUnavilableResponse(res, error.response.data.err);
          }
        } else if (error.request) {
          return ServiceUnavilableResponse(res, error.toJSON);
        } else {
          console.log(error.message);
          return ServerErrorResponse(res, error, error.message);
        }
      });
  },
};
