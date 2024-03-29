const mongoose = require("mongoose");
const { pagenate } = require("../helper/helpers");
const {
    FailedResponse,
    OkResponse,
    ServerErrorResponse,
} = require("../helper/response");
const Category = require("../model/Category");
const post = require("../model/post");

module.exports = {
    createPost: async (req, res) => {
        try {
            const response = new post(req.body);
            if (response) {
                await response.save((err, result) => {
                    if (err) {
                        FailedResponse(res, err, "data could not saved");
                    }
                    if (result) {
                        OkResponse(res, response, "data saved successfully");
                    }
                });
            } else {
                FailedResponse(res, response, "data could not created");
            }
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },

    getAllPost: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            let skip = (page - 1) * limit;
            const response = await post.aggregate([
                {
                    $facet: {
                        max: [{ $count: "total" }],
                        posts: [
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit },
                        ],
                    },
                },
            ]);
            let pagination = pagenate(response[0].max[0].total, page, limit);

            if (response.length > 0) {
                OkResponse(
                    res,
                    { posts: response[0].posts, pagination },
                    "data get successfully"
                );
            } else {
                FailedResponse(res, null, "data not found");
            }
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    getAllPostTypeWise: async (req, res) => {
        try {
            const { city } = req.body;
            const homeContent = await post.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: ["$city", city],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$postType",
                        posts: {
                            $addToSet: "$$ROOT",
                        },
                    },
                },
                {
                    $project: {
                        postType: "$_id",
                        posts: 1,

                        _id: 0,
                    },
                },
            ]);
            var categories = await Category.find();
            OkResponse(
                res,
                { homeContent, categories },
                "response generated sucessfully"
            );
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    getPost: async (req, res) => {
        try {
            const { postType, city } = req.body;
            if (postType === "all") {
                const response = await post.find({ city: city });

                if (response.length > 0) {
                    OkResponse(res, response, "data found successfully");
                } else {
                    OkResponse(res, [], "data found successfully");
                }
            } else {
                const response = await post.find({
                    $and: [{ postType: postType }, { city: city }],
                });

                if (response.length > 0) {
                    OkResponse(res, response, "data found successfully");
                } else {
                    FailedResponse(res, null, "data not found");
                }
            }
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    getStatistics: async (req, res) => {
        try {
            const response = await post.find({}, { postType: 1 });
            let postType = [];
            let postStats = [
                { postType: "all", total: response.length, text: "All" },
            ];
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    postType.push(response[i].postType);
                }
                uniqPostType = [...new Set(postType)];
                for (let j = 0; j < uniqPostType.length; j++) {
                    const newres = await post
                        .find({ postType: uniqPostType[j] })
                        .count();
                    postStats.push({
                        postType: uniqPostType[j],
                        total: newres,
                        text: uniqPostType[j],
                    });
                }
            }
            OkResponse(res, postStats, "data get  successfully");
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    updatePost: async (req, res) => {
        try {
            const {
                _id,
                category,
                subCategory,
                image,
                clickAction,
                query,
                city,
                status,
            } = req.body;
            const response = await post.updateOne(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    category,
                    subCategory,
                    image,
                    clickAction,
                    query,
                    city,
                    status,
                }
            );
            if (response) {
                OkResponse(res, response, "data delted successfully");
            } else {
                FailedResponse(res, {}, "data could not deleted");
            }
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
    deletePost: async (req, res) => {
        try {
            const { _id, postName } = req.body;
            const response = await post.findOneAndDelete({
                _id: mongoose.Types.ObjectId(_id),
            });
            console.log(response, _id, "this is server response");
            if (response) {
                OkResponse(res, response, "data delted successfully");
            } else {
                FailedResponse(res, {}, "data could not deleted");
            }
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
};
