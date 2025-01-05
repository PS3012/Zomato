import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

const handleUpdatePassword = async (req, res) => {
  const user = req.user;
  const { oldPass, newPass } = req.body;
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  try {
    const userObj = await User.findById(user._id);
    if (!userObj) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
    
    const isPasswordMatched = await bcrypt.compare(oldPass, userObj.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        error: true,
        message: `The old password is incorrect.`,
      });
    }

    const newHash = await bcrypt.hash(newPass, 10);
    await User.findByIdAndUpdate(
      userObj._id,
      { password: newHash },
      { new: true }
    );

    return res.status(200).json({
      error: false,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleUpdatePassword;
