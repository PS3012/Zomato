const handleGetProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json({
      error: false,
      message: "Profile fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        address: user.address,
        city: user.city,
        pinCode: user.pinCode,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleGetProfile;
