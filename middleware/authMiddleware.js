import jwt from "jsonwebtoken";
import users from "../models/auth.js";

const secret = "secret";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized user" });
    console.log(error);
  }
};

const checkRole = (role) => (req, res, next) => {
  try {
     const token = req.headers.authorization.split(" ")[1];
     const isCustomAuth = token.length < 500;

     let decodedData;

     if (token && isCustomAuth) {
       decodedData = jwt.verify(token, secret);
       req.userId = decodedData?.id;
     }else{
      res.status(400).json({ message: "Issue occured with token." });
     }
    const user = users.find((user) => user.id === req.userId);
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};

export  { auth, checkRole };
