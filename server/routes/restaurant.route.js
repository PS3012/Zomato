import { Router } from "express";
import handleGetAllRestaurant from "../controllers/restaurant/getAll.controller.js";
import handleCreateRestaurant, {
  upload,
} from "../controllers/restaurant/create.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", handleGetAllRestaurant);
router.post("/", protectedRoute, upload, handleCreateRestaurant);

export default router;
