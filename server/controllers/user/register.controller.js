import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import sendVerificationMail from "../../middlewares/sendVerificationMail.js";

const handleUserRegister = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(402).json({
      error: true,
      message: "All fields are required!",
    });
  }

  try {
    const existingMail = await User.findOne({ email });
    if (existingMail) {
      return res.status(400).json({
        error: true,
        message: `E-Mail Address ${email} already exists.`,
      });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({
        error: true,
        message: `Mobile Number ${mobile} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      isEmailVerified: true,
      password: hashedPassword,
      gender: req.body.gender ?? "",
    });

    await newUser.save();

    await sendVerificationMail(newUser._id, newUser.email);

    return res.status(201).json({
      error: false,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUserRegister;
