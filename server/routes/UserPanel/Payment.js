const paymentRouter = require("express").Router();
const Stripe = require("stripe");
const Authorization = require("../../middleware/authorization");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const sendClientKey = async (req, res) => {
  let { OrderTotal } = req.body;
  let amount=parseInt(OrderTotal)*10
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount, //To convert to rupees from paisas
      currency: "pkr",
      payment_method_types: ['card'],
      automatic_payment_methods: { enabled: false },
    });

    res.send({
      ClientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    console.log(error);
  }
};

paymentRouter.post("/", Authorization, sendClientKey);

module.exports = paymentRouter;
