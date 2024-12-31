const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe("sk_test_51Qc5rO04P0wXD9V2gwB7jXfPn4yr1NkM8Fman5iZxHWFFLn8eriHYDs7fvIb3QgwHbVxDCWANIwjfMqw6boJivOj00qbd8B7oM"); // Replace with your Stripe secret key

router.post("/payment", async (req, res) => {
  const { donorName, email, amount } = req.body;

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Donation from ${donorName}`,
              description: "Thank you for your generous donation!",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: "success.html", // Change to your actual success URL
      cancel_url: "fail.html", // Change to your actual cancel URL
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

module.exports = router;
