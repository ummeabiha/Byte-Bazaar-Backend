const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  console.log("Authorzing Initiated");
  let token = req.cookies.authToken;
  if (!token) {
    console.log("No token was found");
    return res.status(401).send({ message: "No token set." });
  }
  try {
    let data = await jwt.verify(token, process.env.JWTPRIVATEKEY);
    res.locals.id = data["_id"];
    console.log(`Authorization granted to user ${data._id}`);
    next();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

module.exports = Authorization;
