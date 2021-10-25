const express = require('express');
const database = require('./config/database');
require('dotenv').config();
const router = require('./src/router/index');
const app = express();
const port = process.env.PORT || 5002

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.use((req, res, next) => {
    return res.send("<h2>Welcome</h2>");
});
database.connect();

app.listen(port, () => {
    console.log("welcome to app");
});
