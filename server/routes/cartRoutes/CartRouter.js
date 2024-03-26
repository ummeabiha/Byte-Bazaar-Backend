const cartRouter = require("express").Router();
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    console.log("In the middleware");
    let token = req.cookies.authToken;
    console.log(token);
    let data = jwt.verify(token, process.env.JWTPRIVATEKEY);
    console.log(data);
    next();
  } catch (e) {
    return res.status(401).send({ e });
  }
};

const getCart = async (req, res) => {
  console.log("In get cart");
  return res.status(200).send({ data: "works" });
};

const addItem = async (req, res) => {};

const removeItem = async (req, res) => {};

const changeQuantity = async (req, res) => {};

const emptyCart = async (req, res) => {};

cartRouter.get("/", Authorization, getCart);

module.exports = cartRouter;
