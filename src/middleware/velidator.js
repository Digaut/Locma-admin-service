const Joi = require("joi");
const { BadRequestResponse } = require("../helper/response");
module.exports = {
    CategoryValidator: (req, res, next) => {
        const data = req.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            rate: Joi.number(),
            thumbnail: Joi.string(),
        });
        var { value, error } = schema.validate(data);
        if (error) return BadRequestResponse(res, error, "somethin went wrong");
        req.body = value;
        next();
    },
    SubCategoryValidator: (req, res, next) => {
        const data = req.body;
        const schema = Joi.object({
            category: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string(),
            rate: Joi.number(),
            thumbnail: Joi.string(),
        });
        var { value, error } = schema.validate(data);
        if (error) return BadRequestResponse(res, error, "somethin went wrong");
        req.body = value;
        next();
    },
    postValidator: (req, res, next) => {
        const data = req.body;
        const schema = Joi.object({
            category: Joi.string().allow(null),
            subCategory: Joi.string().allow(null),
            postType: Joi.string().required(),
            postName: Joi.string().required(),
            query: Joi.string().required(),
            clickAction: Joi.string().required(),
            image: Joi.string().required(),
            city: Joi.string().required(),
        });
        var { value, error } = schema.validate(data);
        if (error) return BadRequestResponse(res, error, "somethin went wrong");
        req.body = value;
        next();
    },
    postUpdateValidator: (req, res, next) => {
        const data = req.body;
        const schema = Joi.object({
            category: Joi.string().allow(null),
            subCategory: Joi.string().allow(null),
            _id: Joi.string().required(),
            postName: Joi.string().required(),
            query: Joi.string().required(),
            clickAction: Joi.string().required(),
            image: Joi.string().required(),
            city: Joi.string().required(),
            status: Joi.boolean().required(),
        });
        var { value, error } = schema.validate(data);
        if (error) return BadRequestResponse(res, error, "somethin went wrong");
        req.body = value;
        next();
    },
};
