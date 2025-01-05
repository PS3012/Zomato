import { Router } from "express";
import handleVerifyToken from "../controllers/auth/verify.token.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/verify-token", handleVerifyToken);
router.get("/validate-token", protectedRoute, (req, res) => {
  return res.status(200).json({
    error: false,
    message: "User Authenticated",
    user: req.user,
    isAuthenticated: true,
  });
});

export default router;
