import { Router } from "express";
import handleUserLogin from "../controllers/user/login.controller.js";
import handleUserRegister from "../controllers/user/register.controller.js";
import handleUserLogout from "../controllers/user/logout.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";
import handleGetProfile from "../controllers/user/getProfile.controller.js";
import handleUpdateProfile from "../controllers/user/updateProfile.controller.js";
import handleUpdatePassword from "../controllers/user/updatePassword.controller.js";

const router = Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);
router.post("/logout", handleUserLogout);
router.get("/profile", protectedRoute, handleGetProfile);
router.put("/profile", protectedRoute, handleUpdateProfile);
router.put("/update-password", protectedRoute, handleUpdatePassword);

export default router;
