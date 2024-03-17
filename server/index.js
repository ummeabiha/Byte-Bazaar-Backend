require('dotenv').config();
require("./database/connection");

// Importing your route handlers
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const express = require('express');
const app = express();
const cors= require('cors');

// middleware
app.use(express.json());

// Define the allowed origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

// Set up CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Use cors middleware with options
app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.status(200).json("Server Started");
});

// routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);


const port= process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Server started at port ${port}`)
});