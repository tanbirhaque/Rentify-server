const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require('stripe')('sk_test_51OHt7bH9TPzhm8dE66bT3iPfXwM7PkMVIQOV9oY6shFfWcz14y7iTmRbgFXXv0kevpLgN8pk4hbWjJIF2tut9NRl00pH4ykAY6'); //for payment by Rana;
const port = process.env.PORT || 5000;

// comment update
// middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://tanbirhaque53:UpQtG2pYkWP4eEGa@cluster0.tgscumi.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgscumi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //coded by Sojib
    const PropertyCollection = client.db("RentifyDB").collection("Property");
    const Requested_PropertiesCollection = client.db("RentifyDB").collection("Requested_Properties");
    const Saved_PropertiesCollection = client.db("RentifyDB").collection("Saved_Properties");
    const paymentCollection = client.db("RentifyDB").collection("payments");

    // data get by Sojib
    app.get("/properties", async (req, res) => {
      const result = await PropertyCollection.find().toArray();
      res.send(result);
    });

    // This is the API for adding properties [by- sojib] 
    app.post("/properties", async (req, res) => {
      const newProperty = req.body;
      const result = await PropertyCollection.insertOne(newProperty)
      res.send(result)
    })

    //single property data
    app.get("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await PropertyCollection.find(query).toArray();
      res.send(result);
    });


    // Request property data individually get by Sojib
    app.get("/requested-properties", async (req, res) => {
      const result = await Requested_PropertiesCollection.find().toArray();
      res.send(result);
    });

    // This API will call all the requested user properties by email address, including rental and sale properties. [by- Tanbir]
    app.get("/all_requested", async (req, res) => {
      const email = req.query.email;
      const query = { requesterEmail: email };
      const result = await Requested_PropertiesCollection.find(query).toArray();
      res.send(result);
    });

    // This API calls all the requested properties (For Sale) of an user by the user's email address. [by- Tanbir]
    app.get("/requested-sale", async (req, res) => {
      const email = req.query.email;
      const query = { requesterEmail: email };
      const Requested_Properties = await Requested_PropertiesCollection.find(query).toArray();
      if (Requested_Properties) {
        const result = Requested_Properties.filter((item) => item?.property?.property_for == "sale");
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });

    // This API calls all the requested properties (For Rent) of an user by the user's email address. [by- Tanbir]
    app.get("/requested-rent", async (req, res) => {
      const email = req.query.email;
      const query = { requesterEmail: email };
      const Requested_Properties = await Requested_PropertiesCollection.find(query).toArray();
      if (Requested_Properties) {
        const result = Requested_Properties.filter((item) => item?.property?.property_for == "rent");
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });

    // property data request post by Sojib
    app.post("/requested-properties", async (req, res) => {
      const propertyRequest = req.body;
      const result = await Requested_PropertiesCollection.insertOne(
        propertyRequest
      );
      res.send(result);
    });





    //coded by Fahima



    // This API is for getting all the saved properties from the saved properties collection - Please don't remove the comment and the code below - By Tanbir
    //to save property data to backend
    // app.get("/saved-properties", async (req, res) => {
    //   const result = await Saved_PropertiesCollection.find().toArray();
    //   res.send(result);
    // });


    app.post("/saved-properties", async (req, res) => {
      const savedProperties = req.body;
      const result = await Saved_PropertiesCollection.insertOne(
        savedProperties
      );
      res.send(result);
    });

    // This Api Is for getting saved properties for individual users. By Email query
    app.get("/saved-properties", async (req, res) => {
      try {
        const userEmail = req.query.email;
        const query = { savedUserEmail: userEmail }; // Update the field name to match 'savedUserEmail'
        const result = await Saved_PropertiesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error retrieving properties:", error);
        res.status(500).send("Internal server error.");
      }
    });

    // payment intent api by Rana
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      console.log('payment info', paymentResult);
      const query = { _id: new ObjectId(payment.requestId) };
      const deleteRes = await Requested_PropertiesCollection.deleteOne(query)
      res.send({ paymentResult, deleteRes });
    });


    //code by Fahima
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Rentify is running");
});

app.listen(port, () => {
  console.log(`Rentify server is running on port ${port}`);
});
