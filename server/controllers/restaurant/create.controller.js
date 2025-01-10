import Restaurant from "../../models/restaurant.model.js";
import cloudinary from "cloudinary";
import multer from "multer";

const storage = multer.memoryStorage();

// Update the multer configuration to handle multiple files
export const upload = multer({
  storage,
  // Define which fields we expect to receive files for
  fields: [
    { name: 'restaurantImage', maxCount: 1 },
    { name: 'foodImage0', maxCount: 1 },
    { name: 'foodImage1', maxCount: 1 },
    { name: 'foodImage2', maxCount: 1 },
    { name: 'foodImage3', maxCount: 1 },
    { name: 'foodImage4', maxCount: 1 },
    // Add more if needed
  ]
}).fields([
  { name: 'restaurantImage', maxCount: 1 },
  { name: 'foodImage0', maxCount: 1 },
  { name: 'foodImage1', maxCount: 1 },
  { name: 'foodImage2', maxCount: 1 },
  { name: 'foodImage3', maxCount: 1 },
  { name: 'foodImage4', maxCount: 1 },
  // Add more if needed
]);

const handleCreateRestaurant = async (req, res) => {
  const { name, ownerName, ownerEmail, ownerMobile, address, city, pinCode } = req.body;
  const cuisines = JSON.parse(req.body.cuisines);

  try {
    // Upload restaurant image
    const restaurantImageResult = await cloudinary.v2.uploader.upload(
      `data:${req.files.restaurantImage[0].mimetype};base64,${req.files.restaurantImage[0].buffer.toString('base64')}`
    );

    // Upload menu images
    const menuItems = [];
    let index = 0;
    
    while (req.files[`foodImage${index}`]) {
      const foodImage = req.files[`foodImage${index}`][0];
      const result = await cloudinary.v2.uploader.upload(
        `data:${foodImage.mimetype};base64,${foodImage.buffer.toString('base64')}`
      );
      
      menuItems.push({
        foodName: req.body[`foodName${index}`],
        foodPrice: req.body[`foodPrice${index}`],
        foodImage: result.secure_url
      });
      
      index++;
    }

    const restaurant = new Restaurant({
      name,
      ownerName,
      ownerMobile,
      ownerEmail,
      address,
      city,
      pinCode,
      restaurantImage: restaurantImageResult.secure_url,
      cuisines,
      menu: menuItems
    });

    await restaurant.save();

    return res.status(201).json({
      error: false,
      message: "Restaurant added successfully.",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleCreateRestaurant;
