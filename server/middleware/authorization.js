const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  console.log("Authorzing Initiated");
  let token = req.cookies.authToken;
  if (!token) {
    console.log("User not logged in.");
    return res.status(401).send({ message: "You are not logged in." });
  }
  try {
    let data = await jwt.verify(token, process.env.JWTPRIVATEKEY);
    res.locals.id = data["_id"];
    console.log(`Authorization granted to user ${data._id}`);
    next();
  } catch (err) {
    return res.status(401).send({ message: "You are not logged in." });
  }
};

module.exports = Authorization;
