const HomePage = require("../model/home");
const Offers = require("../model/offer");
const { default: axios } = require("axios");
require("dotenv").config();
const helper = require("../helper/external.helper");
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
const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");
const e = require("express");

const ActiveCities = require("../model/activeCities");

module.exports = {
  create: async (req, res) => {
    try {
      var data = req.body;
      var homeData = new HomePage(data);
      var response = await homeData.save();
      return CreatedResponse(res, response);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  createOffers: async (req, res) => {
    try {
      var data = req.body;
      var { category, products, offerTitle } = data;
      //TODO: check if offer exists
      var _products = products.map((e) => {
        return e.id;
      });

      var axios = require("axios");
      var _data = JSON.stringify({
        products: _products,
        keywords: [offerTitle],
      });

      var config = {
        method: "patch",
        url: "https://locma-gateway.herokuapp.com/api/v1/product/update/keyword",
        headers: {
          "Content-Type": "application/json",
        },
        data: _data,
      };
      console.log(products);

      axios(config)
        .then(async (response) => {
          console.log(JSON.stringify(response.data));
          var offers = new Offers(data);
          var response = await offers.save();
          return CreatedResponse(res, response);
        })
        .catch((error) => {
          console.log(error);
          return ServerErrorResponse(error);
        });
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getOfferDetails: async (req, res) => {
    try {
      var { offer, category } = req.body;
      var offers = await Offers.findOne({
        $and: [{ offerTitle: offer }, { category: category }],
      });
      console.log(offers);
      var products = offers.products;
      products.sort((a, b) => {
        return a.offerPrice - b.offerPrice;
      });
      var products1 = [];
      products.map((a) => {
        products1.push(a.id.toString());
      });
      console.log(products1);
      var axios = require("axios");
      var data = JSON.stringify({ products: products1 });

      var config = {
        method: "post",
        url: "https://locma-gateway.herokuapp.com/api/v1/product/get-listed-products",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          var items = response.data.response_body;
          items.map((a) => {
            var match = products.find((ob) => {
              return ob.id.toString() === a._id;
            });
            console.log(match);
            if (match) return (a["offerPrice"] = match.offerPrice);
          });
          console.log(items);
          return OkResponse(res, items);
        })
        .catch((error) => {
          //console.log(error);
          throw error;
        });
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getOffers: async (req, res) => {
    try {
      var banner = await HomePage.findOne({ active: true }).select(
        "saleBanner"
      );
      var offers = await Offers.aggregate([
        {
          $group: {
            _id: "$offerTitle",
            categories: { $addToSet: "$category" },
          },
        },

        {
          $project: {
            _id: 0,
            offer: "$_id",
            categories: "$categories",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "name",
            as: "category_list",
          },
        },
      ]);

      return OkResponse(res, { banner: banner.saleBanner, offers });
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  get: async (req, res) => {
    try {
      var data = await HomePage.findOne({ active: true });
      console.log(data);
      var products = data.recomemdedProducts;
      var url = process.env.GATEWAY_URL || "http://localhost:5000/api/v1";
      url += "/product/get-listed-products";
      axios
        .post(url, {
          products: products,
        })
        .then(function (response) {
          console.log(response.data.response_body);
          return OkResponse(res, {
            saleBanner: data.saleBanner,
            recomended: response.data.response_body,
          });
        })
        .catch(function (error) {
          console.log(error);
          return ServerErrorResponse(res, error);
        });
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  createCategory: async (req, res) => {
    try {
      console.log(req.body);
      var category = new Category(req.body);
      var response = await category.save();
      if (!response) throw Error("Something Went Wrong");
      return CreatedResponse(res, response);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getCategories: async (req, res) => {
    try {
      var category = await Category.find();

      if (!category) return NotFoundResponse(res, null);
      return OkResponse(res, category);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      console.log("hiiiiii");
      const { name, description, rate, thumbnail } = req.body;
      let response = await Category.updateOne(
        { name: name },
        {
          description: description,
          rate: rate,
          thumbnail: thumbnail,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "category updated successfully");
      } else {
        BadRequestResponse(res, response, "category could not updated");
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const response = await Category.deleteOne({ name: name });
      if (response.deletedCount > 0) {
        OkResponse(res, response, "category deleted successfully");
      } else {
        BadRequestResponse(res, response, "category could not deleted");
      }
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  createSubCategory: async (req, res) => {
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
  getAllSubCategory: async (req, res) => {
    try {
      var subcategories = await SubCategory.find({});
      return OkResponse(res, subcategories);
    } catch (error) {
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },

  getBySubCategoryCategory: async (req, res) => {
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
  updateSubCategory: async (req, res) => {
    try {
      const { name, category, description, thumbnail, rate } = req.body;
      const response = await SubCategory.updateOne(
        { name: name },
        {
          description: description,
          rate: rate,
          category: category,
          thumbnail: thumbnail,
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "subCategory updated successfully");
      } else {
        BadRequestResponse(res, response, "subCategory could not updated");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  deleteSubCategory: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(req.body);
      const response = await SubCategory.deleteMany({ name: name });
      if (response.deletedCount > 0) {
        OkResponse(res, response, "deleted successfully");
      } else {
        crossOriginIsolated.log(response);
        BadRequestResponse(res, response, "subCategory could not deleted");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  searchCity: async (req, res) => {
    try {
      const { key } = req.body;
      const response = await ActiveCities.find(
        {
          city: { $regex: key },
        },
        { _id: 0 }
      ).select("city");
      if (response) {
        OkResponse(res, response, "city found");
      } else {
        FailedResponse(res, response, "city not found");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
