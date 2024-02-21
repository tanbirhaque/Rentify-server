const express = require("express");
const applyMiddleware = require("./middleware/applyMiddleware");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// 
const propertiesRoutes = require("./routes/properties")
const savedPropertiesRoutes = require("./routes/savedProperties")
const requestedProperties = require("./routes/requestedProperties")
const usersRoutes = require("./routes/users")
const paymentRoutes = require("./routes/payments")
const blogsRoutes = require("./routes/blogs")
const commentsRoutes = require("./routes/comments")
const reviewsRoutes = require("./routes/reviews")
const ownerRequestRoutes = require("./routes/ownerRequest");


// It's export into middleware folder for use middleware 
applyMiddleware(app)
app.use(propertiesRoutes)
app.use(savedPropertiesRoutes)
app.use(requestedProperties)
app.use(usersRoutes)
app.use(paymentRoutes)
app.use(blogsRoutes)
app.use(commentsRoutes)
app.use(reviewsRoutes)
app.use(ownerRequestRoutes)


app.get("/health", (req, res) => {
    res.send("Rentify is running");
});

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

// export into db folder for database connected
const main = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Rentify server is running on port ${port}`);
    });

}
main()