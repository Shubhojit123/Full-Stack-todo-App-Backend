const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = dbConnection;
