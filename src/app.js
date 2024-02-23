const express = require("express");
const connectMongoose = require("./db/connecDB");
const applyMiddleware = require("./middleware/applyMiddleware");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;


const PropertiesRoutes = require("./routes/Properties")


applyMiddleware(app)
app.use(PropertiesRoutes)

app.get("/health", (req, res) => {
    res.send("Rentify is running")
})

// use this api for error handling
app.all("*", (req, res, next) => {
    const error = new Error(`The requested url is invalid: [${req.url}]`)
    error.status = 404;
    next(error);
});

// response this api in this error by next
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

const main = async () => {
    await connectMongoose();
    app.listen(port, () => {
        console.log(`Renitfy is running out v.02 ${port}`)
    })
}
main();
