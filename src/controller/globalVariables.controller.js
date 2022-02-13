const {
  ServerErrorResponse,
  FailedResponse,
  OkResponse,
} = require("../helper/response");
const globalVariables = require("../model/globalVariables");

module.exports = {
  createGlobalVariables: (req, res) => {
    try {
      const { variableName, value } = req.body;
      const response = new globalVariables({ variableName, value });
      response.save((err, result) => {
        if (err) {
          FailedResponse(res, "response could not saved", err);
        }
        if (result) {
          OkResponse(res, "response saved successfully", result);
        }
      });
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getGlobalVariable: async (req, res) => {
    try {
      const response = await globalVariables.find();
      if (response) {
        OkResponse(res, "data fetched successfully", response);
      } else {
        FailedResponse(res, "data could not fetched", response);
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  updateGlobalVariable: async (req, res) => {
    const { variableName, value } = req.body;
    try {
      const response = await globalVariables.updateOne(
        { variableName: variableName },
        {
          value: value,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, "deta updated successfully", response);
      } else {
        FailedResponse(res, "data could not updated successfully", response);
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  deleteGlobalVariable: async (req, res) => {
    const { variableName } = req.body;

    try {
      const response = await globalVariables.deleteOne({
        variableName: variableName,
      });
      if (response.deletedCount > 0) {
        OkResponse(res, "variable name deleted successfully", response);
      } else {
        FailedResponse(res, "variableName could not deleted successfully");
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
