require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = Stripe(process.env.STRIPE_SK);
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
    });

    const response = {
      success: true,
      clientSecret: paymentIntent.client_secret,
    };

    res.send(response);
  } catch (err) {
    res.status(500).send({ success: false, clientSecret: "" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
