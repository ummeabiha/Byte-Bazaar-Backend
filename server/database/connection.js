const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const db= process.env.DATABASE;

async function connectToDatabase() {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connection established");
  } catch (err) {
    console.log(err);
  }
}

connectToDatabase();


