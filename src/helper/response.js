module.exports = {
  CreatedResponse: (res, data, message = "Data saved sucessfully") => {
    res.status(201).json({
      status: true,
      code: 201,
      response_body: data,
      message,
    });
  },
  OkResponse: (res, data, message = "Data fetched sucessfully") => {
    res.status(200).json({
      status: true,
      code: 200,
      response_body: data,
      message,
    });
  },
  BadRequestResponse: (res, err, message = "Bad Request") => {
    res.status(400).json({
      status: false,
      code: 400,
      err,
      message,
    });
  },
  UnauthorizedResponse: (res, err, message = "Unauthorized User") => {
    res.status(401).json({
      status: false,
      code: 401,
      err,
      message,
    });
  },
  PaymentRequiredResponse: (res, err, message = "Payment Required") => {
    res.status(402).json({
      status: false,
      code: 402,
      err,
      message,
    });
  },
  NotFoundResponse: (res, err, message = "Not Found") => {
    res.status(404).json({
      status: false,
      code: 404,
      err,
      message,
    });
  },
  ForbiddenResponse: (res, err, message = "Access Forbidden") => {
    res.status(403).json({
      status: false,
      code: 403,
      err,
      message,
    });
  },
  ServerErrorResponse: (res, err, message = "Internal Server Error") => {
    res.status(500).json({
      status: false,
      code: 500,
      err,
      message,
    });
  },
};
