const { FailedResponse } = require("../../../User/src/helper/response");
const { ServerErrorResponse, OkResponse } = require("../helper/response");
const ActiveCities = require("../model/activeCities");
module.exports = {
  createCity: async (req, res) => {
    try {
      const { city, status, longitude, latitude, description, pinCode } =
        req.body;
      console.log(req.body);

      const response = await new ActiveCities({
        city: city,
        status: status,
        coOrdinate: {
          longitude: longitude,
          latitude: latitude,
        },
        description: description,
        pinCode: pinCode,
      });
      console.log(response, "gii response");
      response.save((error, result) => {
        console.log(error, result);
        if (result) {
          OkResponse(res, result, "data saved successfully");
        }
        if (error) {
          FailedResponse(res, error, "city could not added");
        }
      });
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  getCity: async (req, res) => {
    try {
      const response = await ActiveCities.find({});
      if (response) {
        OkResponse(res, response, "All Cities fetches successully");
      }
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  updateCity: async (req, res) => {
    try {
      const { city, status, description, coOrdinate } = req.body;
      const response = await ActiveCities.updateOne(
        { city: city },
        {
          city: city,
          status: status,
          description: description,
          coOrdinate: coOrdinate,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "city updated successfully");
      } else {
        FailedResponse(res, response, "city could not updated ");
      }
    } catch (error) {
      /* handle error */
      console.log(err);
      return ServerErrorResponse(res, err);
    }
  },
  deleteCity: async (req, res) => {
    try {
      const { city } = req.body;
      const response = await ActiveCities.deleteOne({ city: city });
      if (response.deletedCount > 0) {
        OkResponse(res, response, "city deleted successfully");
      } else {
        FailedResponse(res, response, "city could not deleted");
      }
      console.log(response);
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  addPinCode: async (req, res) => {
    try {
      const { city, pinCode } = req.body;
      const response = await ActiveCities.updateOne(
        {
          city: city,
        },
        {
          $push: { pinCode: pinCode },
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "new pincode added successfully");
      } else {
        FailedResponse(res, response, "new pincode could not added");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
