const SubCategory = require("../model/SubCategory");
const mongoose = require("mongoose");
const {
  BadRequestResponse,
  UnauthorizedResponse,
  NotFoundResponse,
  ForbiddenResponse,
  CreatedResponse,
  OkResponse,
  ServerErrorResponse,
} = require("../helper/response");

module.exports = {
  create: async (req, res) => {
    try {
      var subcategory = new SubCategory(req.body);
      var response = await subcategory.save();
      return CreatedResponse(res, response);
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getAll: async (req, res) => {
    try {
      var subcategories = await SubCategory.find();
      return OkResponse(res, subcategories);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getByCategory: async (req, res) => {
    try {
      var { category } = req.body;
      var subcategories = await SubCategory.find({ category: category });
      return OkResponse(res, subcategories);
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getBySubCategory: async (req, res) => {
    try {
      var { subCategory } = req.body;
      var subcategories = await SubCategory.findOne({
        name: subCategory,
      });
      return OkResponse(res, subcategories);
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
