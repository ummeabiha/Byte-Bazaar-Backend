const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../../../models/UserPanel/Contact");

const contactRouter = express.Router();

// POST /contact
contactRouter.post("/", async (req, res) => {
  const { name, email, topic, message, status } = req.body;
  console.log(req.body);

  // Create a new contact instance
  const newContact = new Contact({
    name,
    email,
    topic,
    message,
    status,
  });

  try {
    // Save the contact to the database
    console.log(newContact);
    await newContact.save();
    res.status(200).send({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Failed to send message. Please try again." });
  }
});

module.exports = contactRouter;
