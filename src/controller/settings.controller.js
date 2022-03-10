const {
  ServerErrorResponse,
  FailedResponse,
  OkResponse,
} = require("../helper/response");
const settings = require("../model/settings");

module.exports = {
  createSettings: async (req, res) => {
    try {
      console.log(req.body, "checking console");
      const {
        city,
        openingTime,
        closingTime,
        closingMessage,
        isAccepting,
        acceptingMessage,
      } = req.body;
      const response = new settings({
        city: city.toLowerCase(),
        deliveryTiming: {
          openingTime: openingTime,
          closingTime: closingTime,
          closingMessage: closingMessage,
        },
        acceptingOrders: {
          isAccepting: isAccepting,
          message: acceptingMessage,
        },
      });
      console.log("checking create response", response);
      if (response) {
        response.save((err, result) => {
          if (err) {
            console.log(err);
            FailedResponse(res, err, "data could not saved");
          } else {
            console.log(result);
            OkResponse(res, result, "data saved successfully");
          }
        });
      } else {
        FailedResponse(res, response, "something went wrong");
      }
      console.log(req.body);
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong server");
    }
  },
  getSettings: async (req, res) => {
    try {
      const { city } = req.body;
      const response = await settings.findOne({ city: city.toLowerCase() });
      OkResponse(res, response, "data fetched successfully");
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
  updateSettings: async (req, res) => {
    try {
      const {
        city,
        openingTime,
        closingTime,
        closingMessage,
        isAccepting,
        acceptingMessage,
      } = req.body;
      const response = await settings.updateOne(
        { city: city.toLowerCase() },
        {
          deliveryTiming: {
            openingTime: openingTime,
            closingTime: closingTime,
            closingMessage: closingMessage,
          },
          acceptingOrders: {
            isAccepting: isAccepting,
            message: acceptingMessage,
          },
        }
      );
      if (response.modifiedCount > 0) {
        console.log(response);
        OkResponse(res, response, "settings data updated successfully");
      } else {
        console.log(response);
        FailedResponse(
          res,
          response,
          "settings data could not updated successfully"
        );
      }
    } catch (error) {
      console.log(error);
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
  deleteSettings: async (req, res) => {
    try {
      const { city } = req.body;

      const response = await settings.deleteOne({ city: city.toLowerCase() });
      console.log(city, response);
      if (response.deletedCount > 0) {
        OkResponse(res, response, "data deleted successfully");
      } else {
        FailedResponse(res, response, "data could not deleted");
      }
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
};
