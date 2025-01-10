import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config.js";

import connectToDatabase from "./middlewares/connectToDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import restaurantRouter from "./routes/restaurant.route.js";
import cloudinary from "cloudinary";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

await connectToDatabase();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server Started.");
});
