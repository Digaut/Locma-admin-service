const {
  OkResponse,
  FailedResponse,
  ServerErrorResponse,
} = require("../helper/response");
const officialDetails = require("../model/officialDetails");

module.exports = {
  createOfficialDetails: async (req, res) => {
    try {
      const { city, accountNo, IFSC, accountHolderName, bankName } = req.body;
      const checkAccount = await officialDetails.find({});
      if (checkAccount.length < 3) {
        // OkResponse(
        //   res,
        //   { checkAccount, accountNo, IFSC, accountHolderName },
        //   "checking response of account details"
        // );
        const response = new officialDetails({
          city: city,
          bankDetails: [
            {
              accountNo: accountNo,
              IFSC: IFSC,
              bankName: bankName,
              accountHolderName: accountHolderName,
            },
          ],
        });
        response.save((err, result) => {
          if (err) {
            FailedResponse(res, err, "could not inserted");
          }
          if (result) {
            OkResponse(res, result, "data inserted successfully");
          }
        });
      } else {
        FailedResponse(
          res,
          checkAccount,
          "You can insert limited account numbers"
        );
      }
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
  getOfficialDetails: async (req, res) => {
    try {
      const { city } = req.body;
      const response = await officialDetails.findOne({ city: city });
      if (response) {
        console.log(response);
        OkResponse(res, response, "data fetched successfully");
      } else {
        FailedResponse(res, response, "data could not fetched");
      }
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
  updateOfficialDetails: async (req, res) => {
    try {
      const { city, newCity } = req.body;
      const response = await officialDetails.updateOne(
        { city: city },
        {
          city: newCity,
        }
      );
      console.log(response);
      OkResponse(res, response, "this is upadate response");
    } catch (error) {
      ServerErrorResponse(res, error, "something went wrong");
    }
  },
  testController: async (req, res) => {
    try {
      OkResponse(res, { hi: "this is hii" }, "i am piyush");
    } catch (error) {
      ServerErrorResponse(res, err);
    }
  },
};
