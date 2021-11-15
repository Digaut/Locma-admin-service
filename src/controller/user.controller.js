const {
  NotFoundResponse,
  OkResponse,
  ServerErrorResponse,
} = require("../helper/response");
const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");
const ActiveCities = require("../model/activeCities");
const { FailedResponse } = require("../../../User/src/helper/response");

module.exports = {
  getCategoriesUser: async (req, res) => {
    try {
      var category = await Category.find({}, { rate: 0 });

      if (!category) return NotFoundResponse(res, null);
      return OkResponse(res, category);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  getAllSubCategoryUser: async (req, res) => {
    try {
      var subcategories = await SubCategory.find({}, { rate: 0 });
      return OkResponse(res, subcategories);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  getBySubCategoryCategoryUser: async (req, res) => {
    try {
      var { category } = req.body;
      var subcategories = await SubCategory.find(
        { category: category },
        { rate: 0 }
      );
      return OkResponse(res, subcategories);
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getActiveCityForUser: async (req, res) => {
    try {
      const response = await ActiveCities.find({});
      if (response.status) {
        OkResponse(res, response, "data found");
      } else {
        FailedResponse(res, response, "data not found");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
