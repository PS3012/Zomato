import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../../models/user.model.js";

const handleVerifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneAndUpdate(
      { _id: decoded.id },
      { isEmailVerified: true }
    );

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Invalid token",
      });
    }

    return res.status(200).json({
      error: false,
      message: "User verified successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleVerifyToken;
