import User from "../../models/user.model.js";

const handleUpdateProfile = async (req, res) => {
  const { name, gender, address, city, pinCode } = req.body;
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { name, gender, address, city, pinCode },
      { new: true }
    );

    return res.status(200).json({
      error: false,
      message: "Profile updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleUpdateProfile;
