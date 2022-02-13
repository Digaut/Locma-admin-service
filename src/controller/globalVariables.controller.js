const {
  ServerErrorResponse,
  FailedResponse,
  OkResponse,
} = require("../helper/response");
const globalVariables = require("../model/globalVariables");

module.exports = {
  createGlobalVariables: (req, res) => {
    try {
      const { variableName, value, description } = req.body;
      const response = new globalVariables({
        variableName: variableName.toUpperCase().replace(" ", ""),
        value,
        description,
      });
      response.save((err, result) => {
        if (err) {
          FailedResponse(res, err, "response could not saved");
        }
        if (result) {
          OkResponse(res, result, "response saved successfully");
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
        OkResponse(res, response, "data fetched successfully");
      } else {
        FailedResponse(res, response, "data could not fetched");
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  searchGlobalVariableName: async (req, res) => {
    try {
      const { variableName } = req.body;
      const response = await globalVariables
        .find(
          {
            variableName: { $regex: variableName.toUpperCase().trim() },
          },
          { _id: 0 }
        )
        .select("variableName");
      if (response) {
        OkResponse(res, response, "data fetched successfully");
      } else {
        FailedResponse(res, response, "data could not fetched");
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  updateGlobalVariable: async (req, res) => {
    const { variableName, value, description } = req.body;
    try {
      const response = await globalVariables.updateOne(
        { variableName: variableName },
        {
          value: value,
          description: description,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "deta updated successfully");
      } else {
        FailedResponse(res, response, "data could not updated successfully");
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
        OkResponse(res, response, "variable name deleted successfully");
      } else {
        FailedResponse(
          res,
          response,
          "variableName could not deleted successfully"
        );
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
