const { default: axios } = require('axios');
module.exports = {
    externalResource: (requestOptions, cb) => {
        axios(requestOptions)
            .then((response) => {
                return cb(null, response.data);
            })
            .catch((error) => {
                console.log("\n------------------------\n" + Object.keys(error));
                if (error.response) {
                    return cb(error.response.data, null);

                } else if (error.request) {
                    return cb(error.request, null);
                } else {
                    return cb(error.message, null);
                }
            });
    },
}
