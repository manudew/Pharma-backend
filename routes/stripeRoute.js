const express = require('express');
const stripeRoute = express.Router();
const Stripe = require('stripe');
const PUBLISHABLE_KEY = "pk_test_51LvwLjKEkDpdvVJU8uB8jkw7fhuvOqVg2FfQW7CQvx112SQ4QldNalSQcl6NQYb6784LHQcKjvBMPxLmJ9pa2Huh00CONPh9d7";
const SECRET_KEY = "sk_test_51LvwLjKEkDpdvVJUvNzhMbD4YH3i5uWJ6f18dSZJmNwFUKbjjbgeB1OfWsgoDqsJfOdtWRohCdIrUk6URna7H7aj00sdEAhFaw";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

stripeRoute.post("/create-payment-intent", async (req, res) => {
    try {
        
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ["card"], //by default
      });
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

module.exports = stripeRoute;