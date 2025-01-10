const Restaurant = require('../models/Restaurant')

const getAllRestaurants = async (req, res) => {
     try {
          const { location } = req.params
          
          // Find restaurants by location (case-insensitive)
          const restaurants = await Restaurant.find({
               location: { $regex: new RegExp(location, 'i') }
          })

          res.status(200).json({
               success: true,
               data: restaurants,
               message: `Restaurants found in ${location}`
          })
     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Error while fetching restaurants',
               error: error.message
          })
     }
}

module.exports = getAllRestaurants 