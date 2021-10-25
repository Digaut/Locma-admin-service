const bcrypt = require('bcrypt');
const SettelmentAmount = require('../model/settelmentAmount');
const { default: axios } = require('axios');

const Admin = require('../model/admin');
const { CreatedResponse,
    OkResponse,
    BadRequestResponse,
    UnauthorizedResponse,
    PaymentRequiredResponse,
    NotFoundResponse,
    ForbiddenResponse,
    ServerErrorResponse,
    ServiceUnavilableResponse,
} = require('../helper/response');

module.exports = {
    create: async (req, res) => {
        try {
            var { name, username, email, mobileNo, password } = req.body;

            var admin = new Admin({
                name,
                email,
                mobileNo,
                password,
                username
            });
            var salt = process.env.SALT || 10;
            bcrypt.genSalt(salt, (err, salt) => {
                if (err) return ServerErrorResponse(res, err, MESSAGE);
                bcrypt.hash(admin.password, salt, async (err, hash) => {
                    if (err) return ServerErrorResponse(res, err, MESSAGE);
                    admin.password = hash;
                    var response = await admin.save();
                    return CreatedResponse(res, response);
                });
            });
        } catch (err) {
            /* handle error */
            console.log(err);
            return ServerErrorResponse(res, err);
        }
    },
    login: async (req, res) => {
        try {
            const { username, password, rememberMe } = req.body;
            const admin = await Admin.findOne({ $or: [{ username: username }, { email: username }] });
            if (!admin) {
                return UnauthorizedResponse(res, null, "username or password is wrong");
            }
            bcrypt.compare(password, admin.password, (err, result) => {
                if (err || !result) return UnauthorizedResponse(res, err);
                if (!vendor.activated) {
                    sendOTP(vendor.email);
                    return ForbiddenResponse(res, null, "user not activated please check email for otp");
                }
                const data = {
                    data: {
                        id: admin._id,
                        username: admin.username,
                        matoken: process.env.MSTOKEN
                    }
                };
                if (!rememberMe)
                    data.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);
                jwt.sign(data, process.env.SECRET_KEY || "secret", { expiresIn: '1w' }, (err, token) => {
                    if (err) throw Error("Server Error");
                    var result = {
                        token: token,
                        expiresIn: (rememberMe) ? "Never" : "One week"
                    };
                    return OkResponse(res, result, "Log in sucessfull");
                });
            });
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }

    },
    createSettelmentAmount: async (req, res) => {
        try {
            var data = req.body;
            var settelment = new SettelmentAmount(data);
            var response = await settelment.save();
            return CreatedResponse(res, response);
        } catch (error) {
            /* handle error */
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    getSettelmentAmount: async (req, res) => {
        try {
            var data = await SettelmentAmount.find();
            return OkResponse(res, data);
        } catch (error) {
            /* handle error */
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    getOneSettelmentAmount: async (req, res) => {
        try {
            var { field, value } = req.body;
            var data = await SettelmentAmount.findOne({ $and: [{ field: field }, { value: value }] });
            return OkResponse(res, data);
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    updateSettelMentAmount: async (req, res) => {
        try {
            var settelmentId = req.body.id;
            var response = await SettelmentAmount.findByIdAndUpdate(settelmentId, req.body);
            return OkResponse(res, response);
        } catch (error) {
            /* handle error */
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    other: async function(req, res) {
        console.log("[URL]: \t", req.url);
        let requestOptions = {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            params: req.params,
            query: req.query,
            data: req.body,
        };
        if (req.headers.authorization) {
            requestOptions.headers["authorization"] = req.headers.authorization;
        }
        if (req.url.indexOf("/api/v1/vendor") != -1) {
            requestOptions.url = apiConfig().VENDER_BASE_URL + req.url;
        }
        else if (req.url.indexOf("/api/v1/user") != -1) {
            requestOptions.url = apiConfig().USER_BASE_URL + req.url;
        }
        else if (req.url.indexOf("/api/v1/payment") != -1) {
            requestOptions.url = apiConfig().PAYMENT_BASE_URL + req.url;
        }
        else if (req.url.indexOf("/api/v1/delivery") != -1) {
            requestOptions.url = apiConfig().DELIVERY_BASE_URL + req.url;
        }
        else {
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
                        return CreatedResponse(
                            res,
                            response.data.response_body
                        );
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
                        case 400: return BadRequestResponse(res, error.response.data.err);
                        case 401: return UnauthorizedResponse(res, error.response.data.err);
                        case 402: return PaymentRequiredResponse(res, error.response.data.err);
                        case 404: return NotFoundResponse(res, error.response.data.err);
                        case 403: return ForbiddenResponse(res, error.response.data.err);
                        case 500: return ServerErrorResponse(res, error.response.data.err);
                        default: return ServiceUnavilableResponse(res, error.response.data.err);
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
