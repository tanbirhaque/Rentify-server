const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
    let connectionUrl;
    if (process.env.NODE_ENV === "development") {
        connectionUrl = process.env.DATABASE_LOCAL;
        connectionUrl = connectionUrl.replace("<username>", process.env.DB_USER);
        connectionUrl = connectionUrl.replace("<password>", process.env.DB_PASS);
    } else {
        connectionUrl = process.env.DATABASE_PROD;
    }
    return connectionUrl;
};

const connectMongoose = async () => {
    console.log("Connecting to database");
    const mongoUri = getConnectionString();
    await mongoose.connect(mongoUri, { dbName: process.env.DB_NAME });
    console.log("Connected to database file(app.js) v-0.2");
};


module.exports = connectMongoose