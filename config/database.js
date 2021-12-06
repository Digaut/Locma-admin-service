const Mongoose = require("mongoose");
require("dotenv").config();

const database =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/adminDB";
const connect = () => {
  Mongoose.connect(
    database + "",
    // {
    // 	useNewUrlParser: true,
    // 	useUnifiedTopology: true,
    // 	useFindAndModify: false,
    // 	useCreateIndex: true,
    // },
    function (err) {
      if (err) console.log(err);
      else {
        console.log(`database is connected`);
      }
    }
  );
};
module.exports = { connect: connect };
