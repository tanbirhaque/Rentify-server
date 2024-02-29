const stripe = require("stripe")(
    "sk_test_51OHt7bH9TPzhm8dE66bT3iPfXwM7PkMVIQOV9oY6shFfWcz14y7iTmRbgFXXv0kevpLgN8pk4hbWjJIF2tut9NRl00pH4ykAY6"
  );

const paymentIntent = async (req, res) => {
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
}
module.exports= paymentIntent