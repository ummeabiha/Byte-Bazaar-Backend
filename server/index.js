require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 6005;

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const path = require("path");
app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "uploads/products"))
);

// Importing route handlers
const signupRoutes = require("./routes/UserPanel/userAuthorization/signup");
const loginRoutes = require("./routes/UserPanel/userAuthorization/login");
const forgotPasswordRoutes = require("./routes/UserPanel/passwordReset/forgotPassword");
const resetPasswordRoutes = require("./routes/UserPanel/passwordReset/resetPassword");
const verifyOtpRouter = require("./routes/UserPanel/otpHandling/verifyOtp");
const resendOtpRouter = require("./routes/UserPanel/otpHandling/resendOtp");
const adminLoginRouter = require("./routes/AdminPanel/adminLogin/adminLogin");
const shopRoutes = require("./routes/AdminPanel/inventoryManagement/products");
const cartRouter = require("./routes/UserPanel/cartRoutes/CartRouter");
const getUserRouter = require("./routes/AdminPanel/userManagement/getUsers");
const deleteUserRouter = require("./routes/UserPanel/deleteAccount/deleteAccount");
const addProdsRouter = require("./routes/AdminPanel/inventoryManagement/insertProducts");
const editProdsRouter = require("./routes/AdminPanel/inventoryManagement/updateProducts");
const getProdsRouter = require("./routes/AdminPanel/inventoryManagement/getProducts");
const getProdByIdRouter = require("./routes/AdminPanel/inventoryManagement/getProductById");
const deleteProdsRouter = require("./routes/AdminPanel/inventoryManagement/deleteProducts");
const dispatchOrdersRouter = require("./routes/AdminPanel/orderManagement/dispatchOrders");
const getOrdersRouter = require("./routes/AdminPanel/orderManagement/getOrders");

// Variables
const cookieParser = require("cookie-parser");
const secretKey = process.env.SECRET_KEY;
const session = require("express-session");
const passport = require("passport");
const order = require("./models/UserPanel/order");

const {
  initializePassport,
  authenticateGoogle,
  handleGoogleCallback,
} = require("./routes/UserPanel/userAuthorization/googleAuth");
const getCustomerMessages = require("./routes/AdminPanel/customerSupport/getCustomerMessages");
const closeCustomerConcerns = require("./routes/AdminPanel/customerSupport/closeCustomerConcerns");
const orderRouter = require("./routes/UserPanel/orderRoutes/OrderRouter");
const paymentRouter = require("./routes/UserPanel/Payment");
const contactRouter = require("./routes/UserPanel/contact/contactRoute");

// Initialize Passport and session
initializePassport();

// middleware
app.use(express.json());

// Define the allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

// Set up CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Use cors middleware with options
app.use(cors(corsOptions));

app.use(cookieParser());
// Secret key for hashing the user data
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// General Login and Signup
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/admin-login", adminLoginRouter);
app.use("/api/forgotPassword", forgotPasswordRoutes);
app.use("/api/resetPassword", resetPasswordRoutes);
app.use("/api/user-otp-verification", verifyOtpRouter);
app.use("/api/resend-otp", resendOtpRouter);

// Google Login
app.get("/auth/google", authenticateGoogle());
app.get("/auth/google/callback", handleGoogleCallback());
app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

//Shop Route
app.use("/api", shopRoutes);

//Cart Routes
app.use("/cart", cartRouter);

//Order Routes
app.use("/order", orderRouter);

// Users Management Routers for Admin Panel
app.use("/api/get-users", getUserRouter);
app.use("/api/delete-users", deleteUserRouter);

//Products Management Routers for Admin Panel
app.use("/api/add-prods", addProdsRouter);
app.use("/api/edit-prods", editProdsRouter);
app.use("/api/get-prods", getProdsRouter);
app.use("/api/get-prod-by-id", getProdByIdRouter);
app.use("/api/delete-prods", deleteProdsRouter);

//Order Management Routers for Admin Panel
app.use("/api/dispatch-orders", dispatchOrdersRouter);
app.use("/api/get-orders", getOrdersRouter);

// Customer Support for Admin Panel
app.use("/api/close-concerns", closeCustomerConcerns);
app.use("/api/get-concerns", getCustomerMessages);
app.use("/api/payment", paymentRouter);

//Contact
app.use("/api/contact", contactRouter);

//Logout the user
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/bytebazaar/login");
  });
});

//Starting the server at defined port
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
