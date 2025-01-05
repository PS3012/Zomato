const handleUserLogout = async (req, res) => {
  res.clearCookie("token");
  return res.status(201).json({
    error: false,
    message: "User logout successfully",
  });
};

export default handleUserLogout;
