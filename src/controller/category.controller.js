const Category = require('../model/Category');
const { CreatedResponse, OkResponse, NotFoundResponse, ServerErrorResponse } = require('../helper/response');

module.exports = {
    create: async (req, res) => {
        try {
            console.log(req.body);
            var category = new Category(req.body);
            var response = await category.save();
            if (!response) throw Error("Something Went Wrong");
            return CreatedResponse(res, response);
        } catch (error) {
            console.log(error);
            return ServerErrorResponse;
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
}
