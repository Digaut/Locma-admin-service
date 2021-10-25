const Joi = require('joi');
const { BadRequestResponse } = require('../helper/response');
module.exports = {
    CategoryValidator: (req, res, next) => {
        const data = req.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            thumbnail: Joi.array().items(Joi.string())
        });
        var { value, error } = schema.validate(data);
        if (error) return BadRequestResponse(res, error, MESSAGE);
        req.body = value;
        next();
    },
}
