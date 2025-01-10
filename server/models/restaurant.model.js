import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerMobile: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    menu: [{
      foodName: {
        type: String,
        required: true,
      },
      foodPrice: {
        type: Number,
        required: true,
      },
      foodImage: {
        type: String,
        required: true,
      }
    }],
    restaurantImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("restaurants", RestaurantSchema);

export default Restaurant;
