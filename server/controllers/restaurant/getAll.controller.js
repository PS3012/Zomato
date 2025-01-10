import Restaurant from "../../models/restaurant.model.js";

const handleGetAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    return res.status(200).json({
      error: false,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleGetAllRestaurant;
