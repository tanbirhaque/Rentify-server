const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51OHt7bH9TPzhm8dE66bT3iPfXwM7PkMVIQOV9oY6shFfWcz14y7iTmRbgFXXv0kevpLgN8pk4hbWjJIF2tut9NRl00pH4ykAY6"
);
const port = process.env.PORT || 5000;

// comment update
// middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://tanbirhaque53:UpQtG2pYkWP4eEGa@cluster0.tgscumi.mongodb.net/?retryWrites=true&w=majority";

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
    const userCollection = client.db("RentifyDB").collection("users");
    const paymentCollection = client.db("RentifyDB").collection("payments");
    const blogCollection = client.db("RentifyDB").collection("blogs");
    const blogsCommentCollection = client.db("RentifyDB").collection("blogsComment");
    const reviewCollection = client.db("RentifyDB").collection("reviews");
    const ownerCollection = client.db("RentifyDB").collection("ownerRequest");

    // properties data post api creat by Sojib
    app.post("/properties", async (req, res) => {
      const newProperties = req.body;
      const result = await PropertyCollection.insertOne(newProperties);
      res.send(result);
    });

    // properties data get api creat by Sojib
    app.get("/properties", async (req, res) => {
      const result = await PropertyCollection.find().toArray();
      res.send(result);
    });

    //single property data
    app.get("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await PropertyCollection.find(query).toArray();
      res.send(result);
    });

    // for update property coded by Sadia
    app.patch("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProerties = req.body;
      const product = {
        $set: {
          property_title: updatedProerties.property_title,
          bedroom: updatedProerties.bedroom,
          // category: updatedProerties.category,
          // image: updatedProerties.image,
          // price: updatedProerties.price,
          // rating: updatedProerties.rating,
          // description: updatedProerties.description,
        },
      };
      const result = await PropertyCollection.updateOne(
        filter,
        product,
        options
      );
      res.send(result);
    });

    // for delete a property coded by Sadia
    app.delete('/properties/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await PropertyCollection.deleteOne(query);
      res.send(result);
    })

    // Request property data individually get by Sajib
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
      const Requested_Properties = await Requested_PropertiesCollection.find(
        query
      ).toArray();
      if (Requested_Properties) {
        const result = Requested_Properties.filter(
          (item) => item?.property?.property_for == "sale"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });

    // This API calls all the requested properties (For Rent) of an user by the user's email address. [by- Tanbir]
    app.get("/requested-rent", async (req, res) => {
      const email = req.query.email;
      const query = { requesterEmail: email };
      const Requested_Properties = await Requested_PropertiesCollection.find(
        query
      ).toArray();
      if (Requested_Properties) {
        const result = Requested_Properties.filter(
          (item) => item?.property?.property_for == "rent"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });

    //This API calls the rent request of an owner by konika

    app.get("/ownerRentReq", async (req, res) => {
      const email = req.query.email;
      const query = { "property.owner_details.owner_email": email };
      const ownerProperties = await Requested_PropertiesCollection.find(
        query
      ).toArray();
      if (ownerProperties) {
        const result = ownerProperties.filter(
          (item) => item?.property?.property_for == "rent"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });
    //This API calls the  sale request of an owner by konika
    app.get("/ownerSaleReq", async (req, res) => {
      const email = req.query.email;
      const query = { "property.owner_details.owner_email": email };
      const ownerSaleProperties = await Requested_PropertiesCollection.find(
        query
      ).toArray();
      if (ownerSaleProperties) {
        const result = ownerSaleProperties.filter(
          (item) => item?.property?.property_for == "sale"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });

    app.put("/accept/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateStatus = {
        $set: {
          requestStatus: "accepted",
        },
      };
      const result = await Requested_PropertiesCollection.updateOne(
        query,
        updateStatus
      );
      res.send(result);
    });

    app.put("/reject/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateStatus = {
        $set: {
          requestStatus: "rejected",
        },
      };
      const result = await Requested_PropertiesCollection.updateOne(
        query,
        updateStatus
      );
      res.send(result);
    });

    //this Api call the rentOutProperties  of an owner by konika
    app.get("/rentOut", async (req, res) => {
      const email = req.query.email;
      const query = { owner: email };
      console.log(query);
      const rentOutProperties = await paymentCollection.find(query).toArray();
      // console.log(rentOutProperties);
      if (rentOutProperties) {
        const result = rentOutProperties.filter(
          (item) => item?.property_status == "Rented"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });
    //this Api call the  SoldProperties of an owner by konika
    app.get("/soldOut", async (req, res) => {
      const email = req.query.email;
      const query = { owner: email };
      console.log(query);
      const rentOutProperties = await paymentCollection.find(query).toArray();
      // console.log(rentOutProperties);
      if (rentOutProperties) {
        const result = rentOutProperties.filter(
          (item) => item?.property_status == "Sold"
        );
        res.send(result);
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    });
    app.get("/recentAddProperties", async (req, res) => {
      const email = req.query.email;
      const query = { "property_info.owner_details.owner_email": email };
      const ownerProperties = await PropertyCollection.find(query).toArray();
      res.send(ownerProperties);
    });
    // property data request post by Sojib
    app.post("/requested-properties", async (req, res) => {
      const propertyRequest = req.body;
      const result = await Requested_PropertiesCollection.insertOne(
        propertyRequest
      );
      res.send(result);
    });

    // Request property data individually get by Sojib
    app.get("/requested-properties", async (req, res) => {
      const result = await Requested_PropertiesCollection.find().toArray();
      res.send(result);
    });

    // app.get("/requested-sale", async (req, res) => {
    //   const email = req.query.email;
    //   const query = { requesterEmail: email };
    //   const Requested_Properties = await Requested_PropertiesCollection.find(
    //     query
    //   ).toArray();
    //   if (Requested_Properties) {
    //     const result = Requested_Properties.filter(
    //       (item) => item?.property?.property_for === "sale"
    //     );
    //     res.send(result);
    //   } else {
    //     return res.status(401).send({ message: "unauthorized access" });
    //   }
    // });

    // app.get("/requested-rent", async (req, res) => {
    //   const email = req.query.email;
    //   const query = { requesterEmail: email };
    //   const Requested_Properties = await Requested_PropertiesCollection.find(
    //     query
    //   ).toArray();
    //   if (Requested_Properties) {
    //     const result = Requested_Properties.filter(
    //       (item) => item?.property?.property_for === "rent"
    //     );
    //     res.send(result);
    //   } else {
    //     return res.status(401).send({ message: "unauthorized access" });
    //   }
    // });

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

    //coded by Fahima

    //for users
    //for users API created by Fahima
    //avoids multiple entry of same email
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const userExist = await userCollection.findOne(query);
      if (userExist) {
        return res.send({ insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    //change user role to owner
    // app.patch("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const roleChange = {
    //     $set: {
    //       role: "Owner",
    //     },
    //   };
    //   const result = await userCollection.updateOne(filter, roleChange);
    //   res.send(result);
    // });

    //get single user
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email });
      res.send(user);
    });

    //reviews//

    //posting
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    //getting
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    //review delete
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(filter);
      res.send(result);
    });

    //delete blog
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(filter);
      res.send(result);
    });

    //ownerRequest
    //for avoiding multiple request with same email
    app.post("/ownerRequest", async (req, res) => {
      const owner = req.body;
      const query = { ownerEmail: owner.ownerEmail };
      const ownerRequestExist = await ownerCollection.findOne(query);
      if (ownerRequestExist) {
        return res.send({ insertedId: null });
      }
      const result = await ownerCollection.insertOne(owner);
      res.send(result);
    });

    app.get("/ownerRequest", async (req, res) => {
      const result = await ownerCollection.find().toArray();
      res.send(result);
    });

    //delete comment added by "Fahima"
    app.delete("/comments/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCommentCollection.deleteOne(filter);
      res.send(result);
    });

    //patch for properties to verified
    app.patch("/verification", async (req, res) => {
      const id = req.body.id;
      const query = { _id: new ObjectId(id) };
      const status = req.body.propertyStatus;
      const statusChange = {
        $set: {
          "property_info.verify_status": status,
        },
      };
      const result = await PropertyCollection.updateOne(query, statusChange);
      res.send(result);
    });

    //saved property remove
    app.delete("/saved-properties/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await Saved_PropertiesCollection.deleteOne(filter);
      res.send(result);
    });

    //change user role to owner
    app.patch("/roleChange", async (req, res) => {
      const ownerEmail = req.body.email;
      const role = req.body.status;
      const filter = { email: ownerEmail };
      // const result = await ownerCollection.findOne(filter, statusChange);
      const roleChange = { $set: { role: role } };
      const result = await userCollection.updateOne(filter, roleChange);

      const filter1 = { ownerEmail: ownerEmail };
      const statusChange = {
        $set: { ownerStatus: role === "owner" ? true : false },
      };
      const result1 = await ownerCollection.updateOne(filter1, statusChange);
      // res.send(result, result1);
      res.status(200).json({ userUpdateResult: result, ownerUpdateResult: result1 });
    });

    // code by "Fahima"

    // payment intent api by Rana
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      const query = { _id: new ObjectId(payment.requestId) };
      const deleteRes = await Requested_PropertiesCollection.deleteOne(query);

      // This functions bellow are working for patch the status of property from the property collection by filtering the spesific property collection using propertyID from the payment object. [Added by -Tanbir]
      const filter = { _id: new ObjectId(payment.propertyId) };
      const updateDoc = {
        $set: {
          "property_info.property_details.property_status":
            payment.property_status,
        },
      };
      const patchRes = await PropertyCollection.updateOne(filter, updateDoc);
      res.send({ paymentResult, deleteRes, patchRes });
    });

    // blogs post api creat & codded by sojib
    app.post("/blogs", async (req, res) => {
      const newBlog = req.body;
      const result = await blogCollection.insertOne(newBlog);
      res.send(result);
    });

    // blogs get api creat & codded by sojib
    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    });

    // blogs comment creat & codded by sojib
    app.post("/comments", async (req, res) => {
      const newComment = req.body;
      const result = await blogsCommentCollection.insertOne(newComment);
      res.send(result);
    });

    app.get("/comments", async (req, res) => {
      const result = await blogsCommentCollection.find().toArray();
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
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
