import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Authorization token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User no longer exists",
      });
    }

    req.user = user.toObject();
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default protectedRoute;
