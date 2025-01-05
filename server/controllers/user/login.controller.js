import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "All fields are required.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: `Incorrect credentials`,
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        error: true,
        message: "Please verify your email first.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        error: true,
        message: `Incorrect credentials`,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const logInUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.name,
      gender: user.name,
    };

    return res.status(200).json({
      error: false,
      message: "User logged in successfully",
      data: logInUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleUserLogin;
