const HomePage = require("../model/home");
const Offers = require("../model/offer");
const { default: axios } = require('axios');
require('dotenv').config();
const helper = require('../helper/external.helper');
const { CreatedResponse,
    OkResponse,
    BadRequestResponse,
    UnauthorizedResponse,
    PaymentRequiredResponse,
    NotFoundResponse,
    ForbiddenResponse,
    ServerErrorResponse,
    ServiceUnavilableResponse,
} = require('../helper/response');


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
            var _products = products.map(e => { return e.id });

            var axios = require('axios');
            var _data = JSON.stringify({
                "products": _products,
                "keywords": [
                    offerTitle
                ]
            });

            var config = {
                method: 'patch',
                url: 'https://locma-gateway.herokuapp.com/api/v1/product/update/keyword',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: _data
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
            var offers = await Offers.findOne({ $and: [{ offerTitle: offer }, { category: category }] });
            console.log(offers);
            var products = offers.products;
            products.sort((a, b) => {
                return a.offerPrice - b.offerPrice;
            });
            var products1 = [];
            products.map(a => {
                products1.push(a.id.toString());
            });
            console.log(products1);
            var axios = require('axios');
            var data = JSON.stringify({ products: products1 });

            var config = {
                method: 'post',
                url: 'https://locma-gateway.herokuapp.com/api/v1/product/get-listed-products',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    var items = response.data.response_body;
                    items.map(a => {
                        var match = products.find(ob => {
                            return ob.id.toString() === a._id
                        });
                        console.log(match);
                        if (match) return a["offerPrice"] = match.offerPrice;
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
            var banner = await HomePage.findOne({ active: true }).select("saleBanner");
            var offers = await Offers.aggregate([
                {
                    $group: {
                        _id: "$offerTitle",
                        categories: { $addToSet: "$category" }
                    },
                },

                {
                    $project: {
                        _id: 0,
                        offer: "$_id",
                        categories: "$categories"

                    },
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories",
                        foreignField: "name",
                        as: "category_list"
                    }
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
            axios.post(url, {
                products: products,
            })
                .then(function(response) {
                    console.log(response.data.response_body);
                    return OkResponse(res, { saleBanner: data.saleBanner, recomended: response.data.response_body });

                })
                .catch(function(error) {
                    console.log(error);
                    return ServerErrorResponse(res, error);
                });
        } catch (error) {
            console.log(error);
            return ServerErrorResponse(res, error);
        }
    },
}
