require('dotenv').config();
require("./database/connection");

const express = require('express');
const app = express();
const cors= require('cors');

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET POST PUT DELETE',
    credentials: true
}));

app.get('/', (req, res)=>{
    res.status(200).json("Server Started");
});

const port= process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Server started at port ${port}`)
});